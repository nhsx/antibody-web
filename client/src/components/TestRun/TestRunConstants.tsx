// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { APP_MODES, CURRENT_APP_MODE } from "utils/globalConstants";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import Asset from "../ui/Asset";
import Grid from "@material-ui/core/Grid";
import PhotoUploaderPanel from "../FileUploader/PhotoUploaderPanel";
import React from "react";
import TimedStep from "./TimedStep";
import transcribeTestPath from "./transcribeTestPath";
import { Row, Col, BodyText, Images, Details } from "nhsuk-react-components";

export const FORMID = "stepForm";
export const UNSET_PROFILE_ID = "UNSET_PROFILE_ID";

export const getStepStyle = makeStyles((theme: Theme) =>
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
    ContentComponent: React.memo(props => (
      <Row>
        <Col width="full">
          <BodyText>Your test kit should include:</BodyText>
          <Images
            srcSet="/assets/images/check-your-test-kit/lancet.png 325w"
            alt="Image of the lancet"
            caption="Lancet (finger prick tool)"
          />
          <Images
            srcSet="/assets/images/check-your-test-kit/small-bottle.png 325w"
            alt="Image of the small bottle"
            caption="Small bottle"
          />
          <Images
            srcSet="/assets/images/check-your-test-kit/pipette.png 325w"
            alt="Image of the pipette"
            caption="Pipette"
          />
          <Images
            srcSet="/assets/images/check-your-test-kit/test-device.png 325w"
            alt="Image of the test device"
            caption="Test device"
          />
          <Images
            srcSet="/assets/images/check-your-test-kit/disposal-bag.png 325w"
            alt="Image of the bag to dispose the kit"
            caption="Special bag to dispose of the kit"
          />
          <BodyText>
            Keep them wrapped and do not squeeze or bend them - handle gently
          </BodyText>
          <BodyText>Not supplied but needed: plaster/tissue</BodyText>
        </Col>
      </Row>
    )),
    nav: {
      next: {
        default: "washAndDryHands"
      }
    }
  },
  washAndDryHands: {
    title: "Wash and dry hands",
    ContentComponent: React.memo(props => (
      <Row>
        <Col width="full">
          <Asset
            src="wash-and-dry-your-hands.png"
            alt="Wash and dry your hands icon"
            width={201}
            height={201}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Wash hands for 20 seconds using warm water and soap</li>
            <li>Dry hands thoroughly</li>
            <li>Do not apply hand cream or sanitiser</li>
          </ul>
        </Col>
      </Row>
    )),
    nav: {
      next: {
        default: "setUpTest"
      }
    }
  },
  setUpTest: {
    title: "Set up test",
    ContentComponent: React.memo(props => (
      <Row>
        <Col width="full">
          <Asset
            src="kit.png"
            alt="Image of the test kit"
            width={201}
            height={203}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>It takes about 15 to 20 minutes to do the test</li>
            <li>Choose a well lit room</li>
            <li>Choose a flat clean dry surface</li>
            <li>Remove pipette and test device from packaging</li>
            <li>Carefully twist and pull cap off lancet</li>
          </ul>
        </Col>
      </Row>
    )),
    nav: {
      next: {
        default: "selectAFinger"
      }
    }
  },
  selectAFinger: {
    title: "Select a finger",
    ContentComponent: React.memo(props => (
      <Row>
        <Col width="full">
          <Asset
            src="select-a-finger.png"
            alt="Image showing arrows pointing to the middle and ring finger"
            width={325}
            height={201}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Choose a finger on the hand you do not write with</li>
            <li>
              The 3rd or 4th (middle or ring) finger are usually less sensitive
            </li>
            <li>
              Get blood flowing into finger - hold hand below waist and gently
              squeeze along finger from knuckle to tip for 10 seconds
            </li>
          </ul>
          <Details>
            <Details.Summary>
              If you’ve had a mastectomy (breast removal)
            </Details.Summary>
            <Details.Text>
              <BodyText>
                You must not prick a finger on the same side of your body as the
                operation. If you’re worried, speak to your doctor.
              </BodyText>
            </Details.Text>
          </Details>
        </Col>
      </Row>
    )),
    nav: {
      next: {
        default: "scanStrip"
      }
    }
  },
  scanStrip: {
    title: "Scan your test strip",
    ContentComponent: React.memo(props => (
      <div>
        <div>
          Ensure your test strip is in the middle of the box, and hold your
          phone flat and directly above your test strip before taking its photo.
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Asset
              className={getStepStyle().centeredAsset}
              height={180}
              width={290}
              alt="Image of the test strip being put in its position in the box."
              src="scanthestrip.png"
            />
          </Grid>
          <Grid item xs={6}>
            <Asset
              className={getStepStyle().centeredAsset}
              height={180}
              width={290}
              alt="Image of a phone taking the test strip photo."
              src="holdphone.png"
            />
          </Grid>
        </Grid>
        {CURRENT_APP_MODE === APP_MODES.PROD && (
          <div>Choose one of the options below to take the photo.</div>
        )}
        <PhotoUploaderPanel {...props} />
      </div>
    )),
    hasFormContent: true,
    nav: {
      next: {
        default: "waitVialReaction"
      }
    }
  },
  waitVialReaction: {
    isBlockingStep: true,
    ContentComponent: React.memo((props: StepDetailComponentProp) => {
      // TODO: make a facts list that changes every x seconds.
      return (
        <>
          <TimedStep
            description="Wait for a full minute so that the testing solution can react with the sample from the swab."
            duration={60000}
            {...props}
          />
          <h1 className="title">Did you know?</h1>
          <p>
            You can become infected by coming into close contact (about 6 feet
            or two arm lengths) with a person who has COVID-19. COVID-19 is
            primarily spread from person to person.
          </p>
        </>
      );
    }),
    nav: {
      previous: "scanStrip"
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
