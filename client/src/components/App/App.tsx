import React, { useReducer } from "react";
import { DashboardRoute, ROUTES } from "routes/routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PageNotFound from "components/PageNotFound/PageNotFound";
import { IntlProvider } from "react-intl";
import AppContext from "./context";
import { appReducer, initialState } from "./reducer";
import messages from "i18n/index";
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import flatten from 'flat';
import { AppContainer } from "./container";

const App = () => {
  const [appState, dispatch]: [any, Function] = useReducer(
    appReducer,
    initialState
  );

  const setLocale = (locale) => {
    dispatch({
      type: "SET_LOCALE",
      locale,
    });
  };

  const container = new AppContainer();

  return (
    <AppContext.Provider
      value={{ state: appState, setLocale, dispatch, container }}
    >
      <IntlProvider
        locale={appState.locale}
        messages={flatten(messages[appState.locale])}
      >
        <HelmetProvider>
          <ErrorBoundary>
            <Router>
              <Switch>
                {ROUTES.map((route: DashboardRoute) => (
                  <Route
                    {...route}
                    key={route.path} />
                ))}
                <Route key="pagenotfound">
                  <>
                    <Helmet title={`Open RDT: Page not foundg`} />
                    <PageNotFound />
                  </>
                </Route>
              </Switch>
            </Router>
          </ErrorBoundary>
        </HelmetProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
};

export default App;
