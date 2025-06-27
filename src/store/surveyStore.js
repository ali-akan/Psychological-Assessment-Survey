import { create } from "zustand";

const useSurveyStore = create((set) => ({
  name: "",
  participantDetails: {}, // <-- buraya ekledik

  answers: {
    big5: {},
    anxietyState: {}, // ✅ Durumluk
    anxietyTrait: {}, // ⏳ Bir sonraki adımda bu geliyor
    anxiety: {},
    childhoodTrauma: {},
    relationship: {},
    schutte: {},
  },
  setName: (name) => set({ name }),
  setParticipantDetails: (details) => set({ participantDetails: details }), // <-- ekledik

  setAnswer: (section, questionId, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [section]: {
          ...state.answers[section],
          [questionId]: value,
        },
      },
    })),
  resetAll: () =>
    set({
      name: "",
      participantDetails: {}, // sıfırla

      answers: {
        big5: {},
        anxietyState: {}, // ✅ Durumluk
        anxietyTrait: {}, // ⏳ Bir sonraki adımda bu geliyor
        anxiety: {},
        childhoodTrauma: {},
        relationship: {},
        schutte: {},
      },
    }),
}));

export default useSurveyStore;
