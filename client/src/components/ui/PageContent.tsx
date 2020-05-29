// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ReactNode } from 'react';
import { Header, Footer } from 'nhsuk-react-components';
import { AUDERE_URL } from 'utils/globalConstants';

interface PageContentProps {
  children: ReactNode;
}

export default (props: PageContentProps) => (
  <>
    <Header transactional>
      <Header.Container>
        <Header.Logo href="/" />
        <Header.ServiceName href="/">
          <span data-testid="service-name">
            Take a COVID-19 Antibody Test
          </span>
        </Header.ServiceName>
      </Header.Container>
    </Header>

    <section
      className="padding-top: nhsuk-u-margin-top-4"
      style={{ minHeight: "70vh" }}>
      {props.children}
    </section>
    <Footer>
      <Footer.List>
        <Footer.ListItem href={AUDERE_URL}>OpenRDT Powered by Audure</Footer.ListItem>
      </Footer.List>
      <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
    </Footer>
  </>
);
