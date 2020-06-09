// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ReactNode } from 'react';
import { cx } from 'style/utils';


interface MediaProps {
  image?: ReactNode;
  children: ReactNode;
}

export default (props: MediaProps) => {
  const { image, children } = props;

  let mediaIcon;
  if (image) {
    mediaIcon = <figure className="media-left">{image}</figure>;
  }
  return (
    <article className="media">
      {mediaIcon}
      <div
        className={cx(['media-content'])}
        style={{
          overflow: 'initial'
        }}>
        <div className="content">{children}</div>
      </div>
    </article>
  );
};
