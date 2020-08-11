enum TimeSpentOptions {
  AtHome,
  SomewhereElse,
}

enum PeopleSharingSpaceOptions {
  LiveByMyself,
  Two,
  Three,
  Four,
  Five,
  SixOrMore,
}

interface TimeSpent {
  options: TimeSpentOptions;
  where: string;
}

interface ChildrenAgeGroups {
  noChildren: boolean;
  zeroToFive: boolean;
  sixToTwelve: boolean;
  aboveTwelve: boolean;
}

export default interface ExposureSurvey {
  majorityOfTimeSpent: TimeSpent;
  travelledFarFromHome: boolean;
  numberOfPeopleSharingSpace: PeopleSharingSpaceOptions;
  childrenAgeGroups: ChildrenAgeGroups;
  someoneLivedWithBeenDiagnosedWithFlu: boolean;
  publicTransportTaken: boolean;
  aroundSickChildren: boolean;
}
