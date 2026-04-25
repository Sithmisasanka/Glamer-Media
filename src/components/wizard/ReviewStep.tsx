import {
  Mail,
  UserRound,
  BriefcaseBusiness,
  Building2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OnboardingFormData } from "@/types/onboarding";

interface Props {
  data: OnboardingFormData;
}

export function ReviewStep({ data }: Props) {
  return (
    <section className="space-y-6" aria-label="Review submission">
      {/* Personal info card */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardContent className="grid gap-6 p-5 md:grid-cols-[140px_1fr]">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="size-28 overflow-hidden rounded-full border-2 border-violet-300/30 shadow-xl shadow-violet-950/30">
              <img
                src={data.avatarPreviewUrl}
                alt={`${data.fullName} avatar preview`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
                New team member
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {data.fullName}
              </h3>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-2">
              <SummaryItem icon={<Mail />} label="Email" value={data.email} />
              <SummaryItem
                icon={<BriefcaseBusiness />}
                label="Role"
                value={data.role}
              />
              <SummaryItem
                icon={<Building2 />}
                label="Department"
                value={data.department}
              />
              <SummaryItem
                icon={<UserRound />}
                label="Profile"
                value="Avatar uploaded"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills card */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-300" />
            <h3 className="font-semibold text-white">Selected skills</h3>
          </div>
          <Separator className="my-4 bg-white/10" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help text */}
      <p className="text-sm text-slate-400">
        Review the information carefully. Use{" "}
        <span className="font-medium text-slate-200">Back</span> to edit before
        submitting.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Summary item                                                       */
/* ------------------------------------------------------------------ */

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
        <span className="[&_svg]:size-3.5">{icon}</span>
        {label}
      </div>
      <p className="text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}
