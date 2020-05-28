import { Reducer } from "react";
import AppError from "errors/AppError";


export interface AppState {
  locale: string;
  user?: any; // @TODO: Replace with proper typing once we know what our user data / auth flow looks like
}

export type AppAction = {
  type: "SET_LOCALE";
  locale: string;
} | {
  type: "SET_ERROR";
  error: AppError;
} | {
  type: "LOGIN_SUCCESS";
  user: any;
} | {
  type: "LOGOUT";
};

export const initialState: AppState = {
  locale: 'en-gb',
  user: null
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
