import { S3, DynamoDB } from "aws-sdk"
import { PutItemInput, GetItemInput, AttributeValue } from "aws-sdk/clients/dynamodb";

export async function getUploadUrl(bucket: string, guid: string) {
  const s3 = new S3()
  const params = {Bucket: bucket, Key: `rdt-images/${guid}`};
  return s3.getSignedUrl('putObject', params)
};

export async function createTestRecord(table: string, guid: string) {
  const dynamo = new DynamoDB()
  const dynamoPutReq: PutItemInput = {
    TableName: table,
    Item: {
      guid: { 
        S: guid 
      }
    },
  };

  return await dynamo.putItem(dynamoPutReq).promise()
}

export async function getTestRecord(table: string, guid: string) {
  const dynamo = new DynamoDB()

  const dynamoGetReq: GetItemInput = {
    TableName: table,
    Key: {
      guid: {
        S: guid
      }
    }
  };

  return await dynamo.getItem(dynamoGetReq).promise()
}
