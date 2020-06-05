//import createEvent from '@serverless/event-mocks';

export const mockPrincipalId = "123";

/* Simulate an event that has been ok'd by our authorizer */

export function getAuthorisedEvent(customBody: any) {
 
  const event = {
    body: JSON.stringify(customBody), 
    requestContext: {
      authorizer: {
        principalId: mockPrincipalId
      }
    }
  } as any; 
    
  return event;
}