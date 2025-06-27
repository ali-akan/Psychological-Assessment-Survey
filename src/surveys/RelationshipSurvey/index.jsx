import React, { useState } from "react";
import questions from "./questions";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./RelationshipScales.module.css";

function RelationshipScales({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswer("relationship", questionId, Number(value));
  };

  // İleri butonu için: kaydeder ve onNext çağırır
  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim   bilgilerini doldurun.");
      return;
    }
    const unanswered = questions.filter(
      ({ id }) => !(id in (answers.relationship || {}))
    );
    if (unanswered.length > 0) {
      window.alert("⚠️ Lütfen tüm kaydırıcıları ayarlayın!");
      return;
    }
    setLoading(true);
    try {
      await saveSurveyResult(
        { name, answers: answers.relationship },
        "relationship"
      );
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
        <h1 className={styles.title}>İlişki Ölçekleri Anketi</h1>
        <p>
          Aşağıda yakın duygusal ilişkilerinizde kendinizi nasıl hissettiğinize
          ilişkin çeşitli ifadeler yer almaktadır. Yakın duygusal ilişkilerden
          kastedilen arkadaşlık, dostluk, romantik ilişkiler ve benzerleridir.
          Lütfen her bir ifadeyi bu tür ilişkilerinizi düşünerek okuyun ve her
          bir ifadenin sizi ne ölçüde tanımladığını aşağıdaki 7 aralıklı ölçek
          üzerinde değerlendiriniz.
        </p>
        <p>
          1 — Beni hiç tanımlamıyor &nbsp;&nbsp; 7 — Tamamıyla beni tanımlıyor
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
        {questions.map(({ id, text }, index) => (
          <div key={id} className={styles.questionBlock}>
            <p className={styles.questionText}>
              {index + 1}. {text}
            </p>

            <div className={styles.sliderWrapper}>
              <input
                type="range"
                name={id}
                min="1"
                max="7"
                step="1"
                value={answers.relationship[id] || 4}
                onChange={(e) => handleAnswerChange(id, e.target.value)}
                className={styles.slider}
              />
              <div className={styles.currentValue}>
                Seçilen Değer: {answers.relationship[id] || 4}
              </div>
              <div className={styles.sliderLabels}>
                {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <span key={val}>{val}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </form>

      <div className={styles.buttonGroup}>
        {/* Artık handleSave kullanılmıyor, onun yerine handleNextClick kullanılıyor */}
        <button type="button" onClick={handleNextClick} disabled={loading}>
          {loading ? "Kaydediliyor..." : "İleri"}
        </button>
        {/* <button type="button" onClick={resetAll} disabled={loading}>
          Sıfırla
        </button> */}
      </div>
    </div>
  );
}

export default RelationshipScales;
