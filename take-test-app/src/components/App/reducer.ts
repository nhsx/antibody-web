import { Reducer } from "react";
import AppError from "errors/AppError";


export interface AppState {
  locale: string;
  error?: AppError;
  token?: string;
}

export type AppAction = {
  type: "SET_LOCALE";
  locale: string;
} | {
  type: "SET_ERROR";
  error: AppError | null;
} | {
  type: "LOGIN_SUCCESS";
  token: string;
} | {
  type: "LOGOUT";
};

export const initialState: AppState = {
  locale: 'en-gb'
};

export const appReducer: Reducer<AppState, AppAction> = (state, action): AppState => {
  switch (action.type) {
    case "SET_LOCALE":
      return {
        ...state,
        locale: action.locale
      };
    case "SET_ERROR":
      return { 
        ...state,
        error: action.error || undefined
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token
      };
    case "LOGOUT":
      return initialState;
  }
};
