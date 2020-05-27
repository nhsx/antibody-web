import React, { useState, useEffect, useReducer } from 'react';
import { withApp, AppContext } from 'components/App/context';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { GenerateTestResponse } from 'abt-lib/requests/GenerateTest';
import { testReducer, initialState } from "./reducer";
import TestContext from "./context";

interface TestContainerProps {
  children: React.ReactNode;
  app: AppContext;
}

const TestContainer = (props: TestContainerProps) => {

  console.log('rendering!');
  const { children, app } = props;
  const history = useHistory();
  const { setAppError, container: { getTestApi } } = app;
  const testApi = getTestApi();
  
  const [testState, dispatch]: [any, Function] = useReducer(
    testReducer,
    initialState
  );

  const [isFetchingTest, setIsFetchingTest] = useState<boolean>(true);

  const [cookies] = useCookies(['login-token']);

  useEffect(() => {
    const fetchTest = async() => {
      try {
        // If the user already as an ongoing test with that guid, this will return their current info
        const testData: GenerateTestResponse = await testApi.generateTest({ guid: cookies['login-token'] });
        dispatch({
          type: "GENERATE_TEST",
          testData: testData
        });
        history.push(`/test/${testData.step}`);
        setIsFetchingTest(false);
      } catch (error) {
        setIsFetchingTest(false);
        setAppError({
          code: "GEN1"
        });
      }
    };

    fetchTest();
  }, []);


  if (isFetchingTest) {
    return <div>Fetching Your Test...</div>;
  }

  return (
    <TestContext.Provider
      value={{ state: testState, dispatch }}
    >
      {children}
    </TestContext.Provider>
  );
};

export default withApp(TestContainer);