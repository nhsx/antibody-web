// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import * as tf from '@tensorflow/tfjs';

import loadImage from 'image-promise';
import { loadModel } from './RDTModelLoader';

export const IMAGE_SIZE = 600;
const BOX_COUNT = 20;
const CONFIDENCE_THRESHOLD = 0.5;

// Outputs for the model
enum OutputTypes {
  raw_detection_boxes = 'raw_detection_boxes',
  detection_multiclass_scores = 'detection_multiclass_scores',
  num_detections = 'num_detections',
  raw_detection_scores = 'raw_detection_scores',
  detection_boxes = 'detection_boxes',
  detection_scores = 'detection_scores',
  detection_classes = 'detection_classes',
}

// Type of boxes detected
type BoxTypes = 'unknown' | 'arrows' | 'test' | 'ABC' | 'squares' | 'influenza';

// The index of each value corresponds to what the model will return
const ArrayBoxTypes = [
  'unknown',
  'arrows',
  'test',
  'ABC',
  'squares',
  'influenza',
];

export interface DetectionData {
  detectionScore: number;
  detectionClass: BoxTypes;
  detectionBox: tf.backend_util.TypedArray;
}

// top ranked boxes for each box type
export interface TopDetectionData {
  arrows?: DetectionData;
  test?: DetectionData;
  ABC?: DetectionData;
  squares?: DetectionData;
  influenza?: DetectionData;
}

export const isTopDetectionDataComplete = (
  detectionData: TopDetectionData
): boolean => {
  return (
    !!detectionData.arrows &&
    !!detectionData.test &&
    !!detectionData.ABC &&
    !!detectionData.squares &&
    !!detectionData.influenza
  );
};

const getDataType = (
  dataType: string,
  modelDataOutput: tf.backend_util.TypedArray[],
  model: tf.GraphModel
): tf.backend_util.TypedArray => {
  return modelDataOutput[
    model.outputs.findIndex((item): boolean => {
      return item.name === dataType;
    })
  ];
};

// Returns the top ranked boxes for each box type
const getFormattedData = (
  modelDataOutput: tf.backend_util.TypedArray[],
  model: tf.GraphModel
): TopDetectionData => {
  const detectionScores = getDataType(
    OutputTypes.detection_scores,
    modelDataOutput,
    model
  );

  const detectionClasses = getDataType(
    OutputTypes.detection_classes,
    modelDataOutput,
    model
  );

  const detectionBoxes = getDataType(
    OutputTypes.detection_boxes,
    modelDataOutput,
    model
  );

  const results: TopDetectionData = {};

  // detectionsScores are ranked
  detectionScores.find((value: number, index: number) => {
    const detectionScore = detectionScores[index];
    if (detectionScore < CONFIDENCE_THRESHOLD) {
      // End the search.
      return true;
    }
    const detectionClass = detectionClasses[index];
    const typeName = ArrayBoxTypes[detectionClass];

    if (!results[typeName]) {
      results[typeName] = {
        detectionClass: detectionClass,
        detectionScore: detectionScore,
        detectionBox: detectionBoxes.slice(index * 4, index * 4 + 4),
      };
    }
    return (
      // Only parse BOX_COUNT elements
      index + 1 > BOX_COUNT ||
      // Stop when we find all the boxes.
      isTopDetectionDataComplete(results)
    );
  });

  return results;
};

// Perform the detection on an image.
export const analyzeImage = async (
  pixels:
    | HTMLImageElement
    | tf.backend_util.PixelData
    | ImageData
    | HTMLCanvasElement
    | HTMLVideoElement,
  numChannels?: number | undefined
): Promise<TopDetectionData> => {
  const model = await loadModel();
  if (!model) {
    // This shouldn't happen, but is here in case someone tries to use
    // the function without enabling the relevant features in
    // AppConfigOverrides.ts
    console.error("App configuration doesn't allow image recognition.");
    return {};
  }
  const beginningTime = Date.now();

  const image = tf.browser.fromPixels(pixels);
  const smalImg = tf.image.resizeBilinear(image, [IMAGE_SIZE, IMAGE_SIZE]);
  const resized = tf.cast(smalImg, 'int32');
  const t4d = tf.tensor4d(Array.from(resized.dataSync()), [
    1,
    IMAGE_SIZE,
    IMAGE_SIZE,
    3,
  ]);
  const initializationTime = Date.now();

  let executionResult = await model.executeAsync({
    image_tensor: t4d.asType('int32'),
  });

  const executionTime = Date.now();

  if (!Array.isArray(executionResult)) {
    executionResult = [executionResult];
  }

  const finalRes = await Promise.all(executionResult.map((r) => r.data()));
  const dataExtractionTime = Date.now();
  console.log('initialization time', initializationTime - beginningTime);
  console.log('execution time', executionTime - initializationTime);
  console.log('data time', dataExtractionTime - executionTime);

  return getFormattedData(finalRes, model);
};

export const analyzeImageDataURI = async (dataURI: string) => {
  const image = await loadImage(dataURI);
  return await analyzeImage(image);
};
