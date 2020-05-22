// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {  createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import transcribeTestPath from "./transcribeTestPath";
import CheckYourKit from "./ContentComponent/CheckYourKit";
import WashAndDryHands from "./ContentComponent/WashAndDryHands";
import SetUpTest from "./ContentComponent/SetUpTest";
import SelectAFinger from "./ContentComponent/SelectAFinger";
import Wait from "./ContentComponent/Wait";
import ScanKit from "./ContentComponent/ScanKit";
import Results from "./ContentComponent/Results";

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

// This list represents each steps of the test kit tutorial.
const testrunSteps: { [stepName: string]: StepDetailsIncomplete } = {
  checkYourKit: {
    title: "Check your test kit",
    ContentComponent: React.memo(() => <CheckYourKit />),
    nav: {
      next: {
        default: "washAndDryHands"
      }
    }
  },
  washAndDryHands: {
    title: "Wash and dry hands",
    ContentComponent: React.memo(() => <WashAndDryHands />),
    nav: {
      next: {
        default: "setUpTest"
      }
    }
  },
  setUpTest: {
    title: "Set up test",
    ContentComponent: React.memo(() => <SetUpTest />),
    nav: {
      next: {
        default: "selectAFinger"
      }
    }
  },
  selectAFinger: {
    title: "Select a finger",
    ContentComponent: React.memo(() => <SelectAFinger />),
    nav: {
      next: {
        default: "scanKit"
      }
    }
  },
  wait: {
    title: "Wait for your kit to react",
    ContentComponent: React.memo(() => <Wait />),
    nav: {
      next: {
        default: "scanKit"
      }
    }
  },
  scanKit: {
    title: "Scan your test kit",
    ContentComponent: React.memo(() => <ScanKit />),
    nav: {
      next: {
        default: "results"
      }
    }
  },
  results: {
    title: "Results",
    ContentComponent: React.memo(() => <Results />),
    nav: {
      previous: "scanKit"
    }
  }
};

const TESTRUN_STEPS: { [stepName: string]: StepDetails } = {};

// Populate the name field
Object.getOwnPropertyNames(testrunSteps).forEach((stepName: string) => {
  TESTRUN_STEPS[stepName] = {
    ...testrunSteps[stepName],
    name: stepName
  };
});

transcribeTestPath(TESTRUN_STEPS);

export { TESTRUN_STEPS };

export function getNextStepOfType(param: {
  currentStepName: string;
  nextStepType: string;
}): string | undefined {
  const nextNav = TESTRUN_STEPS[param.currentStepName].nav.next;
  if (nextNav) {
    return nextNav[param.nextStepType];
  }
  return undefined;
}

export function getNextDefaultStep(param: {
  currentStepName: string;
}): string | undefined {
  return getNextStepOfType({
    ...param,
    nextStepType: "default"
  });
}

export function getPreviousStep(param: {
  currentStepName: string;
}): string | undefined {
  return TESTRUN_STEPS[param.currentStepName].nav.previous;
}
