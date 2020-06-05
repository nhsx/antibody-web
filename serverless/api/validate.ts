import Joi, { ObjectSchema } from '@hapi/joi';

export const validateGenerateRequest = (body: any) => {
  const schema: ObjectSchema = Joi.object({
  });

  // We have removed the guid from here as we more closely approximate real jwt flow now
  return schema.validate(body);
};


export const validateUpdateRequest = (body: any) => {
  const schema: ObjectSchema = Joi.object({
    testRecord: Joi.object().required()
  });

  return schema.validate(body);
};


export const validateGenerateEnvironment = (environment: any) => {
    
  const schema: ObjectSchema = Joi.object({
    UPLOAD_BUCKET: Joi.string().required(),
    DYNAMO_TABLE: Joi.string().required()
  });

  return schema.validate(environment, { allowUnknown: true });
};

export const validateInterpretEnvironment = (environment: any) => {
    
  const schema: ObjectSchema = Joi.object({
    UPLOAD_BUCKET: Joi.string().required(),
    DYNAMO_TABLE: Joi.string().required()
  });

  return schema.validate(environment, { allowUnknown: true });
};

export const validateUpdateEnvironment = (environment: any) => {
    
  const schema: ObjectSchema = Joi.object({
    DYNAMO_TABLE: Joi.string().required()
  });

  return schema.validate(environment, { allowUnknown: true });
};


