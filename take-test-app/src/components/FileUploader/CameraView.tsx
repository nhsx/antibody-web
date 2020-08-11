// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import React from 'react';
import TestStripCamera from './TestStripCamera';

export interface CameraProps {
  onPhotoTaken: (dataURI: string) => void;
  onError: () => void;
}

export default (props: CameraProps) => {
  return (
    <TestStripCamera
      onPhotoTaken={props.onPhotoTaken}
      onError={props.onError}
    />
  );
};
