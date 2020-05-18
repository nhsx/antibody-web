// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { Theme, createStyles, makeStyles } from '@material-ui/core';

interface CxParameter {
  [key: string]: boolean;
}

// helper function to manage classnames.
// useage:
// - cx({'a': true, 'b': false, c:true}) -> 'a c'
// - cx("blah", "hello") -> "blah hello"
// - cx(["blah", "hello"]) -> "blah hello"
// combinations:
// - cx({'a': true}, "b", ["c", "d"]) => 'a b c d'
// Overrides (last takes precedence):
// - cx ("a e", {a: true, b: false, c: false, d: true, e: false}, "c", ["b"], {a: false} )
// -> "b c d"
export const cx = (
  ...args: Array<CxParameter | Array<string> | string>
): string => {
  let allClasses = {};
  args.forEach((obj: CxParameter | Array<string> | string) => {
    if (typeof obj === 'string') {
      obj = obj.split(' ');
    }
    if (Array.isArray(obj)) {
      obj.forEach((className) => {
        className = className.trim();
        if (className !== '') {
          allClasses[className] = true;
        }
      });
      return;
    }
    allClasses = {
      ...allClasses,
      ...obj,
    };
  });
  return Object.getOwnPropertyNames(allClasses)
    .filter((className: string) => !!allClasses[className])
    .join(' ');
};

export const useAnimateBgAndColor = makeStyles((theme: Theme) =>
  createStyles({
    animateBgAndColor: {
      transitionProperty: 'color, background-color',
      transitionDuration: '.2s',
      transitionTimingFunction: 'ease',
    },
  })
);

export const toCSSPercent = (x: number): string => {
  return x * 100 + '%';
};
