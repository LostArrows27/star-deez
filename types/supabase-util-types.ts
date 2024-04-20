import { Database } from "./supabase-types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Gender = Database["public"]["Enums"]["gender"];

export type Unit = Database["public"]["Tables"]["unit"]["Row"];
