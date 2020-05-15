// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { StepDetails } from './TestRunConstants';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default (allSteps: { [stepName: string]: StepDetails }) => {
  const stepIds = Object.keys(allSteps);

  function duplicateStepWithSuffix(
    step: StepDetails,
    stepId: string,
    suffix: string
  ) {
    const newStep = { ...step };
    newStep.nav = { ...newStep.nav };

    if (newStep.nav.previous) {
      newStep.nav.previous += suffix;
    }
    if (newStep.nav.next) {
      newStep.nav.next = { ...newStep.nav.next };
      const nextNav = newStep.nav.next;
      for (const navType in nextNav) {
        nextNav[navType] += suffix;
      }
    }
    const newStepName = stepId + suffix;
    allSteps[newStepName] = newStep;
    stepIds.push(newStepName);
  }

  function duplicatePathForSuffix(stepId: string | undefined, suffix: string) {
    while (stepId) {
      const step = allSteps[stepId];
      duplicateStepWithSuffix(step, stepId, suffix);
      stepId = step.nav?.next?.default;
    }
  }

  for (let i = 0; i < stepIds.length; i++) {
    const stepId = stepIds[i];
    const step = allSteps[stepId];
    const nextNav = step.nav.next;
    if (nextNav) {
      const nextNavTypes = Object.keys(nextNav);
      if (nextNavTypes.length > 1) {
        nextNavTypes.forEach((navType: string) => {
          if (navType !== 'default') {
            const suffix = capitalizeFirstLetter(navType);
            duplicatePathForSuffix(nextNav[navType], suffix);
            // step.nav.next.withoutSymptoms = "waitStripReaction"
            // ->  step.nav.next.withoutSymptoms = "waitStripReactionWithoutSymptoms"
            nextNav[navType] += suffix;
            allSteps[nextNav[navType]].nav.previous = stepId;
          }
        });
      }
    }
  }
};
