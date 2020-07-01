/*
Our request that we send / receive from workstream 2 for verifying a user's details, so we can then issue them a JWT
*/


// @TODO: AWAITING API SPECIFICATION - not production ready.
export interface VerifyUserRequest {
  orderId: string;
  dateOfBirth: string;
  postcode: string;
}
  
export interface VerifyUserResponse {
  success: boolean;
}
  