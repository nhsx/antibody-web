import { handler } from '../authorizer';
import { resolve } from 'path';
import createEvent from '@serverless/event-mocks';

require('dotenv').config({ path: resolve(__dirname,"../../test.env") });

describe('authorizer', () => {


  it('should throw an error if no token is supplied', async () => {
    const event = createEvent("aws:apiGateway", { authorizationToken: undefined } as any);
    await expect(handler(event)).rejects.toThrowError("Unauthorized");
  });
});
