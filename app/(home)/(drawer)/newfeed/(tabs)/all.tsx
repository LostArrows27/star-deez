import Loading from "@/components/home/newfeed/loading";
import PostLists from "@/components/home/newfeed/post-lists";
import useUserID from "@/hooks/auth/useUserID";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";

const Page = () => {
  const id = useUserID();

  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return (
    <View>
      {show ? (
        <View>
          <PostLists type="all" profile_id={id} />
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Page;
