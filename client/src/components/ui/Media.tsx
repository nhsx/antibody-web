// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { cx } from 'style/utils';

const useMediaStyles = makeStyles(() =>
  createStyles({
    content: {
      overflow: 'initial',
    },
  })
);

interface MediaProps {
  image?: ReactNode;
  children: ReactNode;
}

export default (props: MediaProps) => {
  const { image, children } = props;
  const classes = useMediaStyles();

  let mediaIcon;
  if (image) {
    mediaIcon = <figure className="media-left">{image}</figure>;
  }
  return (
    <article className="media">
      {mediaIcon}
      <div className={cx(['media-content', classes.content])}>
        <div className="content">{children}</div>
      </div>
    </article>
  );
};
