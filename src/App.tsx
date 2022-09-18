import GroupList from "./components/GroupList";
import { useEffect } from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MantineProvider, Text } from "@mantine/core";

export default function App() {
  const url = "https://dextrajyjel.herokuapp.com/login";
  const data = {
    email: "front-test-431@fortexdesign.com",
    password: "0m9FN5e*C4h7",
  };

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
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
        <GroupList />
      </AppShell>
    </MantineProvider>
  );
}
