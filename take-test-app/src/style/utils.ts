// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

let isInputCaptureSupported: boolean | undefined = undefined;

export const inputCaptureSupported = () => {
  if (isInputCaptureSupported !== undefined) {
    return isInputCaptureSupported;
  }
  const testElement = document.createElement("input");
  testElement.setAttribute("capture", "true");
  isInputCaptureSupported = !!testElement["capture"];
  testElement.remove();
  return isInputCaptureSupported;
};

export interface StylesDictionary{
  [Key: string]: React.CSSProperties;
}