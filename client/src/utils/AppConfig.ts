// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import { AppConfig } from './ConfigTypes';
import appConfigOverrides from '../config/AppConfigOverrides';

// DO NOT MODIFY THIS FOR YOUR VERSION OF THE APP
// USE AppConfigOverrides.ts INSTEAD.
const MasterConfig: AppConfig = {
  cameraFullScreenEnabled: true,
  cameraLiveMLRecognitionEnabled: false,
  cameraOverlayEnabled: true,
  staticPhotoMLRecognitionEnabled: false,
  landingPage: 'NEWTESTRUN',
};

export const getAppConfig = (): AppConfig => {
  return { ...MasterConfig, ...appConfigOverrides };
};
