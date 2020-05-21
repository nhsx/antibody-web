import { Reducer } from "react";
import { GenerateTestResponse } from "abt-lib/requests/GenerateTest";

export interface AppState {
  locale: string;
  testData: GenerateTestResponse | null;
}

export type AppAction = {
  type: "SET_LOCALE";
  locale: string;
};

export const initialState: AppState = {
  locale: 'en-gb',
  testData: null
};

export const appReducer: Reducer<AppState, AppAction> = (state, action): AppState => {
  const handlers = {
    SET_LOCALE: (state, action) => {
      return { 
        ...state,
        locale: action.locale
      };
    },
    GENERATE_TEST: (state, action) => {
      console.log(action);
      return {
        ...state,
        testData: action.testData
      };
    }
  };
  return handlers[action.type](state, action);
};
