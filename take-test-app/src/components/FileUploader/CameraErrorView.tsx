// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import { inputCaptureSupported } from "style/utils";

import Asset from "components/ui/Asset";
import { Label, BodyText } from "nhsuk-react-components";
import ImageSelectorInput from "./ImageSelectorInput";
import React from "react";

export interface CameraErrorProps {
  handleImageAsFile: (image: File) => void;
}

export default (props: CameraErrorProps) => {
  return (
    <>
      <Asset
        height={200}
        width={310}
        alt="A phone taking the test strip photo."
        src="RDT_capture.gif"
      />
      <Label size="l">Try again</Label>
      <BodyText>
        Your camera didn't launch as expected. Please try again.
      </BodyText>
      <ImageSelectorInput
        onImageSelected={props.handleImageAsFile}
        disabled={false}
        label={inputCaptureSupported() ? "Start camera" : "Upload Photo"}
      />
    </>
  );
};
