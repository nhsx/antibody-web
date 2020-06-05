import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getFileStream, getTestRecord, putTestRecord } from '../../api/storage';
import { validateInterpretEnvironment } from '../../api/validate';
import config from '../../config';
import got from 'got';
import { Readable } from 'stream';
import TestRecord from 'abt-lib/dist/models/TestRecord';
import { PredictionData } from 'abt-lib/dist/models/Prediction';
import getResult from 'abt-lib/dist/usecases/processResult';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const ML_API_BASE: string = process.env.ML_API_BASE as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;

  const guid = event.requestContext.authorizer?.principalId;
  const predictionEndpoint = `${ML_API_BASE}/${config.modelPath}`;

  if (!guid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing user id"
      }),
      headers: config.defaultHeaders
    };
  }

  const { error: envError } = validateInterpretEnvironment(process.env);

  if (envError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Environment configuration error"
      }),
      headers: config.defaultHeaders
    };
  }  

  
  let fileStream: Readable;

  try {
    fileStream = getFileStream(UPLOAD_BUCKET, guid);
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Could not retrieve user image"
      }),
      headers: config.defaultHeaders
    };
  }

  try {
    const { body: prediction } : { body: PredictionData } = await got.post(predictionEndpoint, {
      body: fileStream,
      responseType: 'json'
    });

    // Get our users record to update with the prediction
    const oldRecord = await getTestRecord(DYNAMO_TABLE, guid) as TestRecord;

    const newRecord: TestRecord = {
      ...oldRecord,
      predictionData: prediction,
      result: getResult(prediction)
    };

    await putTestRecord(DYNAMO_TABLE, newRecord);

    return {
      statusCode: 200,
      body: JSON.stringify({
        testRecord: newRecord
      }),
      headers: config.defaultHeaders
    };  
  } catch (error) {
    return {
      statusCode: error.response?.statusCode,
      body: JSON.stringify({
        error: "Prediction failed",
        original: process.env.STAGE === 'dev' ? error : undefined
      }),
      headers: config.defaultHeaders
    };
  }
};  
