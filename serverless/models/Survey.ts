import SymptomSurvey from "./SymptomSurvey";
import IllnessBeginningsSurvey from "./IllnessBeginningsSurvey";
import GeneralHealthSurvey from "./GeneralHealthSurvey";
import ExposureSurvey from "./ExposureSurvey";

export default interface Survey {
  symptoms: SymptomSurvey;
  illnessBeginnings: IllnessBeginningsSurvey;
  generalHealth: GeneralHealthSurvey;
  exposureSurvey: ExposureSurvey;
}
