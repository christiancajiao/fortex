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
  Textarea,
} from "@mantine/core";
import { IconX } from "@tabler/icons";

export default function GroupList(props: any) {
  const urlGroup = "https://demo-api-work-test.herokuapp.com/group/";
  const [groupList, setGroupList] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalEditOpened, setModalEditOpened] = useState(false);
  const [roles, setRoles] = useState([]);
  const [people, setPeople] = useState([]);
  const [listNewPeople, setListNewPeople] = useState();
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
  }, [props.group]);

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
        console.log(data.groups);
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

  const editGroup = async (id: any) => {
    try {
      const response = await fetch(
        `https://demo-api-work-test.herokuapp.com/group/update/?id=${id}`,
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
    let justArraysOfPeople = [];
    for (let i = 0; i < group.length; i++) {
      justArraysOfPeople.push(group[i].id);
    }
    return justArraysOfPeople;
  }
  function idOfNewGroupPeople(item: any, index: any) {
    // let newArr = [...people];
    // console.log(newArr, item, index);
    // newArr.splice(index, 1);
    // console.log("otro log", newArr);
    // setPeople(newArr);
    let existingPeople = [];
    for (let i = 0; i < people.length; i++) {
      if (people[i].id != item.id) {
        existingPeople.push(people[i].id);
        console.log(people[i].id);
      }
    }
    setListNewPeople(existingPeople);
  }
  const newPeolpleOfGroup = async (group: any) => {
    console.log(group.people);
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
            oldValues: idOfOldGroupPeople(group.people),
            newValues: listNewPeople,
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
                size={800}
                opened={modalEditOpened}
                onClose={() => setModalEditOpened(false)}
                title="Edit Group"
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
                  size="xs"
                  ml="md"
                  mb="md"
                  onClick={() => console.log("click en add person")}
                >
                  Add Person
                </Button>
                <Group mb="md">
                  {group.people.map((person, index) => {
                    return (
                      <Container>
                        {person.active ? (
                          <Badge color="green">Active</Badge>
                        ) : (
                          <Badge color="red">Inactive</Badge>
                        )}

                        {person.name}
                        <Button
                          size="xs"
                          ml="md"
                          onClick={() => {
                            //people.splice(index, 1);
                            idOfNewGroupPeople(person, index);
                            newPeolpleOfGroup(group);
                          }}
                        >
                          Delete
                        </Button>
                      </Container>
                    );
                  })}
                </Group>
                <Button
                  mt="md"
                  mb="md"
                  radius="md"
                  size="lg"
                  onClick={() => {
                    editGroup(group.id);
                    setModalEditOpened(false);
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
                <Button
                  color="red"
                  size="xs"
                  uppercase
                  onClick={() => {
                    deleteGroup(group.id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="blue"
                  size="xs"
                  uppercase
                  onClick={() => {
                    setModalEditOpened(true);
                    console.log("edit group");
                    setPeople(group.people);
                    setRoles(group.roles);
                  }}
                >
                  Edit
                </Button>
              </Group>

              <Text size="xs" lineClamp={3}>
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
