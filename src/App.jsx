import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
// import Big5Inventory from './surveys/Big5Inventory';
// import AnxietyScale from './surveys/AnxietyScale';
// import ChildhoodTraumaScale from './surveys/ChildhoodTraumaScale';
// import RelationshipSurvey from './surveys/RelationshipSurvey';
// import EmotionalIntelligenceScale from './surveys/SchutteEmotionalIntelligence';
// import EmotionRegulationScale from './surveys/EmotionRegulationScale';
// import DifficultiesInEmotionRegulationScale from './surveys/DifficultiesInEmotionRegulationScale';
// import KDDScale from './surveys/KDDScale';
import SurveyNavigator from './components/SurveyNavigator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyNavigator />} />

        {/* <Route path="/big5" element={<Big5Inventory />} />
        <Route path="/anxiety" element={<AnxietyScale />} />
        <Route path="/childhood-trauma" element={<ChildhoodTraumaScale />} />
        <Route path="/relationship" element={<RelationshipSurvey />} />
        <Route path="/emotional-intelligence" element={<EmotionalIntelligenceScale />} />
        <Route path="/emotion-regulation" element={<EmotionRegulationScale />} />
        <Route path="/difficulties-in-emotion" element={<DifficultiesInEmotionRegulationScale />} />
        <Route path="/kdd" element={<KDDScale />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
