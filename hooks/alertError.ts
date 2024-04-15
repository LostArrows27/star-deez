import { create } from "zustand";

export type alertError = {
  isOpen: boolean;
  onOpen: (message:string) => void;
  onClose: () => void;
  message: string;
  
};

const initialValue = {
  message: "",
  isOpen: false,
};

export const useAlertError = create<alertError>((set) => ({
  ...initialValue,
  onOpen: (message) => set({ isOpen: true, message}),
  onClose: () => set({ isOpen: false }),
}));
