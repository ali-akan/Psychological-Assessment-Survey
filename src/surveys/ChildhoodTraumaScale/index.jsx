import React, { useState } from "react";
import questions from "./questions";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./ChildhoodTraumaScale.module.css";

function ChildhoodTraumaScale({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionId, value) => {
setAnswer("childhoodTrauma", questionId, Number(value));
  };

  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim  bilgilerini doldurun.");
      return;
    }
   const unanswered = questions.filter(
  ({ id }) => !(id in (answers.childhoodTrauma || {}))
);
    if (unanswered.length > 0) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }
    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: answers.childhoodTrauma }, "childhoodTrauma"); // YİNE "childhood"
      alert("Veriler başarıyla kaydedildi.");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(false);
      if (onNext) onNext();
    } catch (e) {
      alert("Bir hata oluştu, tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
       <h1 className={styles.title}>Çocukluk Çağı Travmaları Ölçeği</h1>
        <p>
          Bu sorular çocukluğunuzda ve ilk gençliğinizde (20 yaşından önce)
          başınıza gelmiş olabilecek bazı olaylar hakkındadır. Her bir soru için
          sizin durumunuza uyan rakamı daire içine alarak işaretleyiniz.
        </p>
        <p className={styles.points}>
          1. Hiç Bir Zaman 2. Nadiren 3. Kimi zaman 4. Sık olarak 5. Çok sık
        </p>
      </div>

      {/* <div className={styles.participantInfo}>
        <label>
          İsim:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => useSurveyStore.getState().setName(e.target.value)}
          />
        </label>
      </div> */}

      <form>
        {questions.map(({ id, text, options }, index) => (
          <div key={id} className={styles.questionBlock}>
            <p>
              {index + 1}. {text}
            </p>
            <div className={styles.options}>
              {options.map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name={id}
                    value={opt}
                    checked={answers.childhoodTrauma[id] === opt} // section'a göre kontrol
                    onChange={() => handleAnswerChange(id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>

      <div className={styles.buttonGroup}>
        <button onClick={handleNextClick} disabled={loading}>
          {loading ? "Kaydediliyor..." : "İleri"}
        </button>
      </div>
    </div>
  );
}

export default ChildhoodTraumaScale;
