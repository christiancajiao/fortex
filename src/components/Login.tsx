import { Card, Text, Button, Group, Center, Title, Input } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Login() {
  const url = "https://demo-api-work-test.herokuapp.com/login";
  const data1 = {
    email: "front-test-431@fortexdesign.com",
    password: "0m9FN5e*C4h7",
  };

  const [autorization, setAutorization] = useState(null);
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    console.log(data);
    console.log(autorization);
  }, [data]);

  const apiCall = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setAutorization(data));
  };

  return (
    <Center style={{ width: 800, height: 200 }}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="center" mt="md" mb="xs">
          <Title
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 15 }}
            weight={700}
            mb="md"
          >
            Welcome
          </Title>
        </Group>
        <Input
          placeholder="Your email"
          radius="md"
          mb="md"
          size="md"
          onChange={(event: any) => {
            setData({ email: event.target.value, password: data.password });
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          radius="md"
          mb="md"
          size="md"
          onChange={(event: any) => {
            setData({ email: data.email, password: event.target.value });
          }}
        />
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={apiCall}
        >
          Login
        </Button>
      </Card>
    </Center>
  );
}
