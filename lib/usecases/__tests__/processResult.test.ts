import processResult from "../processResult";
import { PredictionData } from "../../models/Prediction";

describe("processResult", () => {

  const positiveData : PredictionData = [
    {
      "Positive": 0.9351481199264526
    },
    {
      "Negative": 0.06485184282064438
    }
  ];

  const negativeData: PredictionData = [
    {
      "Positive": 0.06485184282064438
    },
    {
      "Negative": 0.9351481199264526
    }
  ];

  const misKeyedData: any = [
    {
      "NotAValidKey": 0.06485184282064438
    },
    {
      "OrThis": 0.9351481199264526
    },
    {
      "NorThis": 0.9351481199264526
    }
  ];

  const malformedData: any = {
    "Positive": 0.06485184282064438,
    "Negative": 0.9351481199264526
  };

      
      
  describe("When the result is negative", () => {
    it("Returns the string 'Negative'", async () => {
      expect(processResult(negativeData)).toEqual("Negative");
    });
  });

  describe("When the result is positive", () => {
    it("Returns the string 'Positive'", async () => {
      expect(processResult(positiveData)).toEqual("Positive");
    });
  });

  describe("When the predictionData is incorrectly keyed", () => {
    it("throws an error", async () => {
      expect(() => processResult(misKeyedData)).toThrow(TypeError);
    });
  });

  describe("When the predictionData is malformed", () => {
    it("throws an error", async () => {
      expect(() => processResult(malformedData)).toThrow(TypeError);
    });
  });
});

