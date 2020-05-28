export default interface AppError {
  code: string;
  original?: Error;
  onFix?: any;
}