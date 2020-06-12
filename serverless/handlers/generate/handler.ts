import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getUrls, getTestRecord, putTestRecord } from '../../api/storage';
import { validateGenerateEnvironment } from '../../api/validate';
import config from '../../config';
import TestRecord from 'abt-lib/models/TestRecord';
import withSentry from 'serverless-sentry-lib';

export const baseHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const guid = event.requestContext.authorizer?.principalId;


  if (!guid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing user id"
      }),
      headers: config.defaultHeaders
    };
  }

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;
  
  // Validation
  const { error: envError } = validateGenerateEnvironment(process.env);

  if (envError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Environment configuration error"
      }),
      headers: config.defaultHeaders
    };
  }

  let record: TestRecord | null;

  // Check if this user already has a test in progress
  record = await getTestRecord(DYNAMO_TABLE, guid);

  // Generate new s3 urls on login
  const { uploadUrl, downloadUrl } = await getUrls(UPLOAD_BUCKET, guid);

  // Save the new urls if this is an existing user
  if (record) {
    record = {
      ...record as TestRecord,
      uploadUrl,
      downloadUrl
    };
  // Or create the record entirely
  } else {
    record = {
      guid,
      uploadUrl,
      downloadUrl,
      step: "checkYourKit"
    } as TestRecord;
  }
  
  await putTestRecord(DYNAMO_TABLE, record);
  
  //Response
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        testRecord: record
      }),
    headers: config.defaultHeaders
  };
};

export const handler = withSentry(baseHandler);