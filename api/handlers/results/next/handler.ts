import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import config from '../../../config';
import withSentry from 'serverless-sentry-lib';
import { getNextResultId } from '../../../api/review';
import { getUrls } from '../../../api/storage';


export const baseHandler = async (event: APIGatewayEvent) : Promise<APIGatewayProxyResult> => {


  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;

  const nextResultId = await getNextResultId();


  // Return empty success if no 
  if (!nextResultId) {
    return {
      statusCode: 204,
      body: ""
    };
  }
  
  const { downloadUrl } = await getUrls(UPLOAD_BUCKET, nextResultId, { download: true, upload: false });

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      url: downloadUrl
    }),
    headers: config.defaultHeaders
  };
};



export const handler = withSentry(baseHandler);