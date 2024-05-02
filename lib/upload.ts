import { ImagePickerResult } from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "./supabase";

const uploadImage = async (
  file: ImagePickerResult,
  fileName: string,
  bucket: string
) => {
  let url: string | undefined = undefined;
  if (file && !file?.canceled) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, decode(file.assets[0].base64 || file.assets[0].uri), {
        contentType: `image/png`,
      });
    if (error || !data) {
      console.log("error", error);
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      url = publicUrl;
    }
  }
  return url;
};

export default uploadImage;
