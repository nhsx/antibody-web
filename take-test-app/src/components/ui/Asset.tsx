// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { ImgHTMLAttributes, CSSProperties } from 'react';

export interface AssetsImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string; // make it mandatory.
  // Width and height are mandatory so that the image space in the UI is reserved.
  // Without this, the UI would jump while the image is being loaded.
  width?: number | string;
  height?: number | string;
  center?: boolean;
  style?: CSSProperties;
}

const styles = {
  center: {
    margin: '20px auto',
    display: 'block'
  }
};

export default (props: AssetsImageProps) => {
  const { center = true, width="100%", height="auto", src, alt, style, ...rest } = props;

  let otherStyles = { ...style, maxWidth: 450 };

  return <img
    src={`/assets/images/${src}`}
    width={width}
    height={height}
    alt={alt}
    style={center ? { ...otherStyles, ...styles.center } : otherStyles}

    {...rest} />;
};
