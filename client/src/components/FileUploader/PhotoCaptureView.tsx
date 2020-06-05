// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import Asset from "components/ui/Asset";
import { BodyText, Button, Label } from "nhsuk-react-components";
import React from "react";

export interface PhotoCaptureProps {
  handleShowCamera: () => void;
}

export default (props: PhotoCaptureProps) => {
  return (
    <>
      <Asset
        height={200}
        width={310}
        alt="A phone taking the test strip photo."
        src="RDT_capture.gif"
      />
      <Label size="l">Take photo of test cassette</Label>
      <BodyText>
        Next, you'll be asked to take a photo of your test cassette.
      </BodyText>
      <ul className="nhsuk-list nhsuk-list--bullet">
        <li>Ensure your location has good lighting</li>
        <li>Hold your device flat and directly above the test cassette.</li>
        <li>Line up the test cassette with the sample image.</li>
      </ul>
      <Button onClick={props.handleShowCamera}>
        Start camera
      </Button>
    </>
  );
};
