// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useEffect, useState } from 'react';
import { Label } from 'nhsuk-react-components';

export interface TimerProps {
  duration: number; // timer length in milliseconds.
  startTime?: number; // when did the time start.
  onTimerComplete?: () => void;
}

export default (props: TimerProps) => {
  const { duration, onTimerComplete } = props;
  const startTime = props.startTime;

  const [startTimeInternal, setStartTimeInternal] = useState(
    startTime || Date.now()
  );

  const [timeRemaining, setTimeRemaining] = useState(
    Math.max(0, duration - (Date.now() - startTimeInternal))
  );

  const [completed, setCompleted] = useState(false);

  if (startTime && startTimeInternal !== startTime) {
    setStartTimeInternal(startTime);
  }

  useEffect(() => {
    if (timeRemaining >= 0 && !completed) {
      const timeoutKey = setTimeout(() => {
        const deltaTime = Date.now() - startTimeInternal;
        const remaining = Math.max(0, duration - deltaTime);
        setTimeRemaining(remaining);
        if (remaining === 0) {
          setCompleted(true);
          onTimerComplete && onTimerComplete();
        }
      }, 200);
      return () => {
        clearTimeout(timeoutKey);
      };
    }
  });

  const remainingSeconds = Math.ceil(timeRemaining / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const label = `${minutes | 0}:${seconds < 10 ? '0' + seconds : seconds}`;

  return (
    <Label size="xl">{label}</Label>
  );
};
