import React, { useState } from "react";
import useSurveyStore from "../store/surveyStore";
import styles from "./ParticipantDetails.module.css";
import { saveSurveyResult } from "../firebaseService";

function ParticipantDetails({ onNext }) {
  const { name, setParticipantDetails } = useSurveyStore(); // 🔹 name eklendi
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    otherGender: "",
    age: "",
    education: "",
    otherEducation: "",
    department: "",
    hasPsychologicalDiagnosis: "",
    diagnosis: "",
    diagnosisYear: "",
    receivingTreatment: "",
    treatmentType: [],
    otherTreatment: "",
    pastDiagnosis: "",
    pastDiagnosisDetails: "",
    hasNeurologicalIssue: "",
    neurologicalDetails: "",
    takesMedication: "",
    medicationDetails: "",
    sleepHours: "",
    feelsFatigue: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "treatmentType") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.treatmentType, value]
          : prev.treatmentType.filter((item) => item !== value);
        return { ...prev, treatmentType: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setParticipantDetails(formData); // store’a da yaz

    // 🔹 Firestore’a da yaz
    setLoading(true);
    try {
      await saveSurveyResult({ name, details: formData }, "participantDetails");
      alert("Katılımcı bilgileri kaydedildi.");
      setLoading(false);
      if (onNext) onNext();
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu, lütfen tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Katılımcı Bilgileri</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>1. Kişisel Bilgiler</legend>
          <label>
            Cinsiyetiniz:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              <option value="Kadın">Kadın</option>
              <option value="Erkek">Erkek</option>
              <option value="Diğer">Diğer</option>
            </select>
          </label>
          {formData.gender === "Diğer" && (
            <input
              type="text"
              name="otherGender"
              value={formData.otherGender}
              onChange={handleChange}
              placeholder="Belirtiniz"
            />
          )}

          <label>
            Yaşınız:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>2. Eğitim Bilgileri</legend>
          <label>
            En yüksek tamamladığınız eğitim düzeyi:
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz</option>
              <option value="İlkokul">İlkokul</option>
              <option value="Ortaokul">Ortaokul</option>
              <option value="Lise">Lise</option>
              <option value="Üniversite">Üniversite (Lisans)</option>
              <option value="Yüksek Lisans">Yüksek Lisans</option>
              <option value="Doktora">Doktora</option>
              <option value="Diğer">Diğer</option>
            </select>
          </label>
          {formData.education === "Diğer" && (
            <input
              type="text"
              name="otherEducation"
              value={formData.otherEducation}
              onChange={handleChange}
              placeholder="Belirtiniz"
            />
          )}
          <label>
            Mezun olunan/okunan bölüm:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>3. Sağlık ve Psikolojik Durum</legend>

          <label>
            Tanılı psikolojik rahatsızlığınız var mı?
            <select
              name="hasPsychologicalDiagnosis"
              value={formData.hasPsychologicalDiagnosis}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>
          {formData.hasPsychologicalDiagnosis === "Evet" && (
            <>
              <label>
                Tanı:
                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                />
              </label>
              <label>
                Tanı yılı:
                <input
                  type="number"
                  name="diagnosisYear"
                  value={formData.diagnosisYear}
                  onChange={handleChange}
                />
              </label>

              <label>
                Tedavi görüyor musunuz?
                <select
                  name="receivingTreatment"
                  value={formData.receivingTreatment}
                  onChange={handleChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
              </label>
              {formData.receivingTreatment === "Evet" && (
                <>
                  <label>
                    Tedavi türü:
                    <div className={styles.checkboxGroup}>
                      <label>
                        <input
                          type="checkbox"
                          name="treatmentType"
                          value="Psikoterapi"
                          checked={formData.treatmentType.includes(
                            "Psikoterapi"
                          )}
                          onChange={handleChange}
                        />
                        Psikoterapi
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="treatmentType"
                          value="İlaç"
                          checked={formData.treatmentType.includes("İlaç")}
                          onChange={handleChange}
                        />
                        Psikiyatri / İlaç
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="treatmentType"
                          value="Her ikisi"
                          checked={formData.treatmentType.includes("Her ikisi")}
                          onChange={handleChange}
                        />
                        Her ikisi
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="treatmentType"
                          value="Diğer"
                          checked={formData.treatmentType.includes("Diğer")}
                          onChange={handleChange}
                        />
                        Diğer
                      </label>
                      {formData.treatmentType.includes("Diğer") && (
                        <input
                          type="text"
                          name="otherTreatment"
                          value={formData.otherTreatment}
                          onChange={handleChange}
                          placeholder="Belirtiniz"
                        />
                      )}
                    </div>
                  </label>
                </>
              )}
            </>
          )}

          <label>
            Geçmişte psikolojik rahatsızlığınız oldu mu?
            <select
              name="pastDiagnosis"
              value={formData.pastDiagnosis}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>
          {formData.pastDiagnosis === "Evet" && (
            <input
              type="text"
              name="pastDiagnosisDetails"
              value={formData.pastDiagnosisDetails}
              onChange={handleChange}
              placeholder="Açıklayınız"
            />
          )}

          <label>
            Nörolojik bir rahatsızlığınız var mı?
            <select
              name="hasNeurologicalIssue"
              value={formData.hasNeurologicalIssue}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>
          {formData.hasNeurologicalIssue === "Evet" && (
            <input
              type="text"
              name="neurologicalDetails"
              value={formData.neurologicalDetails}
              onChange={handleChange}
              placeholder="Açıklayınız"
            />
          )}

          <label>
            Düzenli ilaç kullanıyor musunuz?
            <select
              name="takesMedication"
              value={formData.takesMedication}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>
          {formData.takesMedication === "Evet" && (
            <input
              type="text"
              name="medicationDetails"
              value={formData.medicationDetails}
              onChange={handleChange}
              placeholder="İlaç adı / amacı"
            />
          )}

          <label>
            Son geceki uyku süreniz (saat):
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              min="0"
              max="24"
              required
            />
          </label>
          {formData.sleepHours > 24 && (
            <p style={{ color: "red" }}>
              Lütfen 0 ile 24 arasında bir değer giriniz.
            </p>
          )}

          <label>
            Şu anda yorgunluk / dikkat dağınıklığı hissediyor musunuz?
            <select
              name="feelsFatigue"
              value={formData.feelsFatigue}
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>
        </fieldset>

        <div className={styles.buttonWrapper}>
          <button type="submit" disabled={loading}>
            {loading ? "Kaydediliyor..." : "İleri"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ParticipantDetails;
