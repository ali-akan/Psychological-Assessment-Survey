import React, { useState } from "react";
import questions from "./questions";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./SchutteEmotionalIntelligence.module.css";

function SchutteEmotionalIntelligence({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswer("schutte", questionId, Number(value));
  };

  
  
  // Yeni: Kaydet + İleri fonksiyonu
  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim ve TC bilgilerini doldurun.");
      return;
    }

      const unanswered = questions.filter(({ id }) => !(id in (answers.schutte || {})));
if (unanswered.length > 0) {
    alert("Lütfen tüm soruları cevaplayınız.");
    return;
  }
    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: answers.schutte }, "schutte");
      alert("Veriler başarıyla kaydedildi.");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(false);
      if (onNext) onNext(); // SurveyNavigator içindeki fonksiyonu çağırır
    } catch (error) {
      alert("Bir hata oluştu, tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
            <div className={styles.description}>
    <h1 className={styles.title}>Gözden Geçirilmiş Schutte Duygusal Zeka Ölçeği</h1>
      <p>
        Aşağıda çeşitli durumlara ilişkin ifadeler bulunmaktadır. Lütfen ifadeyi
        okuduktan sonra size uyma derecesini sağ taraftaki kutucuklardan birini
        işaretleyerek belirtiniz.
      </p>
      <p>
        1: Kesinlikle Katılmıyorum  2: Katılmıyorum  3: Fikrim Yok  4:
        Katılıyorum  5: Kesinlikle Katılıyorum
      </p>
</div>
{/* 
      <div className={styles.participantInfo}>
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
                    checked={answers.schutte?.[id] === opt}
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

export default SchutteEmotionalIntelligence;
