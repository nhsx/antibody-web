enum DiscomfortLevel {
  Mild,
  Moderate,
  Severe,
}

interface Symptom {
  experience: boolean;
  discomfort: DiscomfortLevel;
}

export default interface SymptomSurvey {
  symptoms: {
    feverish: Symptom;
    headache: Symptom;
    cough: Symptom;
    chills: Symptom;
    sweats: Symptom;
    soreThroat: Symptom;
    nausea: Symptom;
    runnyNose: Symptom;
    sneezing: Symptom;
    fatigue: Symptom;
    muscleAche: Symptom;
    troubleBreathing: Symptom;
    noneOfTheAbove: Symptom;
  };
}
