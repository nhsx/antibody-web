import { Reducer } from "react";
import AppError from "errors/AppError";


export interface AppState {
  locale: string;
  user?: any; // @TODO: Replace with proper typing once we know what our user data / auth flow looks like
  error?: AppError;
}

export type AppAction = {
  type: "SET_LOCALE";
  locale: string;
} | {
  type: "SET_ERROR";
  error: AppError | null;
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
        user: action.user
      };
    case "LOGOUT":
      return initialState;
  }
};
