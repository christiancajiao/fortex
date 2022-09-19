import GroupList from "./components/GroupList";
import { useEffect, useState } from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MantineProvider, Text } from "@mantine/core";

import Login from "./components/Login";

export default function App() {
  const urlGroup = "https://demo-api-work-test.herokuapp.com/group/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4YTVlMTFiLWRiZDktNDBlZS1hZjA4LTMyYzBjMDBiYmM5ZiIsIm1haWwiOiJmcm9udC10ZXN0LTQzMUBmb3J0ZXhkZXNpZ24uY29tIiwibmFtZSI6IkRldmVsb3BlciIsIm9yZ2FuaXphdGlvbklkIjoiNWFkYTVmODQtOTY5ZC00NWIzLTg1OGMtZDQ5YjBmNDQ5ODA0IiwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE2NjM2MDY5MDksImV4cCI6MTY2NDIxMTcwOX0.EIjpGFnzKirTF1aSYahZ4Cj2Sv9YUq_MJXyhkGkV3OE";
  const [credentials, setCredentials] = useState();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    credentials ? apiCall() : console.log("no existen creedenciales aun");
    console.log(groups);
  }, [credentials]);

  const apiCall = async () => {
    fetch(urlGroup, {
      headers: {
        Authorization: credentials.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data), setGroups(data.groups);
      });
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
              <div>
                {credentials?.user.name}
                id= {credentials?.user.id}
                <span>{credentials?.user.email}</span>
              </div>
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
