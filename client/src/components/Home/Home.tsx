// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import PageContent from "../ui/PageContent";
import React from "react";
import { useHistory } from "react-router-dom";
import { Header, Container } from "nhsuk-react-components";
import Login from "../Login/Login";

export default () => {
  const history = useHistory();

  return (
    <PageContent>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">
            Take an COVID-19 Antibody Test
          </Header.ServiceName>
        </Header.Container>
      </Header>
      <Container>
        <Login
          formSubmit={(signInId: string) => {
            if (signInId === "valid") {
              history.push("/test");
            }
          }}
        />
      </Container>
    </PageContent>
  );
};
