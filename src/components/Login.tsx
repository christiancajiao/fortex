import {
  Card,
  Text,
  Button,
  Group,
  Center,
  Title,
  Input,
  Alert,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function Login(props: any) {
  const url = "https://demo-api-work-test.herokuapp.com/login";
  const data1 = {
    email: "front-test-431@fortexdesign.com",
    password: "0m9FN5e*C4h7",
  };

  const [autorization, setAutorization] = useState(null);
  const [data, setData] = useState({ email: "", password: "" });
  const [handleError, setHandleError] = useState("");

  useEffect(() => {
    console.log(data);
  }, [data, autorization]);

  const apiCall = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        const data = await response.json();
        setHandleError(data.message);
      } else {
        const dataAutorization = await response.json();
        console.log(dataAutorization);
        props.getCredentials(dataAutorization);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center style={{ width: 800, height: 200 }}>
      {handleError ? (
        <Alert title="Error!" color="red">
          {handleError}
        </Alert>
      ) : null}
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
