'use strict';
import { DynamoDB, S3 } from 'aws-sdk';
//import { v4 as uuid } from 'uuid';

// Local consts
//const IMAGE_FIELD = 'rdt_image';

module.exports.handler = async (event: any) => {
  // Initialise our services
  const s3 = new S3();
  const dynamo = new DynamoDB();
};
