import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

const db = getFirestore(firebaseApp);

function sanitizeName(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

export async function saveSurveyResult(data, surveyKey) {
  if (!data.name) throw new Error("İsim bilgisi yok, kayıt yapılamaz.");

  const docId = sanitizeName(data.name);
  const docRef = doc(db, "surveyResults", docId);

  const updateData = {
    name: data.name,
    timestamp: serverTimestamp(),
  };

  if (surveyKey === "consents") {
    updateData["consents"] = data.consent;
  } else if (surveyKey === "participantDetails") {
    updateData["participantDetails"] = data.details;
  } else {
    updateData[`answers.${surveyKey}`] = data.answers;
  }

  await setDoc(docRef, updateData, { merge: true });
}
