import React, { useState } from "react";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./StateAnxietyScale.module.css";
import stateQuestions from "./stateQuestions"; // 1–20 arası sorular

function StateAnxietyScale({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const sectionKey = "anxietyState";

  const handleAnswerChange = (questionId, value) => {
    setAnswer(sectionKey, questionId, Number(value));
  };

  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim bilgilerinizi giriniz.");
      return;
    }

    const currentAnswers = answers[sectionKey] || {};
    const unanswered = stateQuestions.filter(({ id }) => !(id in currentAnswers));
    if (unanswered.length > 0) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: currentAnswers }, sectionKey);
      alert("Durumluk kaygı verileri kaydedildi.");
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
      <h2 className={styles.title}>Durumluk Kaygı Ölçeği</h2>

      <p className={styles.description}>
        Aşağıda kişilerin kendilerine ait duygularını anlatmada kullandıkları bazı ifadeler verilmiştir.
        Lütfen şu anda nasıl hissettiğinizi en iyi anlatan seçeneği işaretleyiniz.
      </p>

      <p className={styles.points}>
        1: Hiç &nbsp; 2: Biraz &nbsp; 3: Çok &nbsp; 4: Tamamiyle
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
            {stateQuestions.map(({ id, text, options }, index) => (
              <tr key={id}>
                <td>{index + 1}. {text}</td>
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

export default StateAnxietyScale;
