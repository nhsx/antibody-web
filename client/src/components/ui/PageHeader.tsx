// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import Divider from './Divider';
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default (props: PageHeaderProps) => (
  <React.Fragment>
    <div className="container">
      <h1 className="title is-spaced">{props.title}</h1>
      {props.subtitle && <p>{props.subtitle}</p>}
      <Divider />
    </div>
  </React.Fragment>
);
