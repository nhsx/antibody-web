// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import * as tf from '@tensorflow/tfjs';

import { GraphModel, loadGraphModel } from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

import { EventEmitter } from 'event-emitter3';
import { getAppConfig } from 'utils/AppConfig';

let model: GraphModel;
let emitter: EventEmitter;
const MODEL_URL = '/assets/model/model.json';
const MODEL_LOADED_EVENT = 'model_loaded';
const MODEL_LOADERROR_EVENT = 'model_loaderror';

const config = getAppConfig();

// An event emitter that will load a model and emit an event when it is
// fully loaded. This is to avoid loading the same model multiple times,
// when the user initialize the camera before the model preloading has
// completed
const getModelLoaderEmitter = () => {
  if (!emitter) {
    emitter = new EventEmitter();
    setTimeout(async () => {
      try {
        // TODO: Add some logic to only console.log in Dev.
        console.log('load start');

        const timer = Date.now();
        const modelLoaded = await loadGraphModel(MODEL_URL);
        const timerLoaded = Date.now();
        console.log('Model loading time', timerLoaded - timer);

        await tf.nextFrame();

        const timerExecStart = Date.now();
        const zeros = tf.zeros([1, 300, 300, 3], 'int32');
        await modelLoaded.executeAsync({
          image_tensor: zeros,
        });
        console.log('Model warm up time', Date.now() - timerExecStart);

        emitter.emit(MODEL_LOADED_EVENT, modelLoaded);
      } catch (error) {
        emitter.emit(MODEL_LOADERROR_EVENT, error);
      }
    });
  }
  return emitter;
};

// Async load the model or returns the one already initialized.
export const loadModel = async (): Promise<GraphModel | null> => {
  if (
    !(
      config.cameraLiveMLRecognitionEnabled ||
      config.staticPhotoMLRecognitionEnabled
    )
  ) {
    return null;
  }
  if (!model) {
    model = await new Promise((resolve, reject) => {
      const emitter = getModelLoaderEmitter();
      emitter.once(MODEL_LOADERROR_EVENT, reject);
      emitter.once(MODEL_LOADED_EVENT, resolve);
    });
  }
  return model;
};

// A hook to preload the model when rendering a component.
export const useModelPreLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!model && !isLoading) {
      loadModel();
      setIsLoading(true);
    }
  }, [isLoading]);
};
