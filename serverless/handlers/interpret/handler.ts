import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getFileStream, getTestRecord, putTestRecord } from '../../api/storage';
import { validateInterpretEnvironment } from '../../api/validate';
import config from '../../config';
import got from 'got';
import { Readable } from 'stream';
import TestRecord, { Prediction } from 'abt-lib/dist/models/TestRecord';

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
        error: "Missing RDT image"
      }),
      headers: config.defaultHeaders
    };
  }

  try {
    const { body: prediction } = await got.post(predictionEndpoint, {
      body: fileStream,
      responseType: 'json'
    });

    // Get our users record to update with the prediction
    const oldRecord = await getTestRecord(DYNAMO_TABLE, guid) as TestRecord;

    const newRecord: TestRecord = {
      ...oldRecord,
      prediction: prediction as Prediction
    };

    await putTestRecord(DYNAMO_TABLE, newRecord);

    return {
      statusCode: 200,
      body: JSON.stringify({
        testRecord: {
          prediction
        }
      }),
      headers: config.defaultHeaders
    };  
  } catch (error) {
    return {
      statusCode: error.response?.statusCode,
      body: JSON.stringify({
        error: "Prediction failed"
      }),
      headers: config.defaultHeaders
    };
  }
};  
