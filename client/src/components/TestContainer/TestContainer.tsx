import React, { useState, useEffect, useReducer, useContext, ReactNode } from 'react';
import appContext, { AppContext } from 'components/App/context';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { testReducer, initialState } from "./reducer";
import TestContext from "./context";
import useTestData from 'hooks/useTestData';
import TestRecord from 'abt-lib/models/TestRecord';

interface TestContainerProps {
  children: React.ReactNode;
  step: string;
  dispatch;
}

// This component is responsible for fetching the test data when hitting a /test/:step route, and rendering a loading state until we have the user's current test data
const TestContainer = (props: TestContainerProps) => {

  const { children, step, dispatch } = props;
  const app = useContext(appContext) as AppContext;

  const history = useHistory();
  const [testRecord, updateTest] = useTestData();

  const { setAppError, container: { getTestApi } } = app;
  const testApi = getTestApi();
  
  const [isFetchingTest, setIsFetchingTest] = useState<boolean>(true);

  const [cookies] = useCookies(['login-token']);

  useEffect(() => {
    const fetchTest = async() => {
      try {
        // If the user already as an ongoing test with that guid, this will return their current info
        
        const { testRecord }: { testRecord: TestRecord} = await testApi.generateTest({ guid: cookies['login-token'] });
        console.log(testRecord);
        dispatch({
          type: "GENERATE_TEST",
          testRecord
        });
        history.push(`/test/${testRecord.step}`);
        setIsFetchingTest(false);
      } catch (error) {
        setIsFetchingTest(false);
        setAppError({
          code: "GEN1"
        });
      }
    };

    fetchTest();
  }, [testApi, cookies, dispatch, setAppError, history]);

  useEffect(() => {
    if (step) {
      updateTest({
        ...testRecord,
        step
      });
    }
    
  }, [step, updateTest, testRecord]);


  if (isFetchingTest) {
    return <div>Fetching Your Test...</div>;
  }

  return <>
    {children}
  </>;
};


interface WrapperProps {
  children: ReactNode;
  step: string;
}

// We wrap our main element here so we have access to the useTestData hook, as it's reliant on context and we can't declare a provider and access its context in the same component.
const TestContainerWrapper = (props: WrapperProps) => {
  
  const { children, step } = props;

  const [testState, dispatch]: [any, Function] = useReducer(
    testReducer,
    initialState
  );

  return (
    <TestContext.Provider
      value={{ state: testState, dispatch }}
    >
      <TestContainer
        dispatch={dispatch}
        step={step}>
        {children}
      </TestContainer>
    </TestContext.Provider>
  );
};

export default TestContainerWrapper;