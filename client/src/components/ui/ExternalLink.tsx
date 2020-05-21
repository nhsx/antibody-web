// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';

export default (
  props: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
  >
) => {
  const { children, ...rest } = props;
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...rest}>
      {children}
    </a>
  );
};
