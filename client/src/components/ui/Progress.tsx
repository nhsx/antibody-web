// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import React from 'react';
import getSassStyle from '../../style/sassStyle';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    progressRoot: {
      backgroundColor: getSassStyle().progressbackgrouncolor,
      borderRadius: '10px',
      display: 'block',
      height: '1rem',
      margin: '0 0 1.5em 0',
      position: 'relative',
      width: '100%',
    },

    progressInner: {
      backgroundColor: getSassStyle().progresscolor,
      borderRadius: '10px',
      bottom: 0,
      left: 0,
      position: 'absolute',
      top: 0,
      transition: '.5s width ease',
    },
  })
);

export interface ProgressProps {
  value: number;
  max: number;
}

export default (props: ProgressProps) => {
  const classes = useStyle();
  return (
    <div className={classes.progressRoot}>
      <div
        className={classes.progressInner}
        style={{
          width: `${Math.round((100 * props.value) / props.max)}%`,
        }}
      />
    </div>
  );
};
