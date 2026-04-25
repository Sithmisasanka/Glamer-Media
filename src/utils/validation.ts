import type { FormErrors, OnboardingFormData } from "@/types/onboarding";

const MAX_AVATAR_SIZE = 3 * 1024 * 1024; // 3 MB
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateStepOne(data: OnboardingFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.role) {
    errors.role = "Select a role.";
  }

  if (!data.department) {
    errors.department = "Select a department.";
  }

  return errors;
}

export function validateAvatarFile(file: File | null): string | null {
  if (!file) return "Avatar is required.";

  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return "Only JPG, JPEG, and PNG files are allowed.";
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return "Avatar must be 3 MB or smaller.";
  }

  return null;
}

export function validateStepTwo(data: OnboardingFormData): FormErrors {
  const errors: FormErrors = {};

  const avatarError = validateAvatarFile(data.avatarFile);
  if (avatarError) {
    errors.avatar = avatarError;
  }

  if (data.skills.length < 2) {
    errors.skills = "Select at least 2 skills.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
