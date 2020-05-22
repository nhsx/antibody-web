// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useEffect, useState } from 'react';
import { TopDetectionData, analyzeImageDataURI } from './RDTAnalyzer';

import DetectionBoxOverlay from './DetectionBoxOverlay';
import { getAppConfig } from 'utils/AppConfig';

interface RDTImagePreviewProps {
  dataURI: string;
}

const config = getAppConfig();

export default (props: RDTImagePreviewProps) => {
  const [detectionData, setDetectionData] = useState<TopDetectionData>();
  const { dataURI } = props;

  useEffect(() => {
    if (!config.staticPhotoMLRecognitionEnabled) {
      return;
    }
    const getImageData = async () => {
      const result = await analyzeImageDataURI(dataURI);
      setDetectionData(result);
    };
    getImageData();
  }, [dataURI]);

  return (
    <div>
      <img
        src={dataURI}
        alt="preview" />
      {detectionData && <DetectionBoxOverlay detectionData={detectionData} />}
    </div>
  );
};
