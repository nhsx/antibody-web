// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import PageFooter from './PageFooter';
import { cx } from 'style/utils';

interface PageContentProps {
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
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
    <PageFooter />
  </>
);
