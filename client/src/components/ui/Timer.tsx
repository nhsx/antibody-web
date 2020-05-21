// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useEffect, useState } from 'react';
import {  createStyles, makeStyles } from '@material-ui/core';

import { cx } from '../../style/utils';

const useStyle = makeStyles(() =>
  createStyles({
    timerRoot: { position: 'relative', width: '100%' },

    timerCircle: {
      fill: 'none',
      stroke: 'none',
    },

    timerElapsed: {
      strokeWidth: '7px',
      stroke: 'grey',
    },

    timerLabel: {
      alignItems: 'center',
      display: 'flex',
      fontSize: '48px',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      top: 0,
    },

    timerRemainingPath: {
      stroke: 'green',
      strokeWidth: '7px',
      strokeLinecap: 'round',
      transform: 'rotate(90deg)',
      transformOrigin: 'center',
    },

    timerRunningTransition: {
      transition: 'all .2s linear, stroke 1s linear',
    },

    timerCompletedTransition: {
      transition: '1s linear all',
    },

    timerSVG: {
      transform: 'scaleX(-1)',
    },
  })
);

const COLORS = [
  {
    color: '#ff3860', // red
    limit: 1,
  },
  {
    color: '#ff9c21', // orange
    limit: 0.5,
  },
  {
    color: '#ffdd57', // yellow
    limit: 0.25,
  },
  {
    color: '#48c774', // greed
    limit: 0,
  },
];

export interface TimerProps {
  duration: number; // timer length in milliseconds.
  startTime?: number; // when did the time start.
  onTimerComplete?: () => void;
}

export default (props: TimerProps) => {
  const classes = useStyle();
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

  let label;

  if (!completed) {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.round((timeRemaining % 60000) / 1000);
    label = `${minutes | 0}:${seconds < 10 ? '0' + seconds : seconds}`;
  } else {
    label = 'DONE!';
  }

  let remainingPathColor;
  COLORS.forEach((section) => {
    if (timeRemaining <= section.limit * duration) {
      remainingPathColor = section.color;
    }
  });

  // See explaination here about why we use 283.
  // https://glennmccomb.com/articles/building-a-pure-css-animated-svg-spinner/
  // circumference = 2 x 3.1416 x radius = 2 x 3.1416 x 45 = 282.74
  const remainingPath = completed ? 283 : (timeRemaining * 283) / duration;

  return (
    <div className={classes.timerRoot}>
      <svg
        className={classes.timerSVG}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={classes.timerCircle}>
          <circle
            className={classes.timerElapsed}
            cx="50"
            cy="50"
            r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={`${remainingPath} 283`}
            className={cx({
              [classes.timerRemainingPath]: true,
              [classes.timerCompletedTransition]: completed,
              [classes.timerRunningTransition]: !completed,
            })}
            style={{
              stroke: remainingPathColor,
            }}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span className={classes.timerLabel}>{label}</span>
    </div>
  );
};
