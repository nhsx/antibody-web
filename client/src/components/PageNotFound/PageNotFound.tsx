// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import '../../style/sassStyle';

import PageContent from '../ui/PageContent';
import PageHeader from '../ui/PageHeader';
import React from 'react';

export default () => {
  return (
    <PageContent>
      <PageHeader title="Ooops!" subtitle="Something went wrong." />
    </PageContent>
  );
};
