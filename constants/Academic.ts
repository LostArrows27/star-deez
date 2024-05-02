import { AcademicStatus } from "@/types/supabase-util-types";

export const academicStatus: {
  value: AcademicStatus;
  label: AcademicStatus;
}[] = [
  {
    value: "Pre-highschool",
    label: "Pre-highschool",
  },
  {
    value: "Highschool",
    label: "Highschool",
  },
  {
    value: "Pre-university",
    label: "Pre-university",
  },
  {
    value: "University/college",
    label: "University/college",
  },
  {
    value: "Graduate/post-doc",
    label: "Graduate/post-doc",
  },
  {
    value: "I'm not a student",
    label: "I'm not a student",
  },
];
