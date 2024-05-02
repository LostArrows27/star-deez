import useEditInformationStore from "@/hooks/home/edit-profile/useEditInformation";
import { ScrollView, View } from "react-native";
import { Button, Spinner } from "tamagui";
import InformationForm from "./information-form";
import useInitInformation from "@/hooks/home/edit-profile/useInitInformation";
import {
  useUploadAvatar,
  useUploadCover,
} from "@/hooks/home/edit-profile/useUploadProfileImage";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import uuid from "react-uuid";
import uploadImage from "@/lib/upload";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "expo-router";

const SubmitButton = () => {
  const [loading, setLoading] = useState(false);

  const {
    canSubmit,
    editInformation: information,
    reset,
  } = useEditInformationStore();

  const submitPossible = canSubmit();

  const { userDetails, refetch } = useAuth();

  const { image: avatarFile, removeImages: removeAvatar } = useUploadAvatar();

  const { image: coverFile, removeImages: removeCover } = useUploadCover();

  useInitInformation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
        removeAvatar();
        removeCover();
      };
    }, [])
  );

  const handleSubmit = async () => {
    if (!submitPossible || !information) return;

    // 1. upload avatar + cover
    let avatarUrl: string | undefined = undefined;
    let coverUrl: string | undefined = undefined;
    const id = uuid();

    setLoading(true);
    if (avatarFile) {
      let url = await uploadImage(
        avatarFile,
        `${userDetails?.id}/${id}/avatar`,
        "profiles"
      );
      avatarUrl = url;
    }

    if (coverFile) {
      let url = await uploadImage(
        coverFile,
        `${userDetails?.id}/${id}/cover`,
        "profiles"
      );
      coverUrl = url;
    }

    // 2. update information

    const { data, error } = await supabase
      .from("profiles")
      .update({
        avatar: avatarUrl ? avatarUrl : userDetails?.avatar!,
        cover: coverUrl ? coverUrl : userDetails?.cover!,
        first_name: information.first_name
          ? information.first_name
          : userDetails?.first_name!,
        last_name: information.last_name
          ? information.last_name
          : userDetails?.last_name,
        gender: information.gender ? information.gender : userDetails?.gender,
        dob: information.dob
          ? new Date(information.dob).toISOString()
          : userDetails?.dob,
        bio: information.bio ? information.bio : userDetails?.bio,
        country: information.country
          ? information.country
          : userDetails?.country,
        job: information.job ? information.job : userDetails?.job,
        academics: information.academic
          ? information.academic
          : userDetails?.academics,
        school: information.school ? information.school : userDetails?.school,
      })
      .eq("id", userDetails?.id!);

    if (error) {
      console.log("error", error);
    }

    refetch();
    removeAvatar();
    removeCover();
    reset();
    setLoading(false);
  };

  return (
    <Button
      pressStyle={{
        bg: submitPossible ? "$green8Light" : "$gray8Light",
      }}
      onPress={handleSubmit}
      mx={"$3.5"}
      disabled={!submitPossible || loading}
      color={"white"}
      bg={submitPossible ? "$green9Light" : "$gray9Light"}
      icon={loading ? <Spinner size="small" color="$green6Light" /> : <></>}
    >
      Save Changes
    </Button>
  );
};

export default SubmitButton;
