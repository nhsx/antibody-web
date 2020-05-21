import React, { useReducer } from 'react';
import { DashboardRoute, ROUTES } from 'routes/routes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import { IntlProvider } from 'react-intl';
import AppContext from './context';
import { appReducer, initialState } from './reducer';
import messages from "i18n/index";


const App = () => {
  const [appState, dispatch]: [any, Function] = useReducer(appReducer, initialState);

  const setLocale = (locale) => {
    dispatch({
      type: "SET_LOCALE",
      locale
    });
  };

  return (
    <AppContext.Provider value={{ state: appState, setLocale, dispatch }}>
      <IntlProvider locale={appState.locale} messages={messages[appState.locale]}>
        <HelmetProvider>
          <Router>
            <Switch>
              {ROUTES.map((route: DashboardRoute) => (
                <Route {...route} key={route.path} />
              ))}
              <Route key="pagenotfound">
                <>
                  <Helmet title={`Open RDT: Page not found`} />
                  <PageNotFound />
                </>
              </Route>
            </Switch>
          </Router>
        </HelmetProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
};

export default App;
