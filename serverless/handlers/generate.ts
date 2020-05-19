import { APIGatewayProxyResult } from 'aws-lambda';
import { getUploadUrl, createTestRecord } from '../api/api'
import { validateUploadRequest, validateUploadEnvironment } from '../api/validate'

interface GenerateTestResponse {
  guid: string;
  uploadUrl: string;
  testRecord: any;
}

interface GenerateBody {
  guid: string;
}

export const handler = async ({ body }: { body: any} ): Promise<APIGatewayProxyResult> => {

  const parsedBody: GenerateBody = JSON.parse(body)

  if (!parsedBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      })
    }
  }

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;
  
  // Validation
  const { error: envError } = validateUploadEnvironment(process.env)

  if (envError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Environment configuration error"
      })
    }
  }

  //Pull out our variables from the event body, once validated
  const { value: request, error: uploadError } = validateUploadRequest(parsedBody)
  
  if (uploadError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: uploadError.details[0].message
      })
    }
  }

  //Handler body


  const { guid } = request
  const uploadUrl = await getUploadUrl(UPLOAD_BUCKET, guid)  
  const testRecord = await createTestRecord(DYNAMO_TABLE, guid)
  
  // Response
  const response: GenerateTestResponse = {
    guid: body.guid,
    uploadUrl: uploadUrl,
    testRecord
  }
    
  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  }
}  
