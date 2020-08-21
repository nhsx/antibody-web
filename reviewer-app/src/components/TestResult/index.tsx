import React, { useState, useEffect } from 'react';
import { AppContainer } from '../App/container';

export default ({ container }: { container: AppContainer }) => {
  let [testResult, setTestResult] = useState<any>({});

  useEffect(() => {
    const getNextResult = async () => {
      let nextResult = await container.testApi.nextResultToReview();
      setTestResult(nextResult);
    };

    getNextResult();
  }, [container]);

  if (!testResult) {
    return <div>Test Result</div>;
  } else {
    return <img
      data-testid="test-result-image"
      src={testResult.url}
      alt=""
      width="200px"
    />;
  }
};
