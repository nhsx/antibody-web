// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { AUDERE_URL } from 'utils/globalConstants';
import Divider from './Divider';
import ExternalLink from './ExternalLink';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { cx } from 'style/utils';
import getSassStyle from 'style/sassStyle';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    footerText: {
      textAlign: 'center',
    },
    footerTypoGraphy: {
      fontSize: '14px',
      color: getSassStyle().secondarytextcolor,
    },
  })
);

export default () => (
  <div className="section">
    <div className="container">
      <Divider />
      <div className={useStyle().footerText}>
        <Typography
          className={cx(useStyle().footerTypoGraphy, 'openRDTFooter')}
        >
          OpenRDT powered by{' '}
          <ExternalLink href={AUDERE_URL}>Audere</ExternalLink>
        </Typography>
      </div>
    </div>
  </div>
);
