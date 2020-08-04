import React from "react";
import { Route, Switch } from "react-router-dom";
import TestContainer from "components/TestContainer/TestContainer";
import { RouteProps } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import { getAppConfig } from 'utils/AppConfig';
import { AppConfig } from "utils/ConfigTypes";

import AddBloodSample from "components/TestRun/ContentComponent/AddBloodSample";
import CheckYourKit from "components/TestRun/ContentComponent/CheckYourKit";
import CollectBloodSample from "components/TestRun/ContentComponent/CollectBloodSample";
import GetReady from "components/TestRun/ContentComponent/GetReady";
import PrickFinger from "components/TestRun/ContentComponent/PrickFinger";
import ScanKit from "components/TestRun/ContentComponent/ScanKit";
import StartPage from "components/TestRun/ContentComponent/StartPage";
import TestBloodSample from "components/TestRun/ContentComponent/TestBloodSample";
import TestComplete from "components/TestRun/ContentComponent/TestComplete";
import TestKitID from "components/TestRun/ContentComponent/TestKitID";
import Wait from "components/TestRun/ContentComponent/Wait";

export interface TestRouteProps extends RouteProps {
  component: any;
  step?: string | string[] | undefined;
  next?: string;
  canPreview?: boolean;
  canCloseWithoutWarning?: boolean
}

/* Set our page title using portals, so we don't have to pass huge amounts of callbacks down the tree */
const TestRoute = (props: TestRouteProps) => {
  const { component: Component, canCloseWithoutWarning, ...other } = props;
  if (canCloseWithoutWarning) {
    return (
      <>
        <Component {...other} />
      </>
    );
  } else {
    return (
      <PreventPageClosing>
        <Component {...other} />
      </PreventPageClosing>
    );
  }
};

const testRoutes = ({ config }: { config: AppConfig }) => ([
  {
    component: StartPage,
    path: "start",
    next: "testKitID"
  },
  {
    component: TestKitID,
    path: "testKitId",
    next: "checkYourKit"
  },
  {
    component: CheckYourKit,
    path: "checkYourKit",
    next: "getReady",
  },
  {
    component: GetReady,
    path: "getReady",
    next: "prickFinger",
  },
  {
    component: PrickFinger,
    path: "prickFinger",
    next: "collectBloodSample",
    canPreview: true
  },
  {
    component: CollectBloodSample,
    path: "collectBloodSample",
    next: "addBloodSample",
    canPreview: true
  },
  {
    component: AddBloodSample,
    path: "addBloodSample",
    next: "testBloodSample",
    canPreview: true
  },
  {
    component: TestBloodSample,
    path: "testBloodSample",
    next: "wait",
    canPreview: true
  },
  {
    component: Wait,
    path: "wait",
    next: config.imageUpload ? "scanKit" : "testComplete"
  },
  {
    component: ScanKit,
    path: "scanKit",
    next: "testComplete"
  },
  {
    component: TestComplete,
    path: "testComplete",
    canCloseWithoutWarning: true
  }
]);

const previewRoutes = () => (
  testRoutes({ config: getAppConfig() }).filter(({ canPreview }) => canPreview)
);

const PreventPageClosing = ({ children }) => {
  useBeforeunload(() => "Please do not close this page until you have submitted your test.");
  return children;
};

export const TestRoutes = () => (
  <Switch>
    {testRoutes({ config: getAppConfig() }).map(({ path, next, ...route }, index) => (
      <TestRoute
        path={`/test/${path}`}
        step={path}
        next={`/test/${next}`}
        key={path}
        {...route} />
    ))}
  </Switch>
);

export const PreviewRoutes = () => (
  <Switch>
    {previewRoutes().map(({ path, next, ...route }, index) => {
      return (
        <TestRoute
          path={`/preview/${path}`}
          step={path}
          next={index < previewRoutes().length - 1 ? `/preview/${next}` : `/test`}
          key={path}
          {...route} />
      );
    })}
  </Switch>
);

export default () => (
  <>
    <Route
      path="/test/:step?"
      render={({ match }) => (
        <TestContainer step={match.params.step}>
          <TestRoutes />
        </TestContainer>
      )}>
    </Route>
    <Route
      path="/preview/:step?"
      render={() => (
        <PreviewRoutes />
      )}>
    </Route>
  </>
);