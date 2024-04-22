import { Database } from "./supabase-types";

export type StudyingStatus = Database["public"]["Enums"]["document_status"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Gender = Database["public"]["Enums"]["gender"];

export type Unit = Database["public"]["Tables"]["unit"]["Row"];

export type Category = Database["public"]["Tables"]["category"]["Row"];

export type Document = Database["public"]["Tables"]["document"]["Row"];

export type DocumentFull = Document & {
  category: Category;
  unit: Unit;
};


export type StudyRecord = Database["public"]["Tables"]["study_records"]["Row"] & {
  likes: {count:number}[];
  profiles: Profile;
  document: DocumentFull;
};
