import { useAuth } from "@/hooks/auth/useAuth";
import useUserID from "@/hooks/auth/useUserID";
import { useCountNewNotification } from "@/hooks/home/notification/useCountNewNotification";
import { supabase } from "@/lib/supabase";
import { Octicons } from "@expo/vector-icons";
import { memo, useEffect, useState } from "react";
import { View, Text } from "react-native";

const TabNotificationIcon = ({
  color,
  focused,
  tab,
}: {
  color: string;
  focused: boolean;
  tab: string;
}) => {
  const { count, setCount } = useCountNewNotification();

  const [loading, setLoading] = useState(false);

  const id = useUserID();

  useEffect(() => {
    const matchRead = async () => {
      if (loading || !id) return;
      let tempCount = count;
      setCount(0);
      setLoading(true);
      const { data, error } = await supabase
        .from("notification")
        .update({ is_seen: true })
        .eq("receiver_id", id);

      if (!error) {
        setCount(0);
      } else {
        setCount(tempCount);
      }
      setLoading(false);
    };

    if (tab === "notification" && count > 0) {
      matchRead();
    }
  }, [tab]);

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Octicons
        name={focused ? "bell-fill" : "bell"}
        size={23}
        color={color}
      ></Octicons>
      {count > 0 && (
        <View className="-right-3 center -top-2 absolute w-5 h-5 bg-red-400 rounded-full">
          <Text className=" text-xs font-bold text-white">{count}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(TabNotificationIcon);
