import { useContext, useState, useCallback, useRef } from "react";
import appContext, { AppContext } from 'components/App/context';
import testContext, { TestContext } from 'components/TestContainer/context';
import AppError from "errors/AppError";
import TestRecord from "abt-lib/models/TestRecord";

interface UpdateStatus {
  error: AppError | null;
  isLoading: boolean;
}

const useTestData = (): [TestRecord | null, Function, UpdateStatus] => {
  const app = useContext(appContext) as AppContext;
  const test = useContext(testContext) as TestContext;

  const { state: { testRecord }, dispatch } = test;
  const { container, setAppError } = app;

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<AppError | null>(null);

  const testApi = useRef(container.getTestApi()).current;


  const updateTest = useCallback(async newTestRecord => {
    // Eagerly update our state
    dispatch({
      type: "SAVE_TEST",
      testRecord: newTestRecord
    });    
    try {
      setIsLoading(true);
      await testApi.updateTest({ testRecord: newTestRecord });
      setIsLoading(false);
    } catch (error) {
      // Roll back our state if the update fails
      dispatch({
        type: "SAVE_TEST",
        testRecord
      });
      setIsLoading(false);
      const err = {
        code: "UPD1",
        original: error
      };
      setAppError(err);
      setError(err);
    }
  }, [setIsLoading, setAppError, testApi, setError, dispatch, testRecord]);

  return [testRecord, updateTest, {
    isLoading,
    error
  }];
};


export default useTestData;