import { create } from "zustand";

export type Status = "learning" | "standby" | "finished";

export type UnitRow = {
  id: string;
  name: string;
};

type DocumentType = {
  status: Status;
  setStatus: (status: Status) => void;
  unit?: UnitRow;

  setUnit: (unit: UnitRow) => void;
};

export const useCreateDocument = create<DocumentType>((set) => ({
  status: "learning",
  setStatus: (status) => set({ status }),
  setUnit: (unit) => set({ unit }),
}));
