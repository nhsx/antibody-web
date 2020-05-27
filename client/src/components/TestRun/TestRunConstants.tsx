// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {  createStyles, makeStyles } from "@material-ui/core";
import React from "react";

export const FORMID = "stepForm";
export const UNSET_PROFILE_ID = "UNSET_PROFILE_ID";

export const getStepStyle = makeStyles(() =>
  createStyles({
    bulletList: {
      listStyleType: "square",
      paddingLeft: "1em",
      listStylePosition: "outside",
      "& li": {
        margin: "1rem 0"
      }
    },
    centeredAsset: {
      display: "block",
      margin: "1rem auto"
    }
  })
);

export interface StepDetailComponentProp {
  setStepReady: (ready: boolean) => void;
  submitUrl?: string;
  testRunUID: string;
}

interface NavLink {
  default: string; // default step name for the nav.
  [type: string]: string; // Other possible links.
}

interface StepDetailsIncomplete {
  // Asset before the title.
  LeadingAsset?: React.FunctionComponent;
  title?: string;
  ContentComponent: React.FunctionComponent<StepDetailComponentProp>;
  skipStepForExistingUser?: boolean;
  // this step has a form blocking progress to the next step.
  hasFormContent?: boolean;
  isBlockingStep?: boolean;
  nav: {
    previous?: string;
    next?: NavLink;
  };
}

export interface StepDetails extends StepDetailsIncomplete {
  name: string;
}

export const START_STEP = "checkYourKit";
