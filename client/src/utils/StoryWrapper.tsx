// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import '../style/sassStyle';

import React, { ReactNode } from 'react';

export default (props: { children: ReactNode }) => (
  <div className="section">{props.children}</div>
);
