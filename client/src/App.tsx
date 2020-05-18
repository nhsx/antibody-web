import React from 'react';
import { DashboardRoute, ROUTES } from 'routes/routes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PageNotFound from 'components/PageNotFound/PageNotFound';

const App = () => {
  return (
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
  );
};

export default App;
