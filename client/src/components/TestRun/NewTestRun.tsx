import React, { useEffect, useState } from 'react';
import { START_STEP, UNSET_PROFILE_ID } from './TestRunConstants';
import { v4 as uuid } from 'uuid';
import { ROUTE_DEFINITIONS } from 'routes/routes';
import { Redirect } from 'react-router-dom';

export default () => {
  const [testRunUID, setTestRunUID] = useState<string | null>(null);

  useEffect(() => {
    const createNewTestRun = async () => {
      const newTestRunUid = uuid();
      setTestRunUID(newTestRunUid);
    };
    createNewTestRun();
  }, []);

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
