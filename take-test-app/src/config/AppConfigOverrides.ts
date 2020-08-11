// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import { AppConfig } from "../utils/ConfigTypes";

/**
 * Use this file to enable/disable features.
 */

const overrides = (): Partial<AppConfig> => ({
  landingPage: "NEWTESTRUN",
  imageUpload: Boolean(
    !(process.env.REACT_APP_FLAG_IMAGE_UPLOAD === "false") ?? true
  ),
  cameraOverlayEnabled: false
});

export default overrides;
