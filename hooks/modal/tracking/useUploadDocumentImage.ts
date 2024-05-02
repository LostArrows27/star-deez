import { ImagePickerResult } from "expo-image-picker";
import { create } from "zustand";
import * as ImagePicker from "expo-image-picker";

//   const [avatar, setAvatar] = useState<ImagePickerResult | null>(null);

type UploadDocumentImageProps = {
  image: ImagePickerResult | null;
  preview: string | null;
  setPreview: (preview: string | null) => void;
  pickImages: (aspect: [number, number]) => Promise<void>;
  removeImages: () => void;
};

export const useUploadDocumentImage = create<UploadDocumentImageProps>(
  (set) => ({
    image: null,
    preview: null,
    setPreview: (preview: string | null) => {
      set((state) => {
        return {
          ...state,
          preview: preview,
        };
      });
    },
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
