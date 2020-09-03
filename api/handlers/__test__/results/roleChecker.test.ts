import roleChecker from '../../results/roleChecker/roleChecker';
import { Role } from '../../../models/Role';

describe('roleCecker', () => {


  const getEventWithGroups = (groups: Role | Role[] | null) => ({
    requestContext: {
      authorizer: {
        claims: {
          "cognito:groups": groups
        }
      }
    }
  });

  const context: any = {};

  it('should return a 401 if the user does not share a role with the supplied roles', async () => {
    const handler = jest.fn();
    const event = getEventWithGroups(['reviewer']);
    const protectedHandler = roleChecker(handler, ['super-reviewer']);
    const result = await protectedHandler(event, context); 
    expect(result.statusCode).toEqual(401);
  });


  it('should not call the supplied function if the user does not share a role with the supplied roles', async () => {
    const handler = jest.fn();
    const event = getEventWithGroups('reviewer');
    const protectedHandler = roleChecker(handler, ['super-reviewer']);
    await protectedHandler(event, context); 
    expect(handler).not.toHaveBeenCalled();
  });

  it('should invoke the supplied function if the user matches one role', async () => {
    const handler = jest.fn(() => 'test');
    const event = getEventWithGroups('reviewer');
    const protectedHandler = roleChecker(handler, ['reviewer', 'super-reviewer']);
    const response = await protectedHandler(event, context); 
    expect(handler).toHaveBeenCalledWith(event, context);
    expect(response).toEqual('test');
  });

  it('should invoke the supplied function if the user matches multiple roles', async () => {
    const handler = jest.fn(() => 'test');
    const event = getEventWithGroups(['reviewer', 'super-reviewer']);
    const protectedHandler = roleChecker(handler, ['reviewer', 'super-reviewer']);
    const response = await protectedHandler(event, context); 
    expect(handler).toHaveBeenCalledWith(event, context);
    expect(response).toEqual('test');
  });

  it('should return a useful error message if the user has not been added to any groups', async () => {
    const handler = jest.fn();
    const event = getEventWithGroups(null);
    const protectedHandler = roleChecker(handler, ['reviewer']);
    const response = await protectedHandler(event, context); 
    expect(JSON.parse(response.body).message).toMatch("not been assigned");
    expect(response.statusCode).toEqual(401);
    expect(handler).not.toHaveBeenCalled();
  });
});