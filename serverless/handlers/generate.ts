'use strict';
import { DynamoDB, S3 } from 'aws-sdk';
import Joi from '@hapi/joi';

//import { v4 as uuid } from 'uuid';

// Local consts
//const IMAGE_FIELD = 'rdt_image';
const x = 'test';

module.exports.handler = async (event: any) => {
  // Initialise our services
  const s3 = new S3();
  const dynamo = new DynamoDB();

  const schema = Joi.object({
    guid: Joi.string().max(64).required,
  });

  const { value, error } = schema.attempt(event.body);
};
