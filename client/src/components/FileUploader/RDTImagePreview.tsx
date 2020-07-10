// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';

const styles = {
  image: {
    maxWidth: "100%"
  }
};

interface RDTImagePreviewProps {
  dataURI: string;
}

export default (props: RDTImagePreviewProps) => {
  const { dataURI } = props;

  return (
    <div>
      <img
        style={styles.image}
        src={dataURI}
        alt="preview" />
    </div>
  );
};
