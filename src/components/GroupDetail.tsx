import { faker } from "@faker-js/faker";
import {
  AppShell,
  Navbar,
  Header,
  Group,
  Text,
  Button,
  Table,
  Title,
  Badge,
  ActionIcon,
} from "@mantine/core";
const peopleList = new Array(10).fill(null).map(() => {
  return { name: faker.name.fullName() };
});
const roles = new Array(6).fill(null).map(() => {
  return { name: faker.internet.domainWord() };
});
export default function GroupList() {
  const removeButton = (
    <ActionIcon
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
    ></ActionIcon>
  );
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <div style={{ height: 300 }}>
            <Title order={1}>Group Name</Title>
            <Group mb="md" mt="sm">
              <Text>Texto del grupo</Text>
            </Group>
          </div>

          <div style={{ height: 300 }}>
            <Title order={3}>Roles</Title>
            <Group mb="md" mt="sm">
              {roles.map((role) => {
                return (
                  <div style={{ width: 80 }}>
                    <Badge
                      variant="outline"
                      sx={{ paddingRight: 3 }}
                      rightSection={removeButton}
                      fullWidth
                    >
                      {role.name}
                    </Badge>
                  </div>
                );
              })}
            </Group>
          </div>

          <Button>Save Changes</Button>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Button mb="xl">Add Person</Button>
      <div className="container-table">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((person) => {
              return (
                <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>
                    <Button color="blue" size="xs" mr="md">
                      Edit
                    </Button>

                    <Button color="red" size="xs">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </AppShell>
  );
}
