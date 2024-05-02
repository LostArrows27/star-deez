import { AcademicStatus, Gender } from "@/types/supabase-util-types";
import { create } from "zustand";

type EditProps = {
  first_name: string;
  last_name: string;
  gender: Gender;
  dob: string;
  bio?: string;
  country?: string;
  job?: string;
  academic?: AcademicStatus;
  school?: string;
};

type EditInformationProps = {
  editInformation: EditProps;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setGender: (gender: Gender) => void;
  setBio: (value: string) => void;
  setDob: (value: string) => void;
  setCountry: (value: string) => void;
  setJob: (value: string) => void;
  setAcademic: (value: AcademicStatus) => void;
  setSchool: (value: string) => void;
  canSubmit: () => boolean;
  reset: () => void;
};

const useEditInformationStore = create<EditInformationProps>((set) => ({
  editInformation: {
    first_name: "",
    last_name: "",
    gender: "male",
    dob: "",
  },
  setFirstName: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, first_name: value },
    })),
  setLastName: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, last_name: value },
    })),
  setGender: (gender) =>
    set((state) => ({ editInformation: { ...state.editInformation, gender } })),
  setBio: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, bio: value },
    })),
  setDob: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, dob: value },
    })),
  setCountry: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, country: value },
    })),
  setJob: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, job: value },
    })),
  setAcademic: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, academic: value },
    })),
  setSchool: (value) =>
    set((state) => ({
      editInformation: { ...state.editInformation, school: value },
    })),

  canSubmit: () => {
    let canSubmit = true;
    set((state) => {
      const {
        editInformation: { first_name, last_name, dob, gender },
      } = state;

      if (!first_name || !last_name || !dob || !gender) {
        canSubmit = false;
      }
      return state;
    });
    return canSubmit;
  },
  reset: () =>
    set((state) => ({
      editInformation: {
        first_name: "",
        last_name: "",
        gender: "male",
        dob: "",
      },
    })),
}));

export default useEditInformationStore;
