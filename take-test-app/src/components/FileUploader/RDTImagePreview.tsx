// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';
import { StylesDictionary } from 'style/utils';
import GuideOverlay from './GuideOverlay';

const styles : StylesDictionary = {
  image: {
    maxWidth: "100%"
  },
  container: {
    position: "relative",
    lineHeight: 0
  }
};

interface RDTImagePreviewProps {
  dataURI: string;
}

export default (props: RDTImagePreviewProps) => {
  const { dataURI } = props;

  return (
    <div style={styles.container}>
      <img
        data-testid="user-image"
        style={styles.image}
        src={dataURI}
        alt="preview" />
      <GuideOverlay />
    </div>
  );
};
