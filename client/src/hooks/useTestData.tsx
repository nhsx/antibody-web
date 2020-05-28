import { useContext, useState, useCallback } from "react";
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

  const { state: { testRecord } } = test;
  const { container, setAppError } = app;

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<AppError | null>(null);

  const testApi = container.getTestApi();

  const updateTestData = useCallback(async testRecord => {
    try {
      setIsLoading(true);
      await testApi.updateTest({ testRecord });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const err = {
        code: "UPD1",
        original: error
      };
      setAppError(err);
      setError(err);
    }
  }, [setIsLoading, setAppError, testApi, setError]);

  return [testRecord, updateTestData, {
    isLoading,
    error
  }];
};


export default useTestData;