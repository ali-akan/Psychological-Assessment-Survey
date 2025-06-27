import React, { useState } from "react";
import styles from "./Big5Inventory.module.css";
import Description from "../../components/Description";
// import ParticipantInfo from "../../components/ParticipantInfo";
import QuestionList from "../../components/QuestionList";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import questions from "../../data/questions";

function Big5Inventory({ onNext }) {
  const { name,  answers } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  

  const handleNextClick = async () => {
    console.log("handleNextClick tetiklendi");

    if (!name) {
      alert("Lütfen isminizi doğru giriniz.");
      return;
    }

    const unanswered = questions.filter(
      ({ id }) => !(id in (answers.big5 || {}))
    );
    if (unanswered.length > 0) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: answers.big5 }, "big5");
      alert("Veriler başarıyla kaydedildi.");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(false);

      if (onNext) onNext();
    } catch (error) {
      console.error("handleNextClick error:", error);

      alert("Bir hata oluştu, tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Beş Faktör Kişilik Envanteri (BFI)</h1>
      <Description />
      {/* <ParticipantInfo /> */}
      <QuestionList sectionKey="big5" />{" "}
      <div className={styles.buttonGroup}>
        <button onClick={handleNextClick} disabled={loading}>
          {loading ? "Kaydediliyor..." : "İleri"}
        </button>
      </div>
    </div>
  );
}

export default Big5Inventory;
