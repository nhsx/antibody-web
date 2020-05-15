// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import { cx } from 'style/utils';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes rotate': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(359deg)' },
    },
    loaderContent: {
      width: '100%',
      paddingBottom: '100%',
      opacity: 0,
      animation: '$rotate .5s infinite linear',
      transition: '1s opacity ease-in',
      position: 'relative',
      '&:after': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        content: "' '",
        border: '20px solid #dbdbdb',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        // This is the highest integer possible.
        // It makes sure we get a rounded corner no matter
        // the dimension of the object.
        borderRadius: '9007199254740991px',
      },
    },

    loaderContentVisible: {
      opacity: 1,
    },
  })
);

export default () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      return;
    }
    // We need this to apply a different value to
    // the opacity of the element, so that the fade-in
    // animation can trigger.
    const key = setTimeout(() => {
      !show && setShow(true);
    }, 10);
    return () => {
      clearTimeout(key);
    };
  }, [show]);
  return (
    <div
      className={cx({
        [useStyle().loaderContent]: true,
        [useStyle().loaderContentVisible]: show,
      })}
    />
  );
};
