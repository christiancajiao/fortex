import GroupList from "./components/GroupList";
import { useEffect, useState } from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MantineProvider, Text } from "@mantine/core";

import Login from "./components/Login";

export default function App() {
  const urlGroup = "https://demo-api-work-test.herokuapp.com/group/";
  const [credentials, setCredentials] = useState();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    credentials ? apiCall() : console.log("no existen creedenciales aun");
    console.log(groups, "grupos");
  }, [credentials]);

  const apiCall = async () => {
    try {
      const response = await fetch(urlGroup, {
        method: "GET",
        headers: {
          Authorization: credentials?.token,
        },
      });
      if (response.status !== 200) {
        const data = await response.json();
      } else {
        const data = await response.json();
        console.log(data.groups);
        setGroups(data.groups);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getCredentials(credentials: any) {
    console.log(credentials);
    setCredentials(credentials);
    apiCall();
  }
  function logconsole(mensaje: any) {
    console.log("funciona el callback", mensaje);
  }
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {credentials ? (
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs">
              <Text weight={700} align="center">
                {credentials?.user.name}
              </Text>
              <Text align="center" mb="md">
                {credentials?.user.email}
              </Text>
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
          <GroupList groups={groups} credentials={credentials} />
        </AppShell>
      ) : (
        <Login getCredentials={getCredentials} log={logconsole} />
      )}
    </MantineProvider>
  );
}
