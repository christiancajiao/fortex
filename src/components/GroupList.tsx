import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Text,
  Title,
  Card,
  Group,
  Button,
  Badge,
  Tooltip,
  Modal,
  Input,
  Container,
  ActionIcon,
  Center,
  Textarea,
} from "@mantine/core";
import { IconX } from "@tabler/icons";

export default function GroupList(props: any) {
  const urlGroup = "https://demo-api-work-test.herokuapp.com/group/";
  const [groupList, setGroupList] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalEditOpened, setModalEditOpened] = useState(false);
  const [modalDeletetOpened, setModalDeleteOpened] = useState(false);
  const [roles, setRoles] = useState([]);
  const [people, setPeople] = useState([]);
  const [newListOfPeople, setNewListOfPeople] = useState();
  const [oldListOfPeople, setOldListOfPeople] = useState();
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });
  const [dataEdit, setDataEdit] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setGroupList(props.groups);
    console.log(props.groups, "grupos en el grouplist");
  }, [props]);

  const removeButton = (
    <ActionIcon
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
      onClick={() => {
        console.log("click en la x");
      }}
    >
      <IconX size={10} />
    </ActionIcon>
  );
  const createGroup = async () => {
    console.log("esta corriendo create group");
    try {
      const response = await fetch(
        "https://demo-api-work-test.herokuapp.com/group/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: props.credentials.token,
          },
          body: JSON.stringify(newGroup),
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
      } else {
        const messageSuccess = await response.json();
        console.log(messageSuccess);
      }
    } catch (error) {
      console.log(error);
    }
    apiCallGroups();
  };

  const apiCallGroups = async () => {
    fetch(urlGroup, {
      headers: {
        Authorization: props.credentials.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGroupList(data.groups);
      });
  };

  const deleteGroup = async (id: any) => {
    try {
      const response = await fetch(
        `https://demo-api-work-test.herokuapp.com/group/delete/?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: props.credentials.token,
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
      } else {
        const messageSuccess = await response.json();

        console.log(messageSuccess);
      }
    } catch (error) {
      console.log(error);
    }
    apiCallGroups();
  };

  const editGroup = async (group: any) => {
    console.log(group);
    try {
      const response = await fetch(
        `https://demo-api-work-test.herokuapp.com/group/update/?group=${group.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: props.credentials.token,
          },
          body: JSON.stringify(dataEdit),
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
      } else {
        const messageSuccess = await response.json();

        console.log(messageSuccess);
      }
    } catch (error) {
      console.log(error);
    }
    apiCallGroups();
  };

  function idOfOldGroupPeople(group: any) {
    //al dar click en edit va a setear un array con las personas que estan en el grupo y va a setear un array con las personas(objetos)
    let ArraysOfPeople = [];
    for (let i = 0; i < group.length; i++) {
      ArraysOfPeople.push(group[i].id);
    }
    setOldListOfPeople(ArraysOfPeople);
  }
  function idOfNewGroupPeople(group: any, person: any) {
    let newArrPeople = [];
    let newArrIdPeople = [];
    for (let i = 0; i < group.length; i++) {
      if (group[i] !== person.id) {
        newArrIdPeople.push(group[i]);
      }
    }
    for (let i = 0; i < people.length; i++) {
      if (people[i] !== person) {
        newArrPeople.push(people[i]);
      }
    }
    setNewListOfPeople(newArrIdPeople);
    setPeople(newArrPeople);
    //al dar click en delete(boton de cada persona), va a modificar el array de las personas(objetos) y eliminar la persona seleccionada
  }
  const newPeolpleOfGroup = async (group: any) => {
    try {
      const response = await fetch(
        "https://demo-api-work-test.herokuapp.com/group/manage-members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: props.credentials.token,
          },
          body: JSON.stringify({
            groupId: group.id,
            oldValues: oldListOfPeople,
            newValues: newListOfPeople,
          }),
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
      } else {
        const messageSuccess = await response.json();
        console.log(messageSuccess);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Create Group"
      >
        <Input
          placeholder="Group Name"
          radius="md"
          mb="md"
          size="md"
          onChange={(event: any) => {
            setNewGroup({
              name: event.target.value,
              description: newGroup.description,
            });
          }}
        ></Input>
        <Input
          placeholder="Group Description"
          radius="md"
          mb="md"
          size="md"
          onChange={(event: any) => {
            setNewGroup({
              name: newGroup.name,
              description: event.target.value,
            });
          }}
        ></Input>
        <Button
          mb="md"
          radius="md"
          size="lg"
          onClick={() => {
            createGroup();
            setModalOpened(false);
          }}
        >
          Create Group
        </Button>
      </Modal>
      <Button
        className="button-add-group"
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        mt="xl"
        mb="md"
        radius="md"
        size="lg"
        onClick={() => {
          setModalOpened(true);
        }}
      >
        Add New Group
      </Button>
      <SimpleGrid cols={3}>
        {groupList.map((group, index) => {
          return (
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Modal
                opened={modalDeletetOpened}
                onClose={() => setModalEditOpened(false)}
                title={" Edit Group "}
              >
                <Button
                  color="red"
                  onClick={() => {
                    deleteGroup(group.id);
                    setModalDeleteOpened(false);
                  }}
                >
                  Yes, i want delete this group
                </Button>
              </Modal>
              <Modal
                size={800}
                opened={modalEditOpened}
                onClose={() => setModalEditOpened(false)}
                title={" Edit Group "}
              >
                <Input
                  placeholder="Group Name"
                  radius="md"
                  mb="md"
                  size="md"
                  onChange={(event: any) => {
                    setDataEdit({
                      name: event.target.value,
                      description: dataEdit.description,
                    });
                  }}
                ></Input>
                <Textarea
                  placeholder="Group Description"
                  radius="md"
                  mb="md"
                  size="md"
                  onChange={(event: any) => {
                    setDataEdit({
                      name: dataEdit.name,
                      description: event.target.value,
                    });
                  }}
                ></Textarea>
                <Title mb="md">Roles</Title>
                <Group mb="md">
                  {group.roles.map((role) => {
                    return (
                      <Badge
                        variant="outline"
                        sx={{ paddingLeft: 3 }}
                        leftSection={removeButton}
                      >
                        {role.name}
                      </Badge>
                    );
                  })}
                </Group>
                <Title mb="md">People</Title>
                <Button
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  size="xs"
                  ml="md"
                  mb="md"
                  onClick={() => console.log("click en add person")}
                >
                  Add Person
                </Button>
                <Group mb="md">
                  {people.map((person, index) => {
                    return (
                      <Container>
                        {person.active ? (
                          <Badge color="green">Active</Badge>
                        ) : (
                          <Badge color="red">Inactive</Badge>
                        )}

                        {person.name}
                        <Button
                          color="red"
                          size="xs"
                          ml="md"
                          onClick={() => {
                            //people.splice(index, 1);
                            idOfNewGroupPeople(oldListOfPeople, person);
                          }}
                        >
                          Delete
                        </Button>
                      </Container>
                    );
                  })}
                </Group>
                <Button
                  align="center"
                  mt="md"
                  mb="md"
                  radius="md"
                  size="lg"
                  onClick={() => {
                    editGroup(group);
                    setModalEditOpened(false);
                    if (oldListOfPeople !== newListOfPeople) {
                      newPeolpleOfGroup(group);
                    }
                    //enviar las personas o los roles a editar en el post
                  }}
                >
                  save
                </Button>
              </Modal>
              <Group position="apart" mb="sm">
                <Title order={3}>
                  <Text
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 15 }}
                  >
                    {group.name}
                  </Text>
                </Title>
                <Center>
                  <Button
                    color="red"
                    size="xs"
                    uppercase
                    onClick={() => {
                      setModalDeleteOpened(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="blue"
                    ml="sm"
                    size="xs"
                    uppercase
                    onClick={() => {
                      setModalEditOpened(true);
                      console.log("edit group");
                      setPeople(group.people);
                      setRoles(group.roles);
                      idOfOldGroupPeople(group.people);
                    }}
                  >
                    Edit
                  </Button>
                </Center>
              </Group>

              <Text size="xs" mb="xl" lineClamp={3}>
                {group.description}
              </Text>
              <Group>
                {group.roles.map((role) => {
                  return (
                    <div style={{ width: 40 }}>
                      <Tooltip label={role.name}>
                        <Badge fullWidth>{role.name}</Badge>
                      </Tooltip>
                    </div>
                  );
                })}
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
}
