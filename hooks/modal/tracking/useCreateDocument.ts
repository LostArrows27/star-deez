import { create } from "zustand";

export type Status = "learning" | "standby" | "finished";

export type UnitRow = {
  id: string;
  name: string;
};

export type CategoryType = UnitRow;

type DocumentType = {
  status?: Status;
  unit?: UnitRow;
  title: string;
  category?: CategoryType;
  description: string;
  editDocumentID ?: string;
  setStatus: (status: Status) => void;
  setUnit: (unit: UnitRow) => void;
  setCategory: (category: CategoryType) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setEditDocumentID: (id: string | undefined) => void;
  reset: () => void;
};

export const useCreateDocument = create<DocumentType>((set) => ({
  title: "",
  description: "",
  editDocumentID: "",
  setStatus: (status) => set({ status }),
  setUnit: (unit) => set({ unit }),
  setEditDocumentID: (id) => set({ editDocumentID: id }),
  setCategory: (category) => set({ category }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  reset: () =>
    set({
      title: "",
      description: "",
      status: undefined,
      unit: undefined,
      editDocumentID: undefined,
      category: undefined,
    }),
}));
