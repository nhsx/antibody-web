// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  alt: string;
}

export default (props: PlaceholderImageProps) => (
  <img
    src={
      `https://dummyimage.com/${props.width}x${props.height}/000000/FFFFFF/` +
      (props.alt ? `?text=${encodeURIComponent(props.alt.toUpperCase())}` : '')
    }
    alt={props.alt}
    {...props}
  />
);
