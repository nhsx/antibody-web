// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import React from 'react';
import { cx } from '../../style/utils';
import getSassStyle from '../../style/sassStyle';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      display: 'block',
      position: 'relative',
      borderTop: `1px solid ${getSassStyle().dividercolor}`,
      height: '1px',
      margin: '12px 0',
      textAlign: 'center',
    },

    dividerLabel: {
      '&:after': {
        background: getSassStyle().bodybackgroundcolor,
        color: getSassStyle().secondarytextcolor,
        content: 'attr(data-label)',
        display: 'inline-block',
        fontSize: '.75rem',
        fontWeight: 'bold',
        padding: '.4rem .8rem',
        transform: 'translateY(-1.1rem)',
        textAlign: 'center',
      },
    },

    verticalDivider: {},
    '@media screen and (min-width: 600px)': {
      verticalDivider: {
        display: 'block',
        flex: 'none',
        width: 'auto',
        height: 'auto',
        padding: '12px',
        margin: '0',
        position: 'relative',
        borderTop: 'none',
        minHeight: '100px',
        textAlign: 'center',
        '&:before': {
          borderLeft: `1px solid ${getSassStyle().dividercolor}`,
          bottom: '6px',
          content: '""',
          display: 'block',
          left: '50%',
          position: 'absolute',
          top: '6px',
        },
        '&:after': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: '.1rem',
          transform: 'translateY(-50%) translateX(-50%)',
        },
      },
    },
  })
);

export interface DividerProps {
  label?: string;
  isVertical?: boolean;
  className?: string;
}

export default (props: DividerProps) => (
  <div
    className={cx(
      {
        [useStyle().divider]: true,
        [useStyle().dividerLabel]: !!props.label,
        [useStyle().verticalDivider]: !!props.isVertical,
      },
      props.className ? props.className : ''
    )}
    data-label={props.label}
  />
);
