import { create } from "zustand";

export type Status = "learning" | "standby" | "finished";

export type UnitRow = {
  id: string;
  name: string;
};

export type CategoryType = UnitRow;

type DocumentType = {
  status?: Status;
  setStatus: (status: Status) => void;
  unit?: UnitRow;
  setUnit: (unit: UnitRow) => void;
  category?: CategoryType;
  setCategory: (category: CategoryType) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  reset: () => void;
};

export const useCreateDocument = create<DocumentType>((set) => ({
  title: "",
  description: "",
  setStatus: (status) => set({ status }),
  setUnit: (unit) => set({ unit }),
  setCategory: (category) => set({ category }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  reset: () =>
    set({
      title: "",
      description: "",
      status: undefined,
      unit: undefined,
      category: undefined,
    }),
}));
