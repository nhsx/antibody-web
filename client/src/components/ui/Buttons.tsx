// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { FunctionComponent } from 'react';
import { ActionLink } from 'nhsuk-react-components';

export interface ContinueButtonProps {
  text?: string;
  href?: string;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = (
  props: ContinueButtonProps
) => {
  console.log("continue button props=>", props);
  return (
    <ActionLink href={props.href ? props.href : ""} >{props.text ? props.text : 'Next'}</ActionLink>
  );
};
