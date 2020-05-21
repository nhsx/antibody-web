// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ImgHTMLAttributes } from 'react';

export interface AssetsImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string; // make it mandatory.
  // Width and height are mandatory so that the image space in the UI is reserved.
  // Without this, the UI would jump while the image is being loaded.
  width: number;
  height: number;
}

export default (props: AssetsImageProps) => {
  const { src, alt, ...rest } = props;
  return <img
    src={`/assets/images/${src}`}
    alt={alt}
    {...rest} />;
};
