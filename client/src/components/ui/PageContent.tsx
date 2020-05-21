// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ReactNode } from 'react';
import { Footer } from 'nhsuk-react-components';
import {  createStyles, makeStyles } from '@material-ui/core';

import { cx } from 'style/utils';
import { AUDERE_URL } from 'utils/globalConstants';

interface PageContentProps {
  children: ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
    pageContent: {
      minHeight: '600px',
    },
  })
);

export default (props: PageContentProps) => (
  <>
    <section className={cx('section', useStyles().pageContent)}>
      {props.children}
    </section>
    <Footer>
      <Footer.List>
        <Footer.ListItem>
          OpenRDT Powered by{' '}
          <a
            className="nhsuk-footer__list-item-link"
            href={AUDERE_URL}>
            Audere
          </a>
        </Footer.ListItem>
      </Footer.List>
      <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
    </Footer>
  </>
);
