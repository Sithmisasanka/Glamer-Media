import { AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

import { MultiStepForm } from "@/components/ui/multi-step-form";
import { PersonalInfoStep } from "@/components/wizard/PersonalInfoStep";
import { ReviewStep } from "@/components/wizard/ReviewStep";
import { SkillsAvatarStep } from "@/components/wizard/SkillsAvatarStep";
import { SuccessScreen } from "@/components/wizard/SuccessScreen";
import type { FormErrors, OnboardingFormData, Role } from "@/types/onboarding";
import {
  hasErrors,
  validateStepOne,
  validateStepTwo,
} from "@/utils/validation";

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialFormData: OnboardingFormData = {
  fullName: "",
  email: "",
  role: "",
  department: "",
  avatarFile: null,
  avatarPreviewUrl: "",
  skills: [],
};

/* ------------------------------------------------------------------ */
/*  Step copy                                                          */
/* ------------------------------------------------------------------ */

const stepCopy = {
  1: {
    title: "Personal profile",
    description: "Start with the new team member's core information.",
    next: "Continue",
  },
  2: {
    title: "Skills & avatar",
    description: "Upload a valid avatar and select role-specific skills.",
    next: "Review details",
  },
  3: {
    title: "Review submission",
    description: "Check every detail before completing onboarding.",
    next: "Submit onboarding",
  },
};

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  /* -- field updater ------------------------------------------------ */

  const updateField = <K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      delete next.general;
      return next;
    });
  };

  /* -- role change: clears skills only ------------------------------ */

  const handleRoleChange = (role: Role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      skills: [], // clear skills — new role has different skill list
      // avatar + name + email + department are preserved
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.role;
      delete next.skills;
      return next;
    });
  };

  /* -- avatar upload ------------------------------------------------ */

  const handleAvatarChange = (file: File, previewUrl: string) => {
    // Revoke old object URL to prevent memory leaks
    if (formData.avatarPreviewUrl) {
      URL.revokeObjectURL(formData.avatarPreviewUrl);
    }
    setFormData((prev) => ({
      ...prev,
      avatarFile: file,
      avatarPreviewUrl: previewUrl,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.avatar;
      return next;
    });
  };

  const handleAvatarError = (error: string) => {
    setErrors((prev) => ({ ...prev, avatar: error }));
  };

  /* -- skill toggle ------------------------------------------------- */

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const isSelected = prev.skills.includes(skill);
      return {
        ...prev,
        skills: isSelected
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.skills;
      return next;
    });
  };

  /* -- navigation --------------------------------------------------- */

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const stepErrors = validateStepOne(formData);
      setErrors(stepErrors);
      if (!hasErrors(stepErrors)) setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const stepErrors = validateStepTwo(formData);
      setErrors(stepErrors);
      if (!hasErrors(stepErrors)) setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      setIsSubmitted(true);
    }
  };

  /* -- reset (back to home) ----------------------------------------- */

  const handleReset = () => {
    if (formData.avatarPreviewUrl) {
      URL.revokeObjectURL(formData.avatarPreviewUrl);
    }
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  /* -- render ------------------------------------------------------- */

  const copy = stepCopy[currentStep as keyof typeof stepCopy];

  return (
    <main className="premium-grid flex min-h-screen items-center justify-center px-4 py-10">
      {/* Brand mark */}
      <div className="absolute left-6 top-6 hidden items-center gap-2 text-sm text-white/70 md:flex">
        <div className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
          <Sparkles className="size-4 text-violet-300" />
        </div>
        <span className="font-medium">Glamer Onboarding</span>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <SuccessScreen key="success" fullName={formData.fullName} onReset={handleReset} />
        ) : (
          <MultiStepForm
            key="wizard"
            currentStep={currentStep}
            totalSteps={3}
            title={copy.title}
            description={copy.description}
            nextButtonText={copy.next}
            backButtonText="Back"
            onBack={handleBack}
            onNext={handleNext}
            className="w-full border-white/10 bg-slate-950/80 text-white shadow-2xl shadow-violet-950/40 backdrop-blur-xl md:w-[760px]"
            footerContent={
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>WCAG-friendly inline validation</span>
              </div>
            }
          >
            {currentStep === 1 && (
              <PersonalInfoStep
                data={formData}
                errors={errors}
                updateField={updateField}
                onRoleChange={handleRoleChange}
              />
            )}

            {currentStep === 2 && (
              <SkillsAvatarStep
                data={formData}
                errors={errors}
                onAvatarChange={handleAvatarChange}
                onAvatarError={handleAvatarError}
                toggleSkill={toggleSkill}
              />
            )}

            {currentStep === 3 && <ReviewStep data={formData} />}
          </MultiStepForm>
        )}
      </AnimatePresence>
    </main>
  );
}
