import React, { useState } from "react";
import questions from "./questions";
import useSurveyStore from "../../store/surveyStore";
import { saveSurveyResult } from "../../firebaseService";
import styles from "./AnxietyScale.module.css";

function AnxietyScale({ onNext }) {
  const { name, answers, setAnswer } = useSurveyStore();
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswer("anxiety", questionId, Number(value));
  };

  const handleNextClick = async () => {
    if (!name) {
      alert("Lütfen isim bilgilerini doldurun.");
      return;
    }

    const unanswered = questions.filter(
      ({ id }) => !(id in (answers.anxiety || {}))
    );
    if (unanswered.length > 0) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    setLoading(true);
    try {
      await saveSurveyResult({ name, answers: answers.anxiety }, "anxiety");
      alert("Veriler başarıyla kaydedildi.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      if (onNext) onNext();
    } catch (error) {
      alert("Bir hata oluştu, tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.infoBox}>
  <h2>Anket Hakkında Bilgilendirme</h2>
  <p>
    Bu ölçek, kişilerin <strong>şu anki (durumluk)</strong> ve <strong>genel olarak (sürekli)</strong> kaygı düzeylerini ölçmek için geliştirilmiştir.
  </p>
  <p>
    Her bir ifade için size en uygun olan seçeneği işaretleyiniz. Doğru ya da yanlış cevap yoktur. 
    Lütfen sezgisel ve hızlı cevaplayınız.
  </p>

  <ul>
    <li><strong>Durumluk Kaygı Soruları (1–20):</strong> Şu anda nasıl hissettiğinizi ölçer.</li>
    <li><strong>Sürekli Kaygı Soruları (21–40):</strong> Genel kaygı eğiliminizi ölçer.</li>
  </ul>

  <p>
    Cevap Seçenekleri:
    <br />
    <em>1 - Hiç</em>, <em>2 - Biraz</em>, <em>3 - Çok</em>, <em>4 - Tamamiyle</em>
    <br />
    (21. sorudan itibaren: <em>1 - Hemen hemen hiçbir zaman</em>, ... <em>4 - Hemen her zaman</em>)
  </p>

  <p>
    <strong>Not:</strong> Bazı sorular olumlu ifadeler içerdiğinden, puanlamada tersine çevrilir. Ancak sizin için
    bu teknik puanlama işlemleri otomatik yapılacaktır.
  </p>
</div>
        <h1 className={styles.title}>Durumluk ve Sürekli Kaygı Ölçeği</h1>
        <h3>YÖNERGE:</h3>
        <p>
          Aşağıda kişilerin kendilerine ait duygularını anlatmada kullandıkları
          bir takım ifadeler verilmiştir. Her ifadeyi okuyun, sonra da o anda
          nasıl hissettiğinizi ifadelerin sağ tarafındaki parantezlerden uygun
          olanını işaretlemek suretiyle belirtin.
        </p>
      </div>

      <table className={styles.questionTable}>
        <thead>
          <tr>
            <th>Soru</th>
            {questions[0].options.map((opt) => (
              <th key={opt}>{opt}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map(({ id, text, options }, index) => (
            <tr key={id}>
              <td>{index + 1}. {text}</td>
              {options.map((opt) => (
                <td key={opt}>
                  <input
                    type="radio"
                    name={id}
                    value={opt}
                    checked={answers.anxiety[id] === opt}
                    onChange={() => handleAnswerChange(id, opt)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.buttonGroup}>
        <button onClick={handleNextClick} disabled={loading}>
          {loading ? "Kaydediliyor..." : "İleri"}
        </button>
      </div>
    </div>
  );
}

export default AnxietyScale;
