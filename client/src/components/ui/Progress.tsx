// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';

export interface ProgressProps {
  value: number;
  max: number;
}

export default (props: ProgressProps) => {
  return (
    <div data-testid="progress-counter">
      Step {props.value} of {props.max}
    </div>
  );
};
