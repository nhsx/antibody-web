// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

export interface AppConfig {
  // should camera go to FS
  cameraFullScreenEnabled: boolean;
  // should we show the overlay on the camera
  cameraOverlayEnabled: boolean;
  // should we try to do image recognition on camera
  cameraLiveMLRecognitionEnabled: boolean;

  // should we run image recognition on the photo taken or uploaded.
  staticPhotoMLRecognitionEnabled: boolean;

  // path for the default landing page
  landingPage: string;
}
