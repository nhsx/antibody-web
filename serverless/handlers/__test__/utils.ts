import createEvent from '@serverless/event-mocks';

export const mockPrincipalId = "123";


export function getAuthorisedEvent(customBody: any) {

  const event = createEvent(
    "aws:apiGateway",
    {
      body: JSON.stringify(customBody), 
      requestContext: {
        authorizer: {
          principalId: mockPrincipalId
        }
      }
    } as any); 
    
  return event;
}