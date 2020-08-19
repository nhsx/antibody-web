import { DocumentClient } from "aws-sdk/clients/dynamodb";
import TestRecord from "abt-lib/models/TestRecord";
import AWSSDK from 'aws-sdk';
import { Readable } from "stream";
export const AWS = AWSSDK;


export interface FileResponse {
  body: any;
  length: string;
  type: string;
}

interface UrlResponse {
  uploadUrl?: string;
  downloadUrl?: string;
}


// Function for retrieving presigned urls for S3 for either uploading or downloading a user's test image
export async function getUrls(bucket: string, guid: string, requestedUrls: {download: boolean, upload: boolean} = { download: true, upload: true }): Promise<UrlResponse> {

  const s3 = new AWS.S3();
  const params = { Bucket: bucket, Key: `rdt-images/${guid}` };

  const getUrl = async (method: string): Promise<string> => await new Promise((resolve, reject) => {
    
    s3.getSignedUrl(method, params, (err, url: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });

  const promises = [];

  if (requestedUrls.upload) {
    promises.push(getUrl("putObject"));
  } else  {
    promises.push(null);
  }
  if (requestedUrls.download) {
    promises.push(getUrl("getObject"));
  } else {
    promises.push(null);
  }

  const [uploadUrl, downloadUrl] = await Promise.all(promises);

  const urlResponse: UrlResponse = {};
  if (uploadUrl) {
    urlResponse.uploadUrl = uploadUrl;
  }
  if (downloadUrl) {
    urlResponse.downloadUrl = downloadUrl;
  }

  return urlResponse;
}

export function getFileStream(bucket: string, guid: string): Readable {
  const s3 = new AWS.S3();
  const request = s3.getObject({ Bucket: bucket, Key: `rdt-images/${guid}` });

  return request.createReadStream();
}

export async function putTestRecord(table: string, record: TestRecord) {

  const dynamo = new DocumentClient();

  const dynamoPutReq: DocumentClient.PutItemInput = {
    TableName: table,
    Item: record
  };

  return dynamo.put(dynamoPutReq).promise();
}

export async function getTestRecord(table: string, guid: string): Promise<TestRecord | null> {
  const dynamo = new DocumentClient();

  const dynamoGetReq: DocumentClient.GetItemInput = {
    TableName: table,
    Key: {
      guid
    }
  };

  const dynamoRecord = await dynamo.get(dynamoGetReq).promise();

  return dynamoRecord?.Item ? dynamoRecord.Item as TestRecord : null;
}
