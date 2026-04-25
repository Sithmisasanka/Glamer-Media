export type Role = "Designer" | "Developer" | "QA Engineer" | "Project Manager";

export type Department = "Engineering" | "Design" | "Delivery" | "Operations";

export interface OnboardingFormData {
  fullName: string;
  email: string;
  role: Role | "";
  department: Department | "";
  avatarFile: File | null;
  avatarPreviewUrl: string;
  skills: string[];
}

export type FormErrors = Partial<
  Record<keyof OnboardingFormData | "avatar" | "general", string>
>;
