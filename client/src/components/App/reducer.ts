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
    SET_ERROR: (state, action) => {
      return { 
        ...state,
        error: action.error
      };
    },
    LOGIN_SUCCESS: (state, action) => {
      return {
        ...state,
        user: action.user
      };
    },
    LOGOUT: () => {
      return initialState;
    }
  };
  return handlers[action.type](state, action);
};
