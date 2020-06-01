// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';
import { Footer } from 'nhsuk-react-components';
import { AUDERE_URL } from 'utils/globalConstants';


export default () => (
  <Footer>
    <Footer.List>
      <Footer.ListItem href={AUDERE_URL}>OpenRDT Powered by Audure</Footer.ListItem>
    </Footer.List>
    <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
  </Footer>);
