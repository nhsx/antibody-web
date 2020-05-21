// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const style = makeStyles(() =>
  createStyles({
    nextButton: {
      minWidth: '185px',
      marginTop: '30px',
    },
  })
);

export const Button: FunctionComponent<MaterialButtonProps> = (props) => {
  return (
    <MaterialButton variant="contained" color="primary" {...props}>
      {props.children}
    </MaterialButton>
  );
};

export interface ContinueButtonProps extends MaterialButtonProps {
  text?: string;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = (
  props: ContinueButtonProps
) => {
  const styles = style();

  return (
    <Button className={styles.nextButton} size="large" {...props}>
      <span>{props.text ? props.text : 'Next'}</span>
      <span className="icon is-medium">
        <FontAwesomeIcon icon="arrow-right" />
      </span>
    </Button>
  );
};
