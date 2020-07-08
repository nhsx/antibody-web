// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import { BodyText, Button, Label, Images, InsetText } from "nhsuk-react-components";
import React from "react";

export interface PhotoCaptureProps {
  handleShowCamera: () => void;
}

export default (props: PhotoCaptureProps) => {
  return (
    <>
      <Label size="l"><span data-testid="page-title">Take a photo of your test device</span></Label>
      <Images
        srcSet="/assets/images/RDT_capture.gif 310w"
        alt="Illustration of a photo being taken of a test kit"
        caption="Illustration of a photo being taken of a test kit"
      />
      <InsetText>You have TODO minutes left to take your photograph</InsetText>
      <BodyText>Use your phone’s camera to take a photo of your test device</BodyText>
      <BodyText>Hold your phone flat and directly above the test device</BodyText>
      <BodyText>Line up the test device with the example image</BodyText>
      <BodyText>Make sure the photo:</BodyText>
      <ul className="nhsuk-list nhsuk-list--bullet">
        <li>is in focus (clear)</li>
        <li>only contains the test device</li>
        <li>does not have any shadows falling across the test device</li>
        <li>does not have any bright light falling across the test device</li>
      </ul>
      <Button onClick={props.handleShowCamera}>
        Take a photo of your test kit
      </Button>
    </>
  );
};
