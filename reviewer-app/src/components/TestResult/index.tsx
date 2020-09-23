import React, { useState, useEffect } from 'react';
import { AppContainer } from '../App/container';
import ResultSelector from 'components/ResultSelector';

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
    return <div>No test result found</div>;
  } else {
    return <div>
      <img
        data-testid="test-result-image"
        src={testResult.url}
        alt=""
        width="200px"
      />
      <ResultSelector
        container={container}
        testResult={testResult}
      />
    </div>;
  }
};
