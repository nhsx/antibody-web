// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { StepDetailComponentProp, StepDetails } from '../TestRunConstants';

import transcribeTestPath from '../transcribeTestPath';

const voidRender = (props: StepDetailComponentProp) => null;

function createStepDetails(stepName: string): StepDetails {
  return {
    title: 'Open test strip',
    name: stepName,
    ContentComponent: voidRender,
    nav: {},
  };
}

test('transcribe one alternative path', () => {
  /**
   * A ←→ B ←→ C ←→ D
   *  ↖       ↗
   *    ↘ - ↙
   *
   * becomes
   * A ←→ B ←→ C ←→ D
   *  ↖
   *    ↘
   *      CAlt ←→ DAlt
   */

  const A = createStepDetails('A');
  A.nav.next = { default: 'B' };
  A.nav.next.alternate = 'C';
  const B = createStepDetails('B');
  B.nav.previous = 'A';
  B.nav.next = { default: 'C' };
  const C = createStepDetails('C');
  C.nav.previous = 'B';
  C.nav.next = { default: 'D' };
  const D = createStepDetails('D');
  D.nav.previous = 'C';

  const allSteps = { A, B, C, D };
  transcribeTestPath(allSteps);
  expect(allSteps).toEqual({
    A: {
      ContentComponent: voidRender,
      name: 'A',
      nav: {
        next: {
          alternate: 'CAlternate',
          default: 'B',
        },
      },
      title: 'Open test strip',
    },
    B: {
      ContentComponent: voidRender,
      name: 'B',
      nav: {
        next: {
          default: 'C',
        },
        previous: 'A',
      },
      title: 'Open test strip',
    },
    C: {
      ContentComponent: voidRender,
      name: 'C',
      nav: {
        next: {
          default: 'D',
        },
        previous: 'B',
      },
      title: 'Open test strip',
    },
    CAlternate: {
      ContentComponent: voidRender,
      name: 'C',
      nav: {
        next: {
          default: 'DAlternate',
        },
        previous: 'A',
      },
      title: 'Open test strip',
    },
    D: {
      ContentComponent: voidRender,
      name: 'D',
      nav: {
        previous: 'C',
      },
      title: 'Open test strip',
    },
    DAlternate: {
      ContentComponent: voidRender,
      name: 'D',
      nav: {
        previous: 'CAlternate',
      },
      title: 'Open test strip',
    },
  });
});

test('transcribe two alternative path', () => {
  /**
   * A ←→ B ←→ C ←→ D ←→ E
   *  ↖       ↗ ↖       ↗
   *    ↘ - ↙     ↘ - ↙
   *     Alt      Other
   *
   * becomes
   *
   * A ←→ B ←→ C ←→ D ←→ E
   *  ↖          ↖
   *   \           ↘
   *     ↘           EOther
   *      CAlt ←→ DAlt ←→ EAlt
   *         ↖
   *           ↘
   *             EAltOther
   *
   */
  const A = createStepDetails('A');
  A.nav.next = { default: 'B' };
  A.nav.next.alternate = 'C';
  const B = createStepDetails('B');
  B.nav.previous = 'A';
  B.nav.next = { default: 'C' };
  const C = createStepDetails('C');
  C.nav.previous = 'B';
  C.nav.next = { default: 'D', other: 'E' };
  const D = createStepDetails('D');
  D.nav.previous = 'C';
  D.nav.next = { default: 'E' };
  const E = createStepDetails('E');
  E.nav.previous = 'D';

  const allSteps = { A, B, C, D, E };
  transcribeTestPath(allSteps);
  expect(allSteps).toEqual({
    A: {
      ContentComponent: voidRender,
      name: 'A',
      nav: {
        next: {
          alternate: 'CAlternate',
          default: 'B',
        },
      },
      title: 'Open test strip',
    },
    B: {
      ContentComponent: voidRender,
      name: 'B',
      nav: {
        next: {
          default: 'C',
        },
        previous: 'A',
      },
      title: 'Open test strip',
    },
    C: {
      ContentComponent: voidRender,
      name: 'C',
      nav: {
        next: {
          default: 'D',
          other: 'EOther',
        },
        previous: 'B',
      },
      title: 'Open test strip',
    },
    CAlternate: {
      ContentComponent: voidRender,
      name: 'C',
      nav: {
        next: {
          default: 'DAlternate',
          other: 'EAlternateOther',
        },
        previous: 'A',
      },
      title: 'Open test strip',
    },
    D: {
      ContentComponent: voidRender,
      name: 'D',
      nav: {
        previous: 'C',
        next: {
          default: 'E',
        },
      },
      title: 'Open test strip',
    },
    DAlternate: {
      ContentComponent: voidRender,
      name: 'D',
      nav: {
        previous: 'CAlternate',
        next: {
          default: 'EAlternate',
        },
      },
      title: 'Open test strip',
    },
    E: {
      ContentComponent: voidRender,
      name: 'E',
      nav: {
        previous: 'D',
      },
      title: 'Open test strip',
    },
    EAlternate: {
      ContentComponent: voidRender,
      name: 'E',
      nav: {
        previous: 'DAlternate',
      },
      title: 'Open test strip',
    },
    EAlternateOther: {
      ContentComponent: voidRender,
      name: 'E',
      nav: {
        previous: 'CAlternate',
      },
      title: 'Open test strip',
    },
    EOther: {
      ContentComponent: voidRender,
      name: 'E',
      nav: {
        previous: 'C',
      },
      title: 'Open test strip',
    },
  });
});
