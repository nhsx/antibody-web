import '../../style/sassStyle';

import React, { useReducer, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppContext from "./context";
import { appReducer, initialState } from "./reducer";
import messages from "i18n/index";
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import flatten from 'flat';
import AppContainer from "./container";
import LoginProvider from "../LoginProvider/LoginProvider";
import Layout from "components/ui/Layout";
import Home from "components/Home/Home";
import TestRoutes from "routes/TestRoutes";
import AppError from "errors/AppError"; 

const App = () => {
  const [appState, dispatch] = useReducer(
    appReducer,
    initialState
  );

  const setAppError = useCallback((error: AppError | null) => {
    dispatch({
      type: "SET_ERROR",
      error
    });
  }, [dispatch]);

  const setLocale = useCallback((locale: string) => {
    dispatch({
      type: "SET_LOCALE",
      locale,
    });
  }, []);

  const container = new AppContainer();

  return (
    <AppContext.Provider
      value={{ state: appState, setLocale, setAppError, dispatch, container }}
    >
      <IntlProvider
        locale={appState.locale}
        messages={flatten(messages[appState.locale])}
      >
        <HelmetProvider>
          <ErrorBoundary>
            <Router>
              <Layout error={appState.error}>
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={Home} />
                  <LoginProvider>
                    <TestRoutes />
                  </LoginProvider>
                </Switch>
              </Layout>
            </Router>
          </ErrorBoundary>
        </HelmetProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
};

export default App;
