import { ImagePickerResult } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { create } from "zustand";

export type UploadInstanceType = {
  image: ImagePickerResult | null;
  preview: string | null;
  pickImages: (aspect: [number, number]) => Promise<void>;
  removeImages: () => void;
};

const useUploadImageFactory = () => {
  return create<UploadInstanceType>((set) => ({
    image: null,
    preview: null,
    pickImages: async (aspect: [number, number]) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: aspect,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        set((state) => ({
          ...state,
          preview: result.assets[0].uri,
          image: result,
        }));
      }
    },
    removeImages: () => {
      set((state) => ({
        ...state,
        preview: null,
        image: null,
      }));
    },
  }));
};

export default useUploadImageFactory;
