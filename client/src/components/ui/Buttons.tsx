// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {  ButtonProps as MaterialButtonProps } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { ActionLink } from 'nhsuk-react-components';

export interface ContinueButtonProps extends MaterialButtonProps {
  text?: string;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = (
  props: ContinueButtonProps
) => {

  return (
    <ActionLink>{props.text ? props.text : 'Next'}</ActionLink>
  );
};
