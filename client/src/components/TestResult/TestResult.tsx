// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import '../../style/sassStyle';
import { Link } from 'react-router-dom';
import { ContinueButton } from '../ui/Buttons';
import PageContent from '../ui/PageContent';
import PageHeader from '../ui/PageHeader';
import { ROUTE_DEFINITIONS } from 'routes/routes';
import React from 'react';


export default () => {

  const content = 'To be implemented';

  return (
    <PageContent>
      <section className="section">
        <PageHeader title="Your Test Result..." />
        <div className="container">
          {content}
          <Link to={ROUTE_DEFINITIONS.HOME.path}>
            <ContinueButton />
          </Link>
        </div>
      </section>
    </PageContent>
  );
};
