import { departments, roles } from "@/data/skills";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Department,
  FormErrors,
  OnboardingFormData,
  Role,
} from "@/types/onboarding";

interface Props {
  data: OnboardingFormData;
  errors: FormErrors;
  updateField: <K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K],
  ) => void;
  onRoleChange: (role: Role) => void;
}

export function PersonalInfoStep({
  data,
  errors,
  updateField,
  onRoleChange,
}: Props) {
  return (
    <section className="space-y-6" aria-label="Personal information">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Alex Morgan"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="text-sm text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="alex@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={data.role}
            onValueChange={(value) => onRoleChange(value as Role)}
          >
            <SelectTrigger id="role" aria-invalid={Boolean(errors.role)}>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && (
            <p role="alert" className="text-sm text-red-400">
              {errors.role}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={data.department}
            onValueChange={(value) =>
              updateField("department", value as Department)
            }
          >
            <SelectTrigger
              id="department"
              aria-invalid={Boolean(errors.department)}
            >
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p role="alert" className="text-sm text-red-400">
              {errors.department}
            </p>
          )}
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm text-slate-300">
        <span className="font-medium text-violet-300">Note:</span> Changing your
        role later will reset selected skills only. Avatar and personal details
        stay saved.
      </div>
    </section>
  );
}
