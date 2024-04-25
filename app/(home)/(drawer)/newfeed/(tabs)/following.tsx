import Loading from "@/components/home/newfeed/loading";
import PostLists from "@/components/home/newfeed/post-lists";
import useUserID from "@/hooks/auth/useUserID";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";

const Page = () => {
  const id = useUserID();

  const [show, setShow] = useState(false);
  const [following, setFollowing] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        (async () => {
          const { data, error } = await supabase
            .from("follower")
            .select("follower_id")
            .eq("user_id", id);
          if (error || !data) {
            console.log(error);
            return;
          }

          if (data) {
            setFollowing(data.map((item) => item.follower_id));
          }
          setShow(true);
        })();
      }

      return () => {
        setShow(false);
      };
    }, [id])
  );

  return (
    <View>
      {show ? (
        <PostLists type="following" profile_id={id} listFollowing={following} />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Page;
