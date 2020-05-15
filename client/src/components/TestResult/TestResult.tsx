// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import '../../style/sassStyle';

import { Link, useParams } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import { ContinueButton } from '../ui/Buttons';
import Divider from 'components/ui/Divider';
import ExternalLink from 'components/ui/ExternalLink';
import PageContent from '../ui/PageContent';
import PageHeader from '../ui/PageHeader';
import { ROUTE_DEFINITIONS } from 'routes/routes';
import React from 'react';
import { cx } from 'style/utils';

const NO_RESULT_YET = 1;
const POSITIVE = 2;
const NEGATIVE = 3;

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    testResultPill: {
      cursor: 'default',
      margin: '.75em 0',
    },
    testResultContainer: {
      textAlign: 'center',
    },
    nextButton: {
      minWidth: '185px',
      marginTop: '30px',
    },
  })
);

export default () => {
  const { testRunUID } = useParams() as {
    testRunUID: string;
  };

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
