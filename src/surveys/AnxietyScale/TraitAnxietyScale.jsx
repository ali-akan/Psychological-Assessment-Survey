import React, { useState } from "react";
import traitQuestions from "./traitQuestions";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./TraitAnxietyScale.module.css";

function TraitAnxietyScale({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const sectionKey = "anxietyTrait";

  const handleAnswerChange = (questionId, value) => {
    setAnswer(sectionKey, questionId, Number(value));
  };

  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim bilgilerinizi giriniz.");
      return;
    }

    const currentAnswers = answers[sectionKey] || {};
    const unanswered = traitQuestions.filter(({ id }) => !(id in currentAnswers));
    if (unanswered.length > 0) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: currentAnswers }, sectionKey);
      alert("Sürekli kaygı verileri kaydedildi.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      if (onNext) onNext();
    } catch (e) {
      console.error(e);
      alert("Bir hata oluştu, tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sürekli Kaygı Ölçeği</h2>

      <p className={styles.description}>
        Aşağıdaki ifadeler insanların genel ruh hallerine dairdir. Kendinizi ne kadar sıklıkla böyle hissettiğinizi, uygun olan seçeneği işaretleyerek belirtiniz.
      </p>

      <p className={styles.points}>
        1: Hemen hemen hiçbir zaman &nbsp; 2: Bazen &nbsp; 3: Çok zaman &nbsp; 4: Hemen her zaman
      </p>

      <form>
        <table className={styles.questionTable}>
          <thead>
            <tr>
              <th>Soru</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
            </tr>
          </thead>
          <tbody>
            {traitQuestions.map(({ id, text, options }, index) => (
              <tr key={id}>
                <td>{index + 21}. {text}</td>
                {options.map((opt) => (
                  <td key={opt}>
                    <input
                      type="radio"
                      name={id}
                      value={opt}
                      checked={answers[sectionKey]?.[id] === opt}
                      onChange={() => handleAnswerChange(id, opt)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div className={styles.buttonGroup}>
        <button onClick={handleNextClick} disabled={loading}>
          {loading ? "Kaydediliyor..." : "İleri"}
        </button>
      </div>
    </div>
  );
}

export default TraitAnxietyScale;
