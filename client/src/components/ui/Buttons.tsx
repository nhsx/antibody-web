// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {  ButtonProps as MaterialButtonProps } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { ActionLink } from 'nhsuk-react-components';
import { Link } from 'react-router-dom';

export interface ContinueButtonProps extends MaterialButtonProps {
  text?: string;
  href?: string;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = (
  props: ContinueButtonProps
) => {

  return (
    <ActionLink>{props.href ? <Link to={props.href}>{props.text ? props.text : 'Next'}</Link> : props.text}</ActionLink>
  );
};
