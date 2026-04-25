import { useRef } from "react";
import { Check, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { roleSkills } from "@/data/skills";
import type { FormErrors, OnboardingFormData } from "@/types/onboarding";
import { validateAvatarFile } from "@/utils/validation";
import { cn } from "@/lib/utils";

interface Props {
  data: OnboardingFormData;
  errors: FormErrors;
  onAvatarChange: (file: File, previewUrl: string) => void;
  onAvatarError: (error: string) => void;
  toggleSkill: (skill: string) => void;
}

export function SkillsAvatarStep({
  data,
  errors,
  onAvatarChange,
  onAvatarError,
  toggleSkill,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const skills = data.role ? roleSkills[data.role] : [];

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;

    const error = validateAvatarFile(file);
    if (error) {
      onAvatarError(error);
      // Reset input so user can re-select
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onAvatarChange(file, previewUrl);
  };

  const clearAllSkills = () => {
    data.skills.forEach((skill) => toggleSkill(skill));
  };

  return (
    <section className="space-y-8" aria-label="Skills and avatar">
      {/* ---- Avatar upload ---- */}
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* Preview */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div
            className={cn(
              "flex size-36 items-center justify-center overflow-hidden rounded-full border-2 shadow-2xl transition-all duration-300",
              data.avatarPreviewUrl
                ? "border-violet-400/40 shadow-violet-950/40"
                : "border-white/10 bg-slate-900 shadow-violet-950/20"
            )}
          >
            {data.avatarPreviewUrl ? (
              <img
                src={data.avatarPreviewUrl}
                alt="Selected avatar preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Upload
                className="size-10 text-slate-500"
                aria-hidden="true"
              />
            )}
          </div>
          {data.avatarFile && (
            <p className="max-w-44 truncate text-xs text-slate-400">
              {data.avatarFile.name}
            </p>
          )}
        </div>

        {/* Upload area */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Avatar upload</h3>
          <p className="text-sm text-slate-400">
            Upload a professional profile image. JPG, JPEG, or PNG only. Maximum
            size 3 MB.
          </p>

          <label
            htmlFor="avatar"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-400/30 bg-white/[0.03] px-6 py-8 text-center transition-all duration-200 hover:border-violet-300 hover:bg-violet-400/10 focus-within:ring-2 focus-within:ring-ring"
          >
            <Upload
              className="mb-3 size-7 text-violet-300"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-white">
              Choose avatar image
            </span>
            <span className="mt-1 text-xs text-slate-400">
              Validate first, preview only when valid
            </span>
            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="sr-only"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
              aria-describedby={errors.avatar ? "avatar-error" : undefined}
            />
          </label>

          {errors.avatar && (
            <p
              id="avatar-error"
              role="alert"
              className="text-sm text-red-400"
            >
              {errors.avatar}
            </p>
          )}
        </div>
      </div>

      {/* ---- Skill chips ---- */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-white">
            Role-based skills
          </h3>
          <p className="text-sm text-slate-400">
            Select at least 2 skills for the selected role:{" "}
            <span className="font-medium text-violet-300">
              {data.role || "No role selected"}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const selected = data.skills.includes(skill);
            return (
              <Button
                key={skill}
                type="button"
                variant={selected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSkill(skill)}
                className={cn(
                  "rounded-full",
                  selected &&
                    "bg-violet-500 text-white shadow-lg shadow-violet-900/30 hover:bg-violet-600",
                  !selected && "border-white/10 hover:border-violet-400/40"
                )}
                aria-pressed={selected}
              >
                {selected && (
                  <Check className="mr-1.5 size-3.5" aria-hidden="true" />
                )}
                {skill}
              </Button>
            );
          })}
        </div>

        {errors.skills && (
          <p role="alert" className="text-sm text-red-400">
            {errors.skills}
          </p>
        )}

        {data.skills.length > 0 && (
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-300">
            <Check className="size-4 shrink-0 text-emerald-400" />
            {data.skills.length} skill
            {data.skills.length > 1 ? "s" : ""} selected
            <button
              type="button"
              className="ml-auto inline-flex cursor-pointer items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white"
              onClick={clearAllSkills}
            >
              <X className="size-3" />
              Clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
