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
} from "@mantine/core";

export default function GroupList(props: any) {
  const urlGroup = "https://demo-api-work-test.herokuapp.com/group/";
  const [groupList, setGroupList] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setGroupList(props.groups);
    console.log(groupList);
  }, [props.group]);

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
          Create
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
            <Card shadow="sm" p="lg" radius="md" withBorder key={index}>
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
                  key={1}
                  uppercase
                  onClick={() => {
                    deleteGroup(group.id);
                  }}
                >
                  Delete
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
