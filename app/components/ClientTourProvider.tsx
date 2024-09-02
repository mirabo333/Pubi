"use client";

import { TourProvider } from "@reactour/tour";
import { steps } from "@/app/steps";

export default function ClientTourProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TourProvider
      steps={steps}
      onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
      }}
      scrollSmooth
    >
      {children}
    </TourProvider>
  );
}
