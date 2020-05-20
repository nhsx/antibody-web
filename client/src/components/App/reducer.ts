import { Reducer } from "react"

export interface AppState {
  locale: string;
}

export type AppAction = {
  type: "SET_LOCALE";
  locale: string;
}

export const initialState: AppState = {
  locale: 'en-gb'
}

export const appReducer: Reducer<AppState, AppAction> = (state, action): AppState => {
  const handlers = {
    SET_LOCALE: (state, action) => {
      return { 
        ...state,
        locale: action.locale
      }
    }
  }
  return handlers[action.type](state, action)
}
