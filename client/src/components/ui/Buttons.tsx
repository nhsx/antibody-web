// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {  ButtonProps as MaterialButtonProps } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export interface ContinueButtonProps extends MaterialButtonProps {
  text?: string;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = (
  props: ContinueButtonProps
) => {

  return (
    <div className="nhsuk-action-link">
      <a className="nhsuk-action-link__link">
        <svg className="nhsuk-icon nhsuk-icon__arrow-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"></path>
        </svg>
        <span className="nhsuk-action-link__text">{props.text ? props.text : 'Next'}</span>
      </a>
    </div>
  );
};
