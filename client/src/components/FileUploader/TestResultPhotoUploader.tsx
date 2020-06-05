// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useCallback, useState } from "react";
import CameraErrorView from "./CameraErrorView";
import CameraView from "./CameraView";
import PhotoCaptureView from "./PhotoCaptureView";
import PhotoPreview from "./PhotoPreview";

import { useModelPreLoader } from "./RDTModelLoader";

interface TestResultPhotoUploaderProps {
  onInterpret: () => void;
}

const TestResultPhotoUploader = (props: TestResultPhotoUploaderProps) => {
  const { onInterpret } = props;

  // Preload model.
  useModelPreLoader();

  // Show/hide the camera
  const [cameraOn, setCameraOn] = useState(false);

  // Image upload flow
  const [imageAsFile, setImageAsFile] = useState<File | null>(null);
  // Show the image preview
  const [imageAsURI, setImageAsURI] = useState('');

  // Tracks if a camera error occurs
  const [cameraHasError, setCameraHasError] = useState(false);

  // Occurs after the user selects a file.
  const handleImageAsFile = useCallback((image: File) => {

    setImageAsFile(image);

    // Show the preview
    setImageAsURI(URL.createObjectURL(image));

    // Reset other data
    setCameraOn(false);

  }, []);

  // Occurs when the person chose to use its camera.
  const handleShowCamera = useCallback(() => {
    setCameraOn(true);
    setCameraHasError(false);

    // Reset other data
    setImageAsFile(null);
    setImageAsURI('');
  }, []);

  // Occurs when a photo is taken.
  const handlePhotoTaken = useCallback((dataURI: string) => {
    setCameraOn(false);
    // Show the preview
    setImageAsURI(dataURI);
  }, []);

  const handleCameraError = useCallback(() => {
    setCameraHasError(true);
  }, []);

  const handleInterpretFailure = useCallback(() => {
    setImageAsURI('');
    setImageAsFile(null);
  }, []);

  if (imageAsURI) {
    return (
      <PhotoPreview
        usedCamera={!cameraHasError}
        handleShowCamera={handleShowCamera}
        handleImageAsFile={handleImageAsFile}
        imageAsURI={imageAsURI}
        imageAsFile={imageAsFile}
        onInterpret={onInterpret}
        onInterpretFailure={handleInterpretFailure}
      />
    );
  } else if (cameraHasError) {
    return <CameraErrorView handleImageAsFile={handleImageAsFile} />;
  } else {
    if (cameraOn) {
      return (
        <CameraView
          onPhotoTaken={handlePhotoTaken}
          onError={handleCameraError}
        />
      );
    } else {
      return <PhotoCaptureView handleShowCamera={handleShowCamera} />;
    }
  }
};
export default TestResultPhotoUploader;
