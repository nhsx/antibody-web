import React, { useEffect, useState } from 'react';
import { START_STEP } from './TestRunConstants';
import { v4 as uuid } from 'uuid';
import { ROUTE_DEFINITIONS } from 'routes/routes';
import { Redirect } from 'react-router-dom';
import { generateTest } from 'api/testApi';
import { withApp, AppContext } from 'components/App/context';
import { GenerateTestResponse } from 'abt-lib/requests/GenerateTest';

interface NewTestRunProps {
  app: AppContext;
}

const NewTestRun = (props: NewTestRunProps) => {
  const { app: { dispatch } } = props;
  const [testRunUID, setTestRunUID] = useState<string | null>(null);

  useEffect(() => {
    const createNewTestRun = async () => {
      const newTestRunUid = uuid();
      const testData: GenerateTestResponse = await generateTest({
        guid: newTestRunUid
      });
      setTestRunUID(newTestRunUid);
      dispatch({
        type: "GENERATE_TEST",
        testData: testData
      });
      //@TODO: error handling / move to action creators + reducer state
    };
    createNewTestRun();
  }, [dispatch]);

  return testRunUID ? (
    <Redirect
      to={{
        pathname: ROUTE_DEFINITIONS['PERFORMTEST'].path
          .replace(':testRunUID', testRunUID)
          .replace(':step', START_STEP),
      }}
    />
  ) : (
    <div />
  );
};


export default withApp(NewTestRun);