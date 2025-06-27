import React, { useState, useEffect } from "react";
import AnxietyScale from "./surveys/AnxietyScale";
import Big5Inventory from "./surveys/Big5Inventory";
import ChildhoodTraumaScale from "./surveys/ChildhoodTraumaScale";
import RelationshipSurvey from "./surveys/RelationshipSurvey";
import EmotionalIntelligenceScale from "./surveys/EmotionalIntelligenceScale";

import useSurveyStore from "../store/surveyStore";
import { saveSurveyResult } from "../firebaseService";

const surveyList = [
  { name: "AnxietyScale", Component: AnxietyScale, questionCount: 40 },
  { name: "Big5Inventory", Component: Big5Inventory, questionCount: 44 },
  { name: "ChildhoodTraumaScale", Component: ChildhoodTraumaScale, questionCount: 28 },
  { name: "RelationshipSurvey", Component: RelationshipSurvey, questionCount: 30 },
  { name: "EmotionalIntelligenceScale", Component: EmotionalIntelligenceScale, questionCount: 41 },
];

function SurveyWizard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, tc, answers, setName, setTc, resetAll } = useSurveyStore();

  const CurrentSurvey = surveyList[currentIndex].Component;
  const currentSurveyName = surveyList[currentIndex].name;
  const currentQuestionCount = surveyList[currentIndex].questionCount;

  useEffect(() => {
    resetAll(currentQuestionCount);
  }, [currentIndex]);

  const handleNext = async () => {
    if (!name.trim() || !tc.trim()) {
      alert("Lütfen isim ve TC bilgilerini doldurun.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await saveSurveyResult(currentSurveyName, { name, tc, answers });
      if (currentIndex < surveyList.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert("Tüm anketleri tamamladınız, teşekkürler!");
        resetAll(surveyList[0].questionCount);
        setCurrentIndex(0);
      }
    } catch (e) {
      setError("Kaydetme sırasında hata oluştu. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <label>
          İsim:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: 20 }}
          />
        </label>
        <label>
          TC:{" "}
          <input
            type="text"
            value={tc}
            onChange={(e) => setTc(e.target.value)}
          />
        </label>
      </div>

      <CurrentSurvey />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleNext} disabled={loading} style={{ marginTop: 20 }}>
        {loading
          ? "Kaydediliyor..."
          : currentIndex === surveyList.length - 1
          ? "Tamamla"
          : "İleri"}
      </button>
    </div>
  );
}

export default SurveyWizard;
