export interface GenerateTestRequest {
  guid: string;
}

export interface GenerateTestResponse extends Response {
  guid: string;
  uploadUrl: string;
  testRecord: any;
}
