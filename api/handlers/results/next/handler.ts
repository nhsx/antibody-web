import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import config from '../../../config';
import withSentry from 'serverless-sentry-lib';
import { getNextResult, NextResultResponse } from '../../../api/review';
import { getUrls } from '../../../api/storage';
import roleChecker from '../roleChecker/roleChecker';

export const baseHandler = async (event: APIGatewayEvent) : Promise<APIGatewayProxyResult> => {

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const response = await getNextResult();
  // Return empty success if no images in queue
  if (!response) {
    return {
      statusCode: 204,
      body: "",
      headers: config.defaultHeaders
    };
  }
  let { nextResultId, receiptHandle } = response as NextResultResponse;

  const { downloadUrl } = await getUrls(UPLOAD_BUCKET, nextResultId, { download: true, upload: false });

  return {
    statusCode: 200,
    body: JSON.stringify({
      url: downloadUrl,
      guid: nextResultId,
      receiptHandle
    }),
    headers: config.defaultHeaders
  };
};

export const handler = roleChecker(
  withSentry(baseHandler),
  ['reviewer']
);