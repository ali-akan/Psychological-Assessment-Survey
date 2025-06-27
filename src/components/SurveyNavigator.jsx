import React, { useState } from "react";

// import AnxietyScale from "../surveys/AnxietyScale";
import ChildhoodTraumaScale from "../surveys/ChildhoodTraumaScale";
import SchutteEmotionalIntelligence from "../surveys/SchutteEmotionalIntelligence";
import ThankYouPage from "./ThankYouPage";

import RelationshipSurvey from "../surveys/RelationshipSurvey";
import Big5Inventory from "../surveys/Big5Inventory";
// import ConsentForm from "./ConsentForm";
import StateAnxietyScale from "../surveys/AnxietyScale/StateAnxietyScale";
import TraitAnxietyScale from "../surveys/AnxietyScale/TraitAnxietyScale";
import ParticipantDetails from "./ParticipantDetails";

const surveys = [
  // { id: "consent", component: ConsentForm }, // <== yeniden eklendi
  { id: "participantDetails", component: ParticipantDetails }, // yeni eklendi

  { id: "big5", component: Big5Inventory },
  { id: "anxietyState", component: StateAnxietyScale }, // ✅ BURAYA EKLENDİ
  { id: "anxietyTrait", component: TraitAnxietyScale }, // ✅ BURAYA EKLENDİ

  // { id: "anxiety", component: AnxietyScale },
  { id: "childhoodTrauma", component: ChildhoodTraumaScale },
  { id: "relationship", component: RelationshipSurvey },
  {
    id: "schutteEmotionalIntelligence",
    component: SchutteEmotionalIntelligence,
  },
  { id: "thankyou", component: ThankYouPage }, // YENİ EKLENDİ
];

function SurveyNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CurrentSurvey = surveys[currentIndex].component;
  const goNextSurvey = () => {
    if (currentIndex < surveys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <CurrentSurvey onNext={goNextSurvey} onAccept={goNextSurvey} />
    </div>
  );
}

export default SurveyNavigator;
