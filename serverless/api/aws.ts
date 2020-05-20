import AWSSDK from 'aws-sdk';
export const AWS = AWSSDK;
import { PutItemInput, GetItemInput, AttributeValue } from "aws-sdk/clients/dynamodb";
import TestRecord from "models/TestRecord";

export async function getUploadUrl(bucket: string, guid: string): Promise<string> {
  const s3 = new AWS.S3();
  const params = {Bucket: bucket, Key: `rdt-images/${guid}`};
  return s3.getSignedUrlPromise("putObject", params);
};

export async function createTestRecord(table: string, record: TestRecord) {
  const dynamo = new AWS.DynamoDB();

  const dynamoPutReq: PutItemInput = {
    TableName: table,
    Item: {
      guid: { 
        S: record.guid 
      },
      uploadUrl: {
        S: record.uploadUrl
      }
    },
  };

  return dynamo.putItem(dynamoPutReq).promise();
}

export async function getTestRecord(table: string, guid: string) {
  const dynamo = new AWS.DynamoDB();

  const dynamoGetReq: GetItemInput = {
    TableName: table,
    Key: {
      guid: {
        S: guid
      }
    }
  };

  return await dynamo.getItem(dynamoGetReq).promise();
}
