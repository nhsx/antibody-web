// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import 'react-html5-camera-photo/build/css/index.css';

import { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {
  IMAGE_SIZE,
  TopDetectionData,
  analyzeImage,
  isTopDetectionDataComplete,
} from './RDTAnalyzer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

import Camera from 'react-html5-camera-photo';
import DetectionBoxOverlay from './DetectionBoxOverlay';
import { ImageCapture } from 'image-capture';
import Measure from 'react-measure';
import { confirmAlert } from '../../utils/confirmAlert';
import { cx } from 'style/utils';
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

const PHOTO_TRIGGER_HEIGHT = 90;
const TRIGGER_PADDING = 15;
const STRIP_IMAGE_HEIGHT = 426;
const STRIP_IMAGE_WIDTH = 26;

const getFullPhotoUri = (frame: ImageBitmap): string => {
  const canvas = document.createElement('canvas');
  canvas.height = frame.height;
  canvas.width = frame.width;
  const context = canvas.getContext('2d');
  context!.drawImage(
    frame,
    0,
    0,
    frame.width,
    frame.height,
    0,
    0,
    frame.width,
    frame.height
  );
  return canvas.toDataURL();
};

const config = getAppConfig();

const TestStripCamera = (props: {
  onPhotoTaken: (dataURI: string) => void;
}) => {
  const { onPhotoTaken } = props;
  const classes = useStyle();
  // dimensions of the video
  const [dimensions, setDimensions] = useState({ width: -1, height: -1 });
  const refCamera = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(refCamera);
  // Video track.
  const [track, setTrack] = useState<MediaStreamTrack>();
  // Detection Data for the test strip.
  const [detectionData, setDetectionData] = useState<TopDetectionData>();
  const [liveRecognitionEnabled, setLiveRecognitionEnabled] = useState(
    config.cameraLiveMLRecognitionEnabled
  );

  const handleTakePhotoAnimationDone = useCallback(
    (dataURI: string) => {
      setFullscreen(false);
      onPhotoTaken(dataURI);
    },
    [setFullscreen, onPhotoTaken]
  );

  useEffect(() => {
    let isRunning = true;
    if (!liveRecognitionEnabled || !config.cameraLiveMLRecognitionEnabled) {
      return;
    }
    const token = setTimeout(async () => {
      if (track) {
        const capture = new ImageCapture(track);
        let frame;
        try {
          frame = await capture.grabFrame();

          const canvas = document.createElement('canvas');
          canvas.height = IMAGE_SIZE;
          canvas.width = IMAGE_SIZE;
          const context = canvas.getContext('2d');
          context!.drawImage(
            frame,
            0,
            0,
            frame.width,
            frame.height,
            0,
            0,
            IMAGE_SIZE,
            IMAGE_SIZE
          );
          const result = await analyzeImage(canvas);
          if (isRunning) {
            setDetectionData(result);
            if (isTopDetectionDataComplete(result)) {
              const photoURI = getFullPhotoUri(frame);
              handleTakePhotoAnimationDone(photoURI);
            }
          }
        } catch (error) {
          // Uhoh, media capture is not supported by desktop safari!
          setLiveRecognitionEnabled(false);
          console.error(error);
        }
      }
    }, 200);

    return () => {
      window.clearTimeout(token);
      isRunning = false;
    };
    // we put detectionData as a dependency to trigger the next run.
  }, [
    track,
    detectionData,
    liveRecognitionEnabled,
    handleTakePhotoAnimationDone,
  ]);

  const onCameraError = useCallback(() => {
    confirmAlert(
      'Error initializing Camera',
      'Try uploading a picture instead.'
    );
  }, []);

  const onCameraStart = useCallback(
    (stream: MediaStream) => {
      if (stream.getVideoTracks()[0]) {
        setTrack(stream.getVideoTracks()[0]);
      }
      if (!isFullscreen && config.cameraFullScreenEnabled) {
        setFullscreen(true);
      }
    },
    [setFullscreen, isFullscreen]
  );

  const onCameraStop = useCallback(() => {
    setFullscreen(false);
    setTrack(undefined);
  }, [setFullscreen]);

  return (
    <div className={classes.root}>
      <Measure
        bounds
        onResize={(contentRect) => {
          if (contentRect?.bounds) {
            setDimensions({
              width: contentRect.bounds.width,
              height: contentRect.bounds.height,
            });
          }
        }}
      >
        {({ measureRef }) => {
          const stripHeight =
            dimensions.height - PHOTO_TRIGGER_HEIGHT - TRIGGER_PADDING;
          const stripWidth =
            (stripHeight * STRIP_IMAGE_WIDTH) / STRIP_IMAGE_HEIGHT;

          return (
            <div
              className={classes.wrapper}
              ref={refCamera}>
              <Camera
                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                onCameraError={onCameraError}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageType={IMAGE_TYPES.PNG}
                imageCompression={0.97}
                isMaxResolution={true}
                isImageMirror={false}
                isSilentMode={false}
                isDisplayStartCameraError={true}
                isFullscreen={isFullscreen}
                sizeFactor={1}
                onCameraStart={onCameraStart}
                onCameraStop={onCameraStop}
              />
              {config.cameraOverlayEnabled && (
                <div
                  ref={measureRef}
                  className={cx(classes.overlay, classes.overlayTestStrip)}
                >
                  <img
                    style={{
                      width: stripWidth + 'px',
                      height: stripHeight + 'px',
                    }}
                    className={classes.overlayStripImage}
                    height={426}
                    src="/assets/images/teststrip2.png"
                    alt="Overlay showing test strip"
                  />
                </div>
              )}
              <div className={cx(classes.overlay)}>
                {detectionData && (
                  <DetectionBoxOverlay detectionData={detectionData} />
                )}
              </div>
            </div>
          );
        }}
      </Measure>
    </div>
  );
};

export default TestStripCamera;
