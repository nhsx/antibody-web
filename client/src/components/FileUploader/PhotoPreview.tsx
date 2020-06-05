// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import React, { useCallback, useContext, useEffect, useState } from "react";
import { inputCaptureSupported } from "style/utils";

import Box from "@material-ui/core/Box";
import { BodyText, Button, Label } from "nhsuk-react-components";
import ImageSelectorInput from "./ImageSelectorInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import PhotoUploadProgressOverlay from "./PhotoUploadProgressOverlay";
import RDTImagePreview from "./RDTImagePreview";
import appContext, { AppContext } from "../App/context";
import useTestData from "hooks/useTestData";
import testContext, { TestContext } from "components/TestContainer/context";

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

      setUploadingState(UPLOADING_STATES.OFF);
      // Notify our parent step that our intepretation is finished, and we can send the user to their results
      onInterpret();
    } catch (error) {
      // @TODO: Handle various issues with the image ->
      // - too dark
      // - blurred
      // - no casette recognised
      setUploadingState(UPLOADING_STATES.OFF);
      setAppError({
        code: "INT1",
        onFix: onInterpretFailure
      });
    }
    
  }, [testApi, testDispatch, onInterpret, setAppError, onInterpretFailure]);

  // Photo is uploaded and the user has requested the upload.
  useEffect(() => {
    if (uploadingState === UPLOADING_STATES.DONE && uploadUserRequest) {
      linkPhotoToTestrun();
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

  return (
    <>
      <div>
        {imageAsURI && <RDTImagePreview dataURI={imageAsURI} />}
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

      <Label size="l">Review your test photo</Label>

      <BodyText>
        {(usedCamera || inputCaptureSupported()) &&
          "Confirm that your test photo looks good, or choose Retake photo."}
        {!usedCamera &&
          !inputCaptureSupported() &&
          "Confirm that your test photo looks good, or choose Re-upload photo."}
      </BodyText>
      <Button
        disabled={isUploadBlocking(uploadingState)}
        onClick={handleAcceptPhoto}
        type="submit"
      >
        Continue
      </Button>
      {usedCamera && (
        <Button
          secondary
          onClick={handleShowCamera}
        >
          Retake photo
        </Button>
      )}
      {!usedCamera && (
        <ImageSelectorInput
          onImageSelected={handleImageAsFile}
          disabled={isUploadBlocking(uploadingState)}
          secondary
          label={inputCaptureSupported() ? "Retake photo" : "Re-upload photo"}
        />
      )}
    </>
  );
};
