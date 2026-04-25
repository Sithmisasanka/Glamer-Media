import { motion } from "framer-motion";
import { CheckCircle2, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  fullName: string;
  onReset?: () => void;
}

export function SuccessScreen({ fullName, onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-xl"
    >
      <Card className="border-white/10 bg-slate-950/85 text-center text-white shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
        <CardContent className="space-y-6 p-10">
          {/* Check icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto flex size-20 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10"
          >
            <CheckCircle2 className="size-10 text-emerald-300" />
          </motion.div>

          {/* Content */}
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-200">
              <Sparkles className="size-3" />
              Completed
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Onboarding completed successfully
            </h1>
            <p className="mt-3 text-slate-400">
              <span className="font-medium text-white">{fullName}</span> has
              been prepared for review. This is the final success state.
            </p>
          </div>

          {/* Info box */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            Submission is complete. You can start a new onboarding below.
          </div>

          {/* Back to home / Start new */}
          {onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              className="mx-auto gap-2 border-white/15 hover:border-violet-400/40"
            >
              <Home className="size-4" />
              Start New Onboarding
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
