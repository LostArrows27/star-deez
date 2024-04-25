import { useAuth } from "@/hooks/auth/useAuth";
import useUserID from "@/hooks/auth/useUserID";
import { useFollowStatus } from "@/hooks/home/profile/useFollowStatus";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Button, Spinner } from "tamagui";

const FollowStatusButton = () => {
  const params = useLocalSearchParams();

  const { isFollowing, setIsFollowing, loading, setLoading } =
    useFollowStatus();

  const id = useUserID();

  const toast = useToastController();

  const { userDetails } = useAuth();

  const handleFollow = async () => {
    if (!id) return;
    setLoading(true);
    if (isFollowing) {
      const { error } = await supabase
        .from("follower")
        .delete()
        .eq("user_id", id)
        .eq("follower_id", params?.id);

      if (!error) {
        setIsFollowing(false);
        toast.show("Unfollow success");
      } else {
        toast.show("Unfollow failed");
      }
    } else {
      const { error } = await supabase.from("follower").insert({
        user_id: id,
        follower_id: params?.id as string,
      });

      if (!error) {
        const { data: checkData, error: checkError } = await supabase
          .from("notification")
          .select("*")
          .eq("receiver_id", params!.id as string)
          .eq("sender_id", id)
          .eq(
            "content",
            `${userDetails?.first_name} ${userDetails?.last_name} has followed you`
          );

        if (checkError) {
          toast.show("Follow failed");
          setLoading(false);
          return;
        }

        if (checkData && checkData.length > 0) {
          setIsFollowing(true);
          toast.show("Follow success");
          setLoading(false);
          return;
        }

        const { data: notification, error: notiError } = await supabase
          .from("notification")
          .insert({
            receiver_id: params!.id as string,
            sender_id: id,
            content: `${userDetails?.first_name} ${userDetails?.last_name} has followed you`,
            link_to: `/profile/${id}`,
            meta_data: {
              avatar: userDetails?.avatar,
            },
          });
        setIsFollowing(true);
        toast.show("Follow success");
      } else {
        toast.show("Follow failed");
      }
    }
    setLoading(false);
  };

  return (
    <Button
      themeInverse
      pressStyle={{
        backgroundColor: "$green8Light",
      }}
      backgroundColor={"$green9Light"}
      borderRadius={"$9"}
      size={"$4"}
      width={"$11"}
      disabled={loading}
      onPress={handleFollow}
      icon={loading ? <Spinner /> : undefined}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowStatusButton;
