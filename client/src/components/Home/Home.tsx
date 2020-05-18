// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import PageContent from '../ui/PageContent';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'nhsuk-react-components';

export default () => {
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
      <div className="container">
        <Link to="/test">Start new test</Link>
      </div>
    </PageContent>
  );
};
