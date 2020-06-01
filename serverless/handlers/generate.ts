import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getUrls, getTestRecord, putTestRecord } from '../api/aws';
import { validateGenerateEnvironment } from '../api/validate';
import config from './config';
import TestRecord from 'abt-lib/models/TestRecord';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const guid = event.requestContext.authorizer?.principalId;
  console.log(guid);

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

  // If not, generate their signed urls and their test record
  if (!record) {
    const { uploadUrl, downloadUrl } = await getUrls(UPLOAD_BUCKET, guid);

    record = {
      guid,
      uploadUrl,
      downloadUrl,
      step: "checkYourKit"
    } as TestRecord;

    await putTestRecord(DYNAMO_TABLE, record);
  }
  
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
