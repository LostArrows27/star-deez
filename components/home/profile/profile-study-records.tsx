import { View, Text } from "react-native";
import React, { forwardRef, useCallback, useState } from "react";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import PostLists from "../newfeed/post-lists";
import Loading from "../newfeed/loading";

const ProfileStudyRecords = () => {
  const { id } = useGlobalSearchParams();

  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [id])
  );

  return (
    <View>
      {show ? (
        <View>
          <PostLists
            className=" h-fit w-full mt-20"
            type="profiles"
            profile_id={id as string}
          />
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default forwardRef(ProfileStudyRecords);
