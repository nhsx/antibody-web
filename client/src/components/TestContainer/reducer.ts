import { Reducer } from "react";
import { GenerateTestResponse } from "abt-lib/requests/GenerateTest";

export interface TestState {
  testData: GenerateTestResponse | null;
}

export type TestAction = {
  type: "GENERATE_TEST";
  testData: GenerateTestResponse;
};

export const initialState: TestState = {
  testData: null
};

export const testReducer: Reducer<TestState, TestAction> = (state, action): TestState => {
  const handlers = {
    GENERATE_TEST: (state, action) => {
      return {
        ...state,
        testData: action.testData
      };
    }
  };
  return handlers[action.type](state, action);
};
