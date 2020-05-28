import { useContext, useState } from "react";
import appContext, { AppContext } from 'components/App/context';
import testContext, { TestContext } from 'components/TestContainer/context';
import AppError from "errors/AppError";
import { GenerateTestResponse } from "abt-lib/requests/GenerateTest";

interface UpdateStatus {
  error: AppError | null;
  isLoading: boolean;
}

const useTestData = (): [GenerateTestResponse | null, Function, UpdateStatus] => {
  const app = useContext(appContext) as AppContext;
  const test = useContext(testContext) as TestContext;

  const { state: { testData } } = test;
  const { container, setAppError } = app;

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<AppError | null>(null);

  const testApi = container.getTestApi();

  const updateTestData = async data => {
    try {
      setIsLoading(true);
      await testApi.updateTest(data);
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
  };

  return [testData, updateTestData, {
    isLoading,
    error
  }];
};


export default useTestData;