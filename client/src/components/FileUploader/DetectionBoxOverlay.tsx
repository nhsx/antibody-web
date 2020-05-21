// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';
import { DetectionData, TopDetectionData } from './RDTAnalyzer';
import { createStyles, makeStyles } from '@material-ui/core';
import { toCSSPercent } from 'style/utils';

interface DetectionBoxOverlayProps {
  detectionData: TopDetectionData;
}

const useBoxStyle = makeStyles(() =>
  createStyles({
    box: {
      fontWeight: 'bold',
      fontSize: '11px',
      whiteSpace: 'nowrap',
      position: 'absolute',
      border: '1px solid red',
      textShadow:
        '-1px 1px 1px #fff, 1px 1px 1px #fff, 1px -1px 0 #fff, -1px -1px 0 #fff',
    },
  })
);

// Renders overlaying boxes over an image, according to detection results
export default (props: DetectionBoxOverlayProps): JSX.Element => {
  const { detectionData } = props;
  const classes = useBoxStyle();

  const boxes: Array<React.ReactNode> = [];
  if (detectionData) {
    for (const dataType in detectionData) {
      const data = detectionData[dataType] as DetectionData;
      const box = data.detectionBox;
      const top = toCSSPercent(box[0]);
      const left = toCSSPercent(box[1]);
      const bottom = toCSSPercent(1 - box[2]);
      const right = toCSSPercent(1 - box[3]);
      let score = (Math.round(data.detectionScore * 10) / 10).toString();
      if (score.charAt(0) === '0') {
        score = score.substr(1);
      }
      boxes.push(
        <div
          style={{
            top: top,
            left: left,
            right: right,
            bottom: bottom,
          }}
          className={classes.box}
          key={dataType}
        >
          {dataType}: {score}
        </div>
      );
    }
  }
  return <>{boxes}</>;
};
