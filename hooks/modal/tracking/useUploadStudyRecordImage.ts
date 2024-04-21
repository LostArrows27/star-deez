import { ImagePickerResult } from "expo-image-picker";
import { create } from "zustand";
import * as ImagePicker from "expo-image-picker";

//   const [avatar, setAvatar] = useState<ImagePickerResult | null>(null);

type uploadStudyRecordImageProps = {
  image: ImagePickerResult | null;
  preview: string | null;
  pickImages: (aspect: [number, number]) => Promise<void>;
  removeImages: () => void;
};

export const useUploadStudyRecordImage = create<uploadStudyRecordImageProps>(
  (set) => ({
    image: null,
    preview: null,
    pickImages: async (aspect: [number, number]) => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: aspect,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        set((state) => {
          return {
            ...state,
            preview: result.assets[0].uri,
            image: result,
          };
        });
      }
    },
    removeImages: () => {
      set((state) => {
        return {
          ...state,
          preview: null,
          image: null,
        };
      });
    },
  })
);