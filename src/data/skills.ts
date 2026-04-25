import type { Department, Role } from "@/types/onboarding";

export const roles: Role[] = [
  "Designer",
  "Developer",
  "QA Engineer",
  "Project Manager",
];

export const departments: Department[] = [
  "Engineering",
  "Design",
  "Delivery",
  "Operations",
];

export const roleSkills: Record<Role, string[]> = {
  Designer: [
    "Figma",
    "Prototyping",
    "User Research",
    "Illustration",
    "Motion",
    "Design Systems",
    "Accessibility",
  ],
  Developer: [
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "REST APIs",
    "Testing",
    "Docker",
  ],
  "QA Engineer": [
    "Manual Testing",
    "Automation",
    "Playwright",
    "Test Planning",
    "API Testing",
    "Bug Reporting",
  ],
  "Project Manager": [
    "Agile",
    "Scrum",
    "Risk Management",
    "Stakeholder Comms",
    "Estimation",
    "Jira",
    "Budgeting",
  ],
};
