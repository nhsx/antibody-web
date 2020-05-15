// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import PageContent from '../ui/PageContent';
import PageHeader from '../ui/PageHeader';
import React from 'react';

export default () => {
  return (
    <PageContent>
      <PageHeader
        title="Welcome to the Covid19 Antibody Testing App"
        subtitle="Let's get started by choosing an option below."
      />
      <div className="container"></div>
    </PageContent>
  );
};
