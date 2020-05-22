import React, { useEffect, useState } from 'react';
import { START_STEP } from './TestRunConstants';
import { v4 as uuid } from 'uuid';
import { ROUTE_DEFINITIONS } from 'routes/routes';
import { Redirect } from 'react-router-dom';
import { withApp, AppContext } from 'components/App/context';
import { GenerateTestResponse } from 'abt-lib/requests/GenerateTest';
import ApiError from 'errors/ApiError';
import TestError from 'components/TestRun/TestError';

interface NewTestRunProps {
  app: AppContext;
}

const NewTestRun = (props: NewTestRunProps) => {
  const { app: { dispatch } } = props;
  const [testRunUID, setTestRunUID] = useState<string | null>(null);
  const { getTestApi } = props.app.container;
  const testApi = getTestApi();

  const [ generateError, setGenerateError ] = useState<ApiError | null>(null);
  
  useEffect(() => {
    const createNewTestRun = async () => {
      // @TODO: Replace with retrieving from authentication service
      const newTestRunUid = uuid();
      
      try {
        const testData: GenerateTestResponse = await testApi.generateTest({
          guid: newTestRunUid
        });
        setTestRunUID(newTestRunUid);
        dispatch({
          type: "GENERATE_TEST",
          testData: testData
        });
      } catch (error) {
        setGenerateError({
          code: "GEN1"
        });
      }
      
      //@TODO: error handling / move to action creators + reducer state
    };
    createNewTestRun();
  }, [dispatch, testApi]);

  if (generateError) {
    //@TODO: Move this
    return <TestError code={generateError.code} />;
  }

  return testRunUID ? (
    <Redirect
      to={{
        pathname: ROUTE_DEFINITIONS['PERFORM_TEST'].path
          .replace(':testRunUID', testRunUID)
          .replace(':step', START_STEP),
      }}
    />
  ) : (
    <div />
  );
};


export default withApp(NewTestRun);