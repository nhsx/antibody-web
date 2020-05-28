import AppError from "./AppError";

// For now we don't have any custom behaviour for our api errors but we may want to separate behaviour later
type ApiError = AppError;

export default ApiError;