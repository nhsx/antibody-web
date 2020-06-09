import React from "react";
import { Route, Switch } from "react-router-dom";
import TestContainer from "components/TestContainer/TestContainer";
import CheckYourKit from "components/TestRun/ContentComponent/CheckYourKit";
import WashAndDryHands from "components/TestRun/ContentComponent/WashAndDryHands";
import SetUpTest from "components/TestRun/ContentComponent/SetUpTest";
import SelectAFinger from "components/TestRun/ContentComponent/SelectAFinger";
import PrickFinger from "components/TestRun/ContentComponent/PrickFinger";
import Wait from "components/TestRun/ContentComponent/Wait";
import ScanKit from "components/TestRun/ContentComponent/ScanKit";
import Results from "components/TestRun/ContentComponent/Results";
import { RouteProps } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import Caption from "components/ui/Caption";
import { Portal } from 'react-portal';
import WhatIsWrong from "components/TestRun/ContentComponent/WhatIsWrong";
import ReportKit from "components/TestRun/ContentComponent/ReportKit";
import ReorderKit from "components/TestRun/ContentComponent/ReorderKit";
import CollectBloodSample from "components/TestRun/ContentComponent/CollectBloodSample";
import CoverCut from "components/TestRun/ContentComponent/CoverCut";
import AddBloodSample from "components/TestRun/ContentComponent/AddBloodSample";
import TestBloodSample from "components/TestRun/ContentComponent/TestBloodSample";

export interface TestRouteProps extends RouteProps {
  component: any;
  caption?: React.ReactNode; 
  step?: string | string[] | undefined;
  next?: string;
}


/* Set our page title using portals, so we don't have to pass huge amounts of callbacks down the tree */
const TestRoute = (props: TestRouteProps) => {
  const { component: Component, caption, ...other } = props;
  return (<>
    <Portal node={document.getElementById("portal-header")}><FormattedMessage id={`screens.${other.step}.title`} /></Portal>
    {caption && <Caption>{caption}</Caption>}
    <Component {...other} />
  
  </>
  );
};

const testRoutes = [

  {
    component: WashAndDryHands,
    path: "washAndDryHands",
    next: "setUpTest"
  },
  {
    component: SetUpTest,
    path:"setUpTest",
    next: "selectAFinger"
  },
  {
    component: SelectAFinger,
    path:"selectAFinger",
    next: "prickFinger"
  },
  {
    component: PrickFinger,
    path:"prickFinger",
    next: "collectBloodSample"
  },
  {
    component: CollectBloodSample,
    path:"collectBloodSample",
    next: "coverCut"
  },
  {
    component: CoverCut,
    path:"coverCut",
    next: "addBloodSample"
  },
  {
    component: AddBloodSample,
    path:"addBloodSample",
    next: "testBloodSample"
  },
  {
    component: TestBloodSample,
    path:"testBloodSample",
    next: "wait"
  },
  {
    component: Wait,
    path:"wait",
    next: "scanKit"
  },
  {
    component: ScanKit,
    path:"scanKit",
    next: "results"
  }
];

const supportRoutes = [
  // Routes without a step counter
  {
    component: CheckYourKit,
    path:"checkYourKit",
    next: "washAndDryHands",
  },
  {
    component: WhatIsWrong,
    path: "whatIsWrong"
  },
  {
    component: ReportKit,
    type: "Missing",
    path: "missing"
  },
  {
    component: ReportKit,
    type: "Broken",
    path: "damaged"
  },
  {
    component: ReorderKit,
    path: "reorder"
  },
  {
    component: Results,
    path:"results"
  }
];

export const TestRoutes = () => (
  <Switch>
    {testRoutes.map(({ path, next, ...route }, index) => (
      <TestRoute
        path={`/test/${path}`}
        step={path}
        next={`/test/${next}`}
        caption={<FormattedMessage
          id="app.stepCount"
          values={{ 
            current: index + 1, 
            total: testRoutes.length
          }} />}
        key={path}
        {...route} />
    ))}
    {supportRoutes.map(({ path, ...route }, index) => (
      <TestRoute
        path={`/test/${path}`}
        step={path}
        key={path}
        {...route} />
    ))}
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