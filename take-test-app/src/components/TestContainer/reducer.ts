import { Reducer } from "react";
import TestRecord from "abt-lib/models/TestRecord";

export interface TestState {
  testRecord: TestRecord | null;
}

export type TestAction = {
  type: "SAVE_TEST";
  testRecord: TestRecord | null;
};

export const initialState: TestState = {
  testRecord: null
};

export const testReducer: Reducer<TestState, TestAction> = (state, action): TestState => {
  switch (action.type) {
    case "SAVE_TEST":
      return {
        ...state,
        testRecord: action.testRecord
      };
  }
};
