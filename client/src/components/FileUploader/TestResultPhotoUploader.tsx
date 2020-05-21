// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import 'react-html5-camera-photo/build/css/index.css';
import React, { useCallback, useState } from 'react';
import { Button } from 'nhsuk-react-components';

import Divider from '../ui/Divider';
import { FORMID } from '../TestRun/TestRunConstants';
import Grid from '@material-ui/core/Grid';
import ImageSelectorInput from './ImageSelectorInput';
import RDTImagePreview from './RDTImagePreview';
import { ROUTE_DEFINITIONS } from '../../routes/routes';
import TestStripCamera from './TestStripCamera';
import { getAppConfig } from 'utils/AppConfig';
import { useHistory } from 'react-router-dom';
import { useModelPreLoader } from './RDTModelLoader';
import { uploadImage } from 'api/testApi';
import { AppContext, withApp } from 'components/App/context';


const config = getAppConfig();

interface TestResultPhotoUploaderProps {
  testRunUID: string;
  onFileUploadComplete: (ready: boolean) => void;
  app: AppContext;
}

const TestResultPhotoUploader = (props: TestResultPhotoUploaderProps) => {
  const { testRunUID, onFileUploadComplete, app } = props;
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

  // Occurs after the user selects a file.
  const handleImageAsFile = useCallback(
    (image: File) => {
      setImageAsFile(image);

      // Show the preview
      setImageAsURI(URL.createObjectURL(image));

      // Reset other data
      setCameraEnabled(false);
      setImageUploadedURL('');

      // Hide the Next button.
      onFileUploadComplete(false);
    },
    [onFileUploadComplete]
  );

  // Occurs when the person chose to use its camera.
  const handleShowCamera = useCallback(() => {
    setCameraEnabled(true);

    // Reset other data
    setImageAsFile(null);
    setImageAsURI('');
    setImageUploadedURL('');

    // Disable the next button.
    onFileUploadComplete(false);
  }, [onFileUploadComplete]);

  // Occurs when a photo is taken.
  const handlePhotoTaken = useCallback((dataURI: string) => {
    setCameraEnabled(false);
    // Show the preview
    setImageAsURI(dataURI);
  }, []);

  const onSubmitForm = useCallback(() => {
    // This is a dummy form, only here to go to the next page.
    history.push(
      ROUTE_DEFINITIONS.TESTRESULT.path.replace(':testRunUID', testRunUID)
    );
  }, [history, testRunUID]);

  // Occurs when the person uploads the photo
  // TODO: Handle Errors
  const handleUpload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsUploading(true);
      if (imageAsFile === null && !imageAsURI) {
        console.error(`Cannot upload an empty image.`);
        setIsUploading(false);
        return;
      }

      //@TODO: Add failure handling
      await uploadImage(app.state.testData?.uploadUrl, imageAsFile);
  
    },
    [imageAsFile, imageAsURI, setIsUploading, app.state]
  );

  return (
    <div>
      {!(cameraEnabled || imageAsURI || imageUploadedURL) && (
        <Grid
          container
          direction="row"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          {config.photoUploadEnabled && (
            <Grid
              item
              xs={12}
              sm={'auto'}
            >
              <ImageSelectorInput
                onImageSelected={handleImageAsFile}
                disabled={isUploading}
              />
            </Grid>
          )}
          {config.photoUploadEnabled && config.cameraInlineEnabled && (
            <Grid
              xs={12}
              sm={2}
              item>
              <Divider
                label="OR"
                isVertical={true} />
            </Grid>
          )}
          {config.cameraInlineEnabled && (
            <Grid
              item
              xs={12}
              sm={'auto'}
            >
              <Button
                disabled={isUploading}
                onClick={handleShowCamera}
              >
                <span>Take a Photo</span>
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      {(cameraEnabled || imageAsURI || imageUploadedURL) && (
        <div>
          {cameraEnabled && <TestStripCamera onPhotoTaken={handlePhotoTaken} />}
          <div>
            {(imageAsURI || imageUploadedURL) && (
              <div>
                {imageUploadedURL && (
                  <img
                    src={imageUploadedURL}
                    alt="preview"
                  />
                )}
                {imageAsURI && <RDTImagePreview dataURI={imageAsURI} />}
              </div>
            )}
            {imageAsURI && (
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Button
                      disabled={isUploading}
                      onClick={handleUpload}
                    >
                      <span>Upload</span>
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      disabled={isUploading}
                      onClick={handleShowCamera}
                    >
                      <span>Retake</span>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
            {imageUploadedURL && (
              <Button
                disabled={isUploading}
                form={FORMID}
                type="submit"
              >
                <span>View Results</span>
              </Button>
            )}
          </div>
        </div>
      )}
      <form
        id={FORMID}
        onSubmit={onSubmitForm} />
    </div>
  );
};

export default withApp(TestResultPhotoUploader);
