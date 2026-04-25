import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/* ------------------------------------------------------------------ */
/*  Step indicator dots                                                */
/* ------------------------------------------------------------------ */

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const labels = ["Personal Info", "Skills & Avatar", "Review"];

  return (
    <div className="flex items-center justify-center gap-1" role="list" aria-label="Wizard progress">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <React.Fragment key={step}>
            <div
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300",
                  isCompleted &&
                    "border-emerald-400 bg-emerald-400/15 text-emerald-300",
                  isCurrent &&
                    "border-primary bg-primary/15 text-primary shadow-lg shadow-primary/20",
                  !isCompleted &&
                    !isCurrent &&
                    "border-white/10 bg-white/[0.03] text-white/30"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  step
                )}
              </div>
              <span
                className={cn(
                  "hidden text-[11px] font-medium sm:block",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[i] ?? `Step ${step}`}
              </span>
            </div>

            {step < totalSteps && (
              <div
                className={cn(
                  "mb-5 hidden h-0.5 w-10 rounded-full transition-colors duration-300 sm:block",
                  step < currentStep ? "bg-emerald-400/50" : "bg-white/10"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MultiStepForm                                                      */
/* ------------------------------------------------------------------ */

interface MultiStepFormProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  nextButtonText?: string;
  backButtonText?: string;
  onNext: () => void;
  onBack: () => void;
  children: React.ReactNode;
  className?: string;
  footerContent?: React.ReactNode;
}

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export function MultiStepForm({
  currentStep,
  totalSteps,
  title,
  description,
  nextButtonText = "Continue",
  backButtonText = "Back",
  onNext,
  onBack,
  children,
  className,
  footerContent,
}: MultiStepFormProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className={cn("w-full max-w-3xl", className)}>
      {/* progress bar */}
      <Progress value={progress} className="rounded-t-2xl rounded-b-none h-1.5" />

      <CardHeader className="space-y-5 pb-2">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardHeader>

      {/* step content with animation */}
      <CardContent className="px-6 pb-2 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      {/* footer */}
      <CardFooter className="flex-col gap-4 px-6 pb-6 pt-4">
        <div className="flex w-full items-center justify-between">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {backButtonText}
            </Button>
          ) : (
            <div />
          )}

          <Button type="button" onClick={onNext} className="gap-2">
            {nextButtonText}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {footerContent && (
          <div className="w-full border-t border-white/5 pt-3">{footerContent}</div>
        )}
      </CardFooter>
    </Card>
  );
}
