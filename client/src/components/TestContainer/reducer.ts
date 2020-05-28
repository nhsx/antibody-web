import { Reducer } from "react";
import TestRecord from "abt-lib/models/TestRecord";

export interface TestState {
  testRecord: TestRecord | null;
}

export type TestAction = {
  type: "SAVE_TEST";
  testRecord: TestRecord;
};

export const initialState: TestState = {
  testRecord: null
};

export const testReducer: Reducer<TestState, TestAction> = (state, action): TestState => {
  const handlers = {
    SAVE_TEST: (state, action) => {
      return {
        ...state,
        testRecord: action.testRecord
      };
    }
  };
  return handlers[action.type](state, action);
};
