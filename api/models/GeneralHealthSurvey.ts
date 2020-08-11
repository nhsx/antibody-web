enum AffectedAbilityOptions {
  NotAtAll,
  ALittleBit,
  Somewhat,
  QuiteABit,
  VeryMuch,
}

export default interface GeneralHealthSurvey {
  hasAbilityBeenAffected: AffectedAbilityOptions;
  currentlySmokes: boolean;
  memberOfHouseholdSmokes: boolean;
}
