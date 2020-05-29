// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import 'react-html5-camera-photo/build/css/index.css';
import React, { useCallback, useState, useContext } from 'react';
import { Button, Container, Row, Col } from 'nhsuk-react-components';
import Divider from '../ui/Divider';
import ImageSelectorInput from './ImageSelectorInput';
import RDTImagePreview from './RDTImagePreview';
import TestStripCamera from './TestStripCamera';
import { getAppConfig } from 'utils/AppConfig';
import { useHistory } from 'react-router-dom';
import { useModelPreLoader } from './RDTModelLoader';
import { dataURIToBlob, blobToFile } from 'utils/file';
import appContext, { AppContext } from 'components/App/context';
import testContext, { TestContext } from 'components/TestContainer/context';

const config = getAppConfig();

const styles = {
  image: {
    maxWidth: "100%"
  }
};

const TestResultPhotoUploader = () => {
  const app = useContext(appContext) as AppContext;  
  const test = useContext(testContext) as TestContext;
  const { setAppError, container } = app;
  const testRecord = test.state.testRecord;
  const { getTestApi } = container;
  const testApi =  getTestApi();
  const history = useHistory();

  // Preload model.
  useModelPreLoader();

  // Show/hide the camera
  const [cameraEnabled, setCameraEnabled] = useState(false);
  // Image upload flow
  const [imageAsFile, setImageAsFile] = useState<File | null>(null);
  // Show the image preview
  const [imageAsURI, setImageAsURI] = useState('');
  // Show the image imageUploaded
  const [imageUploadedURL, setImageUploadedURL] = useState('');
  // Monitors the upload state
  const [isUploading, setIsUploading] = useState(false);
  // Analyse
  const [isProcessing, setIsProcessing] = useState(false);


  // Occurs after the user selects a file.
  const handleImageAsFile = useCallback((image: File) => {

    setImageAsFile(image);

    // Show the preview
    setImageAsURI(URL.createObjectURL(image));

    // Reset other data
    setCameraEnabled(false);
    setImageUploadedURL('');
  }, []);

  // Occurs when the person chose to use its camera.
  const handleShowCamera = useCallback(() => {
    setCameraEnabled(true);

    // Reset other data
    setImageAsFile(null);
    setImageAsURI('');
    setImageUploadedURL('');
  }, []);

  // Occurs when a photo is taken.
  const handlePhotoTaken = useCallback((dataURI: string) => {
    setCameraEnabled(false);
    const blob = dataURIToBlob(dataURI);
    const file = blobToFile(blob, 'rdtImage');
    setImageAsFile(file);
    setImageAsURI(dataURI);
  }, []);

  const onSubmitForm = useCallback(() => {
    // This is a dummy form, only here to go to the next page.
    history.push("/test/results");
  }, [history]);

  const handleRetry = useCallback(() => {
    setAppError(null);
    setIsUploading(false);
    setImageAsFile(null);
  }, [setAppError, setIsUploading, setImageAsFile]);

  // Occurs when the person uploads the photo
  // TODO: Handle Errors
  const handleUpload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsUploading(true);
      if (imageAsFile === null && !imageAsURI) {
        console.error(`Cannot upload an empty image.`);
        setIsUploading(false);
        setAppError({
          code: "UPL1"
        });
        return;
      }

      try {
        if (testRecord && (imageAsFile || imageAsURI)) {
          await testApi.uploadImage(testRecord.uploadUrl, imageAsFile || imageAsURI);
          setImageUploadedURL(testRecord.downloadUrl);
          setIsUploading(false);
          setIsProcessing(true);
          setTimeout(() => {
            setIsProcessing(false);
          }, 2000);
        } else {
          setAppError({
            code: "UPL2",
            onFix: handleRetry
          });
        }

      } catch (error) {
        setIsUploading(false);
        setAppError({
          code: "UPL1",
          onFix: handleRetry
        });
        throw error;
      }
    },
    [imageAsFile, imageAsURI, setIsUploading, testApi, handleRetry, setAppError, testRecord]
  );

  return (
    <div>
      {!(cameraEnabled || imageAsURI || imageUploadedURL) && (
        <Container>
          <Row>
            <Col width="full">
              {config.photoUploadEnabled && (
                <Container>
                  <Row>
                    <Col width="full">
                      <ImageSelectorInput
                        onImageSelected={handleImageAsFile}
                        disabled={isUploading}
                      />
                    </Col></Row></Container>
              )}
              {config.photoUploadEnabled && config.cameraInlineEnabled && (
                <Container>
                  <Row>
                    <Col width="full">

                      <Divider
                        label="OR"
                        isVertical={true} />
                    </Col>
                  </Row>
                </Container>
              )}
              {config.cameraInlineEnabled && (
                <Container>
                  <Row>
                    <Col width="full">

                      <Button
                        disabled={isUploading}
                        onClick={handleShowCamera}
                      >
                        <span>Take a Photo</span>
                      </Button>
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
        </Container>
      )}
      {(cameraEnabled || imageAsURI || imageUploadedURL) && (
        <div>
          {cameraEnabled && <TestStripCamera onPhotoTaken={handlePhotoTaken} />}
          <div>
            {(imageAsURI || imageUploadedURL) && (
              <div>
                {imageUploadedURL && (
                  <>
                    <img
                      style={styles.image}
                      src={imageUploadedURL}
                      alt="preview"
                    />
                    {isProcessing && "Analysing Your Results..."}
                  </>
                )}
                {imageAsURI && !imageUploadedURL && <RDTImagePreview dataURI={imageAsURI} />}
              </div>
            )}
            {imageAsURI && (
              <div>
                <Container>
                  <Row>
                    <Col width="full">
                      <Container>
                        <Row>
                          <Col width="full">
                            <Button
                              disabled={isUploading}
                              onClick={handleUpload}
                            >
                              <span>{imageUploadedURL ? "Upload New File" : "Upload"}</span>
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <Col width="full">
                            <Button
                              disabled={isUploading}
                              onClick={handleShowCamera}
                            >
                              <span>{imageAsFile ? "Take Photo" : "Retake"}</span>
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
          </div>
        </div>
      )}
      <form
        onSubmit={onSubmitForm} />
    </div>
  );
};

export default TestResultPhotoUploader;
