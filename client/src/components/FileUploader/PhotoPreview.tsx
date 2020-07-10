// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import React, { useCallback, useContext, useEffect, useState } from "react";
import { inputCaptureSupported } from "style/utils";

import Box from "@material-ui/core/Box";
import { BodyText, Button, Label, Row, Col, InsetText } from "nhsuk-react-components";
import ImageSelectorInput from "./ImageSelectorInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import PhotoUploadProgressOverlay from "./PhotoUploadProgressOverlay";
import RDTImagePreview from "./RDTImagePreview";
import appContext, { AppContext } from "../App/context";
import useTestData from "hooks/useTestData";
import testContext, { TestContext } from "components/TestContainer/context";
import { PredictionData } from "abt-lib/models/Prediction";
import { ErrorSummary } from 'nhsuk-react-components';


export enum UPLOADING_STATES {
  OFF = 1, // default
  BACKGROUND, // uploading in the background
  UPLOADING, // uploading visible (on user click)
  DONE, // uploading done
  INTERPRETING, // linking photo uploaded to testrun.
}

export function isUploadBlocking(state: UPLOADING_STATES) {
  return (
    state === UPLOADING_STATES.UPLOADING ||
    state === UPLOADING_STATES.INTERPRETING
  );
}

export interface PhotoPreviewProps {
  handleShowCamera: () => void;
  handleImageAsFile: (image: File) => void;
  imageAsURI: string;
  imageAsFile: File | null;
  usedCamera: boolean;
  onInterpret: () => void;
  onInterpretFailure: () => void;
}

export default (props: PhotoPreviewProps) => {
  const {
    handleShowCamera,
    handleImageAsFile,
    imageAsURI,
    usedCamera,
    imageAsFile,
    onInterpret,
    onInterpretFailure
  } = props;

  const {
    setAppError,
    container: { getTestApi },
  } : AppContext = useContext(appContext) as AppContext;

  const {
    dispatch: testDispatch
  } = useContext(testContext) as TestContext;

  const testApi = getTestApi();
  const [testRecord ]  = useTestData();

  // Monitors the upload state
  const [uploadingState, setUploadingState] = useState<UPLOADING_STATES>(
    UPLOADING_STATES.OFF
  );

  const [ predictionData, setPredictionData ] = useState<PredictionData | null>(null);

  // Upload progress percentage
  const [progress, setProgress] = useState(0);

  const [uploadUserRequest, setUploadUserRequest] = useState(false);

  const handleRetry = useCallback(() => {
    setAppError(null);
    setUploadingState(UPLOADING_STATES.OFF);
  }, [setAppError]);

  // Initiate the upload on render.
  useEffect(() => {
    if (!imageAsFile && !imageAsURI) {
      return;
    }
    let isCancelled = false;
    const uploadAsync = async function () {
      try {
        if (testRecord && (imageAsFile || imageAsURI)) {

          await testApi.uploadImage(
            testRecord.uploadUrl,
            imageAsFile || imageAsURI,
            setProgress
          );

          if (isCancelled) {
            return;
          }
          setUploadingState(UPLOADING_STATES.DONE);
        } else {
          if (isCancelled) {
            return;
          }
          setUploadingState(UPLOADING_STATES.OFF);
          
          setAppError({
            code: "UPL2",
            onFix: handleRetry,
          });
          
        }
      } catch (error) {
        console.log("uploading error!");
        if (isCancelled) {
          return;
        }
        setAppError({
          code: "UPL1",
          onFix: handleRetry,
        });
      }
    };

    setProgress(0);
    setUploadingState(UPLOADING_STATES.BACKGROUND);
    uploadAsync();

    return () => {
      isCancelled = true;
    };
  }, [testApi, imageAsFile, imageAsURI, setAppError, testRecord, handleRetry, onInterpretFailure]);

  // Once the file is uploaded, it's ready to be interpreted.
  const linkPhotoToTestrun = useCallback(async () => {
    setUploadingState(UPLOADING_STATES.INTERPRETING);

    try {
      const response = await testApi.interpretResult();
      testDispatch({
        type: "SAVE_TEST",
        testRecord: response.testRecord
      });

      if (response.testRecord.testCompleted) {
        // Notify our parent step that our intepretation is finished, and we can send the user to their results
        onInterpret();
      } else {
        // Set our prediction data in the component so we can parse the failure reasons and display them to the user
        setPredictionData(response.testRecord.predictionData);
      }

      setUploadingState(UPLOADING_STATES.OFF);
 
    } catch (error) {
      setUploadingState(UPLOADING_STATES.OFF);
      setAppError({
        code: "INT1"
      }); 
    }
    
  }, [testApi, testDispatch, onInterpret, setAppError]);

  const getErrorMessages = useCallback(() : string[] => {
    const msgs: string[] = [];
    if (predictionData?.quality.blur === 'blurred') {
      msgs.push("was not in focus (clear enough)");
    }
    if (predictionData?.quality.exposure === 'overexposed') {
      msgs.push("was overexposed (too bright)");
    }
    if (predictionData?.quality.exposure === 'underexposed') {
      msgs.push("was underexposed (too dark)");
    }
    if (predictionData?.quality.exposure === 'over_and_underexposed') {
      msgs.push("has inconsistent lighting");
    }

    return msgs;
  }, [predictionData]);

  // Photo is uploaded and the user has requested the upload.
  useEffect(() => {
    if (uploadingState === UPLOADING_STATES.DONE && uploadUserRequest) {
      linkPhotoToTestrun();
      setUploadUserRequest(false);
    }
  }, [linkPhotoToTestrun, uploadUserRequest, uploadingState]);

  // Occurs when the person accepts the image by tapping "Continue"
  const handleAcceptPhoto = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (uploadingState === UPLOADING_STATES.BACKGROUND) {
        setUploadingState(UPLOADING_STATES.UPLOADING);
        setUploadUserRequest(true);
      } else if (uploadingState === UPLOADING_STATES.DONE) {
        linkPhotoToTestrun();
      }
    },
    [uploadingState, linkPhotoToTestrun]
  );

  const time = "15:00";

  return (
    <Row>
      <Col width="full">
        <Label size="l"><span data-testid="page-title">{predictionData?.success === false ? "Re-take your photograph" : "Check your photograph"}</span></Label>
        {predictionData?.success === false && (
          <ErrorSummary
            aria-labelledby="error-summary-title"
            role="alert"
            tabIndex={-1}>
            <ErrorSummary.Title id="error-summary-title">
            There is a problem
            </ErrorSummary.Title>
            <ErrorSummary.Body>
              <p>
              You need to take another photo of your test kit because it did not pass our quality checks. Your photo:
              </p>
              <ul>
                {getErrorMessages().map(msg => (
                  <li>{msg}</li>
                ))}
              </ul>
            </ErrorSummary.Body>
          </ErrorSummary>)}
      </Col>
      <Col width="two-thirds">
        <div>
          <div className={(predictionData?.success === false ? "nhsuk-form-group--error" : "")}>
            {imageAsURI && <RDTImagePreview dataURI={imageAsURI} />}
          </div>
          {(isUploadBlocking(uploadingState) ||
          (uploadingState === UPLOADING_STATES.DONE && uploadUserRequest)) && (
            <PhotoUploadProgressOverlay
              progress={progress}
              interpreting={uploadingState === UPLOADING_STATES.INTERPRETING}/>
          )}
          {(uploadingState === UPLOADING_STATES.BACKGROUND ||
          uploadingState === UPLOADING_STATES.DONE) && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}>
              <LinearProgress
                variant="determinate"
                value={progress} />
            </Box>
          )}
        </div>
      </Col>
      <Col width="full">
        <InsetText>
          <BodyText> 
            You have <b>{time}</b> minutes left to submit your photograph.
          </BodyText>
        </InsetText> 
        <BodyText>
          {predictionData?.success === false ? "Your photo did not pass our quality checks. " : "Check to make sure you are happy with the photograph before sending it. "}
          Make sure that the photo:
        </BodyText>
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>is in focus</li>
          <li>has the test kit aligned to the example image</li>
          <li>is not photographed in bright light</li>
          <li>does not have shadows falling across it</li>
        </ul>
        {predictionData?.success !== false && (
          <Button
            className="nhsuk-u-margin-right-3"
            disabled={isUploadBlocking(uploadingState)}
            onClick={handleAcceptPhoto}
          >
          Submit photo
          </Button>)}
        <Button
          secondary={predictionData?.success !== false}
          onClick={handleShowCamera}
        >
          Re-take your photo
        </Button>
        {!usedCamera && (
          <ImageSelectorInput
            onImageSelected={handleImageAsFile}
            disabled={isUploadBlocking(uploadingState)}
            secondary={predictionData?.success !== false}
            label={inputCaptureSupported() ? "Take your photo again" : "Re-upload your photo"}
          />
        )}
      </Col>
    </Row>
  );
};
