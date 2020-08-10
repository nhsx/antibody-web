// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import 'react-html5-camera-photo/build/css/index.css';

import { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import React, { useCallback, useRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

import Camera from 'react-html5-camera-photo';
import { getAppConfig } from 'utils/AppConfig';
import useFullscreenStatus from './useFullscreenStatus';

const useStyle = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'inline-block',
      position: 'relative',
    },

    overlay: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },

    overlayTestStrip: {
      backgroundColor: '#000',
      opacity: 0.3,
    },

    borderColumn: {
      backgroundColor: '#000',
    },

    overlayStripImage: {
      height: '100%',
      maxWidth: 'inherit',
      width: 'initial',
    },

    root: {
      position: 'relative',
      textAlign: 'center',

      '& .react-html5-camera-photo': {
        textAlign: 'initial',
        lineHeight: 0,
      },
    },
  })
);

// NOTE 1: We have to work around some bugs in react-html5-camera-photo.
//
// Bug 1: If the idealResolution prop changes at all, the <Camera> component
// will tear down the MediaStream and create a new one.
//
// Bug 2: The <Camera> component doesn't handle changing the MediaStream very
// well.  It often gets stuck in an infinite loop where it continually tears
// down the MediaStream and creates a new one.
//
// To avoid these bugs, we must ensure that the idealResolution prop never
// changes during the lifecycle of the <Camera> component.
//
// NOTE 2:  2240 pixels is a bit arbitrary.  We want the dimensions of the final
// test area to be at least 224x224 pixels.  We choose 2240 pixels so that the
// test area can be as small as 10% of the original image width.
const IDEAL_RESOLUTION = { width: 2240 };

const config = getAppConfig();

const TestStripCamera = (props: {
  onPhotoTaken: (dataURI: string) => void;
  onError: (error: any) => void;
}) => {
  const { onPhotoTaken, onError } = props;
  const classes = useStyle();
  const refCamera = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(refCamera);

  const handleTakePhotoAnimationDone = useCallback(
    (dataURI: string) => {
      setFullscreen(false);
      onPhotoTaken(dataURI);
    },
    [setFullscreen, onPhotoTaken]
  );

  const onCameraStart = useCallback(
    (stream: MediaStream) => {
      if (!isFullscreen && config.cameraFullScreenEnabled) {
        setFullscreen(true);
      }
    },
    [setFullscreen, isFullscreen]
  );

  const onCameraStop = useCallback(() => {
    setFullscreen(false);
  }, [setFullscreen]);

  return (
    <div className={classes.root}>
      <div
        className={classes.wrapper}
        ref={refCamera}>
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          onCameraError={onError}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={IDEAL_RESOLUTION}
          imageType={IMAGE_TYPES.PNG}
          imageCompression={0.97}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={isFullscreen}
          sizeFactor={1}
          onCameraStart={onCameraStart}
          onCameraStop={onCameraStop}
        />
      </div>
    </div>
  );
};

export default TestStripCamera;
