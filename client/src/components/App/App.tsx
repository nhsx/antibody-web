import React, { useReducer, FunctionComponent } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Switch, RouteProps } from "react-router-dom";
import PageNotFound from "components/PageNotFound/PageNotFound";
import { IntlProvider } from "react-intl";
import AppContext from "./context";
import { appReducer, initialState } from "./reducer";
import messages from "i18n/index";
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import flatten from 'flat';
import { AppContainer } from "./container";
import LoginProvider from "../LoginProvider/LoginProvider";
import Layout from "components/ui/Layout";
import CheckYourKit from "components/TestRun/ContentComponent/CheckYourKit";
import TestContainer from "components/TestContainer/TestContainer";
import WashAndDryHands from "components/TestRun/ContentComponent/WashAndDryHands";
import SetUpTest from "components/TestRun/ContentComponent/SetUpTest";
import SelectAFinger from "components/TestRun/ContentComponent/SelectAFinger";
import Wait from "components/TestRun/ContentComponent/Wait";
import ScanKit from "components/TestRun/ContentComponent/ScanKit";
import Home from "components/Home/Home";
import Results from "components/TestRun/ContentComponent/Results";
import { StepProps } from "components/TestRun/ContentComponent/Step";


export interface TestRouteProps extends RouteProps {
  component: FunctionComponent<StepProps>;
  next?: string;
}

const TestRoute = (props: TestRouteProps) => {
  const { component: Component, ...other } = props;
  return <Component {...other} />;
};

const App = () => {


  const [appState, dispatch]: [any, Function] = useReducer(
    appReducer,
    initialState
  );

  const setAppError = (error)  => {
    dispatch({
      type: "SET_ERROR",
      error
    });
  };

  const setLocale = (locale) => {
    dispatch({
      type: "SET_LOCALE",
      locale,
    });
  };

  const container = new AppContainer();

  console.log('rerendtering app');

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
                    <Route path="/test">
                      <TestContainer>
                        <Switch>
                          <TestRoute
                            component={CheckYourKit}
                            path="/test/checkYourKit"
                            next="/test/washAndDryHands" />
                          <TestRoute
                            component={WashAndDryHands}
                            path="/test/washAndDryHands"
                            next="/test/setUpTest" />  
                          <TestRoute
                            component={SetUpTest}
                            path="/test/setUpTest"
                            next="/test/selectAFinger" />  
                          <TestRoute
                            component={SelectAFinger}
                            path="/test/selectAFinger"
                            next="/test/wait" />  
                          <TestRoute
                            component={Wait}
                            path="/test/wait"
                            next="/test/scanKit" />  
                          <TestRoute
                            component={ScanKit}
                            path="/test/scanKit"
                            next="/test/results" />  
                          <TestRoute
                            component={Results}
                            path="/test/scanKit"
                          />
                        </Switch>
                      </TestContainer>
                    </Route>
                  </LoginProvider>
                  <Route key="pagenotfound">
                    <>
                      <Helmet title={`Open RDT: Page not found`} />
                      <PageNotFound />
                    </>
                  </Route>
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
