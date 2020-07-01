export interface AuthenticateRequest {
    orderId: string;
    dateOfBirth: string;
    postcode: string;
}
export interface AuthenticateResponse {
    success: boolean;
    message: string;
    token?: string;
}
