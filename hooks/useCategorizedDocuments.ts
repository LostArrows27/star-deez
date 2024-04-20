import { CategorizedDocument } from "@/types/home/tracking-type";
import { DocumentFull } from "@/types/supabase-util-types";
import { create } from "zustand";

export type CategorizedDocuments = {
    categorizedDocument: CategorizedDocument[];
    colors: string[];
    setColors: (colors: string[]) => void;
    setCategorizeDocument: (categorizedDocument: CategorizedDocument[]) => void;
    selectedDocument: DocumentFull | null;
    setSelectedDocument: (selectedDocument: DocumentFull | null) => void;
  
};

const initialValue = {
    colors: [],
    categorizedDocument: [],
    selectedDocument: null,
    
};

export const useCategorizedDocuments = create<CategorizedDocuments>((set) => ({
  ...initialValue,
    setColors: (colors) => {
        set({ colors });
    },
    setCategorizeDocument: (categorizedDocument) => {
        set({ categorizedDocument });
    },
    setSelectedDocument: (selectedDocument) => {
        set({ selectedDocument });
    },

 
}));
