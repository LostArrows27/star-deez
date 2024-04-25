import LoadingScreen from "@/components/loading/loading-screen";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { Notification, Profile } from "@/types/supabase-util-types";
import { memo, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { H3, Text } from "tamagui";
import Loading from "../newfeed/loading";
import { useRealTime } from "@/hooks/useRealTime";
import useUserID from "@/hooks/auth/useUserID";
import { FlatList } from "react-native-gesture-handler";
import NotificationChild from "./notification-child";
import { Image } from "expo-image";
import StyledText from "@/components/styled-text";

export type NotificationData = Notification;

const renderItem = ({ item }: { item: NotificationData }) => (
  <NotificationChild
    id={item.id}
    is_readed={item.is_readed}
    avatar={item.meta_data.avatar}
    content={item.content}
    created_at={item.created_at}
    link_to={item.link_to}
  />
);

const NotificationList = ({ tab }: { tab: string }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const id = useUserID();

  const { loading } = useGetInitData(async (user) => {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("receiver_id", user?.id)
      .order("created_at", { ascending: false })
      .returns<NotificationData[]>();

    if (!error) {
      setNotifications(data);
    }
  });

  const filterNotifcation = useMemo(() => {
    return notifications.filter((item) => {
      if (tab === "unread") {
        return !item.is_readed;
      }
      return true;
    });
  }, [notifications, tab]);

  useRealTime({
    channel: "notification_detail_" + id!,
    table: "notification",
    filter: "receiver_id=eq." + id!,
    onInsert: async (payload) => {
      setNotifications((prev) => [payload.new as NotificationData, ...prev]);
    },
    onDelete: async (payload) => {
      setNotifications((prev) =>
        prev.filter((item) => item.id !== payload.old.id)
      );
    },
    onUpdate: async (payload) => {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === (payload.new as NotificationData).id
            ? (payload.new as NotificationData)
            : item
        )
      );
    },
  });

  return (
    <ScrollView className=" w-full" showsVerticalScrollIndicator={false}>
      {loading ? (
        <View className="pt-36">
          <Loading />
        </View>
      ) : filterNotifcation.length > 0 ? (
        <View className="mt-8">
          <FlatList
            className="h-full"
            initialNumToRender={6}
            scrollEnabled={filterNotifcation.length > 5}
            showsVerticalScrollIndicator={false}
            data={[...filterNotifcation]}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View className="center w-full gap-4 mt-20">
          <Image
            autoplay
            style={{
              width: 200,
              height: 200,
            }}
            contentFit="cover"
            source={require("@/assets/images/notification/pusheen.gif")}
          />
          <H3 color={"$color8"} mt="8" textTransform="uppercase">
            {tab === "unread" ? "NO UNREAD notification" : "No notification"}
          </H3>
          <StyledText
            color={"$gray10Light"}
            lineHeight={"$5"}
            mx="$7"
            textAlign="center"
          >
            Pusheen will notify you when there is something new zzz
          </StyledText>
        </View>
      )}
    </ScrollView>
  );
};

export default NotificationList;
