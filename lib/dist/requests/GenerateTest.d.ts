import TestRecord from "models/TestRecord";
export interface GenerateTestRequest {
    guid?: string;
}
export interface GenerateTestResponse {
    testRecord: TestRecord;
}
