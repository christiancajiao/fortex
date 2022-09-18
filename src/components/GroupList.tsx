import { faker } from "@faker-js/faker";
import { SimpleGrid, Text, Title, Card, Group, Button } from "@mantine/core";
const groupList = new Array(10).fill(null).map(() => {
  return { name: faker.name.jobArea(), description: faker.lorem.paragraph() };
});

export default function GroupList() {
  return (
    <>
      <Button mb="md" radius="md" size="lg">
        Add New Group
      </Button>
      <SimpleGrid cols={3}>
        {groupList.map((group) => {
          return (
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mb="sm">
                <Title order={3}>
                  <Text
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 15 }}
                  >
                    {group.name}
                  </Text>
                </Title>
                <Button color="red" size="xs" uppercase>
                  Delete
                </Button>
              </Group>

              <Text size="xs" lineClamp={3}>
                {group.description}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
}
