import { Category, DocumentFull } from "../supabase-util-types";

export type CategorizedDocument = Category & {
  documents: DocumentFull[];
};
