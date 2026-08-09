import type { DevProject, ExperienceEntry } from "@/lib/data";

export type CmsProfilePatch = Partial<{
  name: string;
  role: string;
  location: string;
  status: string;
  focus: string;
}>;

export type CmsLocaleSlice = Partial<{
  profile: CmsProfilePatch;
  aboutParagraphs: string[];
  devProjects: DevProject[];
  experiences: ExperienceEntry[];
}>;

export type CmsStoredV1 = {
  version: 1;
  updatedAt?: string;
  es?: CmsLocaleSlice;
  en?: CmsLocaleSlice;
};
