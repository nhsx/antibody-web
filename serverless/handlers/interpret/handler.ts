import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getTestRecord, putTestRecord } from '../../api/storage';
import { validateInterpretEnvironment } from '../../api/validate';
import config from '../../config';
import TestRecord from 'abt-lib/dist/models/TestRecord';
import withSentry from 'serverless-sentry-lib';
import logger from '../../utils/logger';

export const baseHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  // const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const ML_API_BASE: string = process.env.ML_API_BASE as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;

  const guid = event.requestContext.authorizer?.principalId;
  const predictionEndpoint = `${ML_API_BASE}/${config.modelPath}`;

  logger.info("Interpreting result for user with guid:", guid);

  if (!guid) {
    logger.error("No guid available in request context");
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
    logger.error("Environment not configured correctly", envError);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Environment configuration error"
      }),
      headers: config.defaultHeaders
    };
  }  

  
  // let fileStream: Readable;

  logger.info("Retrieving user's image from S3");
  try {
    // fileStream = getFileStream(UPLOAD_BUCKET, guid);
  } catch (error) {
    logger.error("Could not get image from S3", error);
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Could not retrieve user image"
      }),
      headers: config.defaultHeaders
    };
  }

  try {
    logger.info("Sending image to prediction endpoint" + predictionEndpoint);
    // const { body: prediction } : { body: PredictionData } = await got.post(predictionEndpoint, {
    //   body: fileStream,
    //   responseType: 'json'
    // });

    const prediction = {
      success: true,
      result: 'positive',
      confidence: { positive: 0.983, negative: 0.017 },
      quality: {
        blur: 'ok',
        exposure: 'ok'
      },
      extracts: {
        rdt: "data:image/gif;base64,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",
        diagnostic: [[121.58730799, 227.88811523], [896.83360694, 484.49481445]]
      }
    };
    if (guid.includes('blur')) {
      prediction.quality.blur = 'blurred';
      prediction.result = 'failed_checks';          
      prediction.success = false;
    }
    if (guid.includes('over')) {
      prediction.quality.exposure = 'overexposed';
      prediction.result = 'failed_checks'; 
      prediction.success = false;         
    }
    if (guid.includes('under')) {
      prediction.quality.exposure = 'underexposed';
      prediction.result = 'failed_checks'; 
      prediction.success = false;          
    }
    if (guid.includes('overunder')) {
      prediction.quality.exposure = 'over_and_underexposed';
      prediction.result = 'failed_checks';    
      prediction.success = false;      
    }

    logger.info("Received prediction - updating user's info.");

    // Get our users record to update with the prediction
    const oldRecord = await getTestRecord(DYNAMO_TABLE, guid) as TestRecord;

    const newRecord: TestRecord = {
      ...oldRecord,
      predictionData: prediction,
      testCompleted: prediction.success,
      result: prediction.result
    };

    logger.debug(newRecord);
    await putTestRecord(DYNAMO_TABLE, newRecord);
    logger.info("User record updated, interpreting complete");

    return {
      statusCode: 200,
      body: JSON.stringify({
        testRecord: newRecord
      }),
      headers: config.defaultHeaders
    };  
  } catch (error) {
    logger.error("Prediction failed", error);
    throw error;
  }
};

export const handler = withSentry(baseHandler);
