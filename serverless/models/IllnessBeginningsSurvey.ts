enum TimeFromBeginningToSickestOptions {
  HalfADay,
  HalfADayToADay,
  OneToOneAndAHalfDays,
  OneAndAHalfToTwoDays,
  ThreeDays,
  FourDays,
  FiveOrMoreDays,
}

enum FluOrCommonColdOptions {
  Flu,
  CommonCold,
  SomethingElse,
}

export default interface IllnessBeginningsSurvey {
  timeFromBeginningToSickest: TimeFromBeginningToSickestOptions;
  fluOrCommonCold: FluOrCommonColdOptions;
  differentFromATypicalCold: boolean;
}
