import React, { useState } from "react";
import styles from "./ConsentForm.module.css";
import { saveSurveyResult } from "../firebaseService";
import useSurveyStore from "../store/surveyStore";
function ConsentForm({ onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const { name, setName } = useSurveyStore();

  const handleContinue = async () => {
    if (!accepted) {
      alert("Devam edebilmek için onam kutucuğunu işaretlemelisiniz.");
      return;
    }

    if (!name || name.trim() === "") {
      alert("Lütfen isminizi giriniz.");
      return;
    }

    try {
      // Burada sadece gerekli verileri Firebase'e gönderiyoruz:
      await saveSurveyResult(
        {
          name,
          consent: {
            accepted,
            timestamp: new Date().toLocaleString("sv-SE", {
              timeZone: "Europe/Istanbul",
            }), // Türkiye saati
          },
        },
        "consents"
      );
      onAccept();
    } catch (error) {
      console.error("Consent save error:", error);
      alert("Onam kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Katılım Onam Formu</h1>

      <p>
        <strong>Araştırma Başlığı:</strong> Kişilerarası Duygu Düzenlemenin
        Nöral Dinamikleri
      </p>
      <p>
        <strong>Araştırmacı:</strong> Hüseyin Sığırcı, ODTÜ Bilişsel Bilimler
        Bölümü
      </p>
      <p>
        <strong>İletişim:</strong> sigirci@metu.edu.tr
      </p>

      <h3>Çalışmanın Amacı:</h3>
      <p>
        Bu çalışma, bireyler arası duygu düzenlemenin sinirsel temellerini
        anlamayı ve insanların sosyal etkileşimlerde duygusal durumlarını nasıl
        düzenlediğini incelemeyi amaçlamaktadır. EEG ve fNIRS gibi beyin
        görüntüleme teknikleri kullanılarak, katılımcıların beyin aktiviteleri
        kaydedilecek ve duygusal görsellere verdikleri tepkiler analiz
        edilecektir.
      </p>

      <h3>Katılım Koşulları:</h3>
      <ul>
        <li>Araştırmaya katılmak tamamen gönüllülük esasına dayalıdır.</li>
        <li>
          Katılımcılar, deney sırasında EEG ve fNIRS cihazları takacak ve
          kendilerine sunulan duygusal görüntüler üzerinde belirtilen
          talimatlara uygun olarak tepki verecektir.
        </li>
        <li>Deney süreci yaklaşık 1-2 saat sürecektir.</li>
        <li>
          Katılımcılardan herhangi bir fiziksel veya zihinsel zorluk
          yaşamayacağı bir ortam sağlanacaktır.
        </li>
      </ul>

      <h3>Gizlilik ve Veri Koruma:</h3>
      <ul>
        <li>
          Tüm veriler anonimleştirilecek ve sadece bilimsel araştırmalar için
          kullanılacaktır.
        </li>
        <li>
          Kişisel bilgileriniz, yasal zorunluluk olmadıkça üçüncü taraflarla
          paylaşılmayacaktır.
        </li>
        <li>
          Araştırma bulguları sadece toplu veriler şeklinde raporlanacaktır.
        </li>
      </ul>

      <h3>Riskler:</h3>
      <ul>
        <li>
          Bu çalışma, fiziksel veya psikolojik zarar riski taşımamaktadır.
        </li>
        <li>
          Ancak, herhangi bir rahatsızlık hissetmeniz durumunda deney
          durdurulacak ve gerekli destek sağlanacaktır.
        </li>
      </ul>

      <h3>Katılım Hakkında:</h3>
      <ul>
        <li>
          Katılım tamamen gönüllülük esaslıdır ve herhangi bir gerekçe
          göstermeksizin çalışmadan ayrılma hakkına sahipsiniz.
        </li>
      </ul>

      <p>
        <strong>Onay:</strong> İşbu formu imzalayarak, araştırmaya katılmayı
        kabul ettiğimi, çalışmanın amacı, yöntemleri, potansiyel riskleri
        konusunda bilgilendirildiğimi beyan ederim.
      </p>
      <label>
        İsim:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        Yukarıdaki onam metnini okudum ve kabul ediyorum.
      </label>

      <div className={styles.buttonContainer}>
        <button onClick={handleContinue}>Devam Et</button>
      </div>
    </div>
  );
}

export default ConsentForm;
