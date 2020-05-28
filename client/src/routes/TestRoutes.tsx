import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import TestContainer from "components/TestContainer/TestContainer";
import CheckYourKit from "components/TestRun/ContentComponent/CheckYourKit";
import WashAndDryHands from "components/TestRun/ContentComponent/WashAndDryHands";
import SetUpTest from "components/TestRun/ContentComponent/SetUpTest";
import SelectAFinger from "components/TestRun/ContentComponent/SelectAFinger";
import Wait from "components/TestRun/ContentComponent/Wait";
import ScanKit from "components/TestRun/ContentComponent/ScanKit";
import Results from "components/TestRun/ContentComponent/Results";
import { StepProps } from "components/TestRun/ContentComponent/Step";
import { RouteProps } from 'react-router-dom';

export interface TestRouteProps extends RouteProps {
  component: FunctionComponent<StepProps>;
  next?: string;
}

const TestRoute = (props: TestRouteProps) => {
  const { component: Component, ...other } = props;
  return <Component {...other} />;
};

export const TestRoutes = () => (
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
      path="/test/results"
    />
  </Switch>
);

export default () => (
  <Route
    path="/test/:step?"
    render={({ match }) => (
      <TestContainer step={match.params.step}> 
        <TestRoutes />
      </TestContainer>
    )}>   
  </Route>
);