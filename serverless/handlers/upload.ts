'use strict';
import { DynamoDB, S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

// Local consts
const IMAGE_FIELD = 'rdt_image';

module.exports.handler = async (event: any) => {
  // Initialise our services
  const s3 = new S3();
  const dynamo = new DynamoDB();

  // Pull out our environment variables
  ['UPLOAD_BUCKET', 'DYNAMO_TABLE'].forEach((p) => {
    if (!process.env[p]) {
      return {
        statusCode: 500,
        body: { error: `Internal error: missing environment variables` },
      };
    }
  });

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;

  // Create our unique identifier for now (this will be supplied eventually)
  const guid: string = uuid();

  // Decode our base64 image.
  let encodedImage: string, decodedImage: Buffer;

  try {
    encodedImage = JSON.parse(event.body)[IMAGE_FIELD];
    decodedImage = Buffer.from(encodedImage, 'base64');
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        error: `Failed to decode a base64 image from body.${IMAGE_FIELD}`,
      },
    };
  }

  const filePath = `rdt-images/${guid}` + '.png';

  // Prepare the S3 Insert
  const s3PutReq: AWS.S3.PutObjectRequest = {
    Body: decodedImage,
    Bucket: UPLOAD_BUCKET,
    Key: filePath,
  };

  try {
    // Send to S3
    const s3Response = await s3.upload(s3PutReq).promise();
    const { Location: image_url } = s3Response;
    console.log(`Image uploaded to ${image_url}`);

    // Once we have the item's s3 location, prepare our put into dynamo
    let dynamoPutReq: AWS.DynamoDB.PutItemInput,
      dynamoResponse: AWS.DynamoDB.PutItemOutput;

    try {
      dynamoPutReq = {
        TableName: DYNAMO_TABLE,
        Item: {
          guid: { S: guid },
          image_url: { S: image_url },
        },
      };

      console.log('putting into dynamo', dynamoPutReq);
      dynamoResponse = await dynamo.putItem(dynamoPutReq).promise();
      console.log('Dynamo record inserted:', dynamoResponse);
    } catch (error) {
      //Dynamo insert has failed, undo our S3 insert as this will be detached data
      console.log(`Dynamo put failed, deleting ${filePath} from S3`);
      const s3DelReq: AWS.S3.DeleteObjectRequest = {
        Bucket: UPLOAD_BUCKET,
        Key: filePath,
      };
      await s3.deleteObject(s3DelReq).promise();
      return error;
    }

    // Return our s3 response and dynamo inserted item to the user
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        s3: s3Response,
        dynamo: dynamoPutReq,
      }),
    };
  } catch (error) {
    {
      console.log('Error:', error);
      return error;
    }
  }
};
