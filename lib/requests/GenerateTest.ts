export interface GenerateTestRequest {
  guid: string;
}

export interface GenerateTestResponse {
  guid: string;
  uploadUrl: string;
  testRecord: any;
}
