import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TripState {
  prompt: string;
  currentStep: number;
  answers: Record<number, number>;
  tripData: any | null;
  setPrompt: (prompt: string) => void;
  setCurrentStep: (step: number) => void;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  setTripData: (data: any) => void;
  reset: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      prompt: "",
      currentStep: 0,
      answers: {},
      tripData: null,
      setPrompt: (prompt) => set({ prompt }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setAnswer: (questionIndex, answerIndex) =>
        set((state) => ({
          answers: { ...state.answers, [questionIndex]: answerIndex },
        })),
      setTripData: (data) => set({ tripData: data }),
      reset: () => set({ prompt: "", currentStep: 0, answers: {}, tripData: null }),
    }),
    {
      name: "trip-storage",
    }
  )
);
