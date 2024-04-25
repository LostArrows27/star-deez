import NotificationList from "@/components/home/notification/notification-list";
import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "tamagui";

const Page = () => {
  const [tab, setTab] = useState("all");

  return (
    <View>
      <Stack.Screen />
      <View className="flex-row justify-center w-full">
        <Button
          onPress={() => setTab("all")}
          w={"$8"}
          size={"$3"}
          backgroundColor={tab === "all" ? "$green6" : "$green1Light"}
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
        >
          All
        </Button>
        <Button
          w={"$8"}
          size={"$3"}
          onPress={() => setTab("unread")}
          backgroundColor={tab === "unread" ? "$green6" : "$green1Light"}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          Unread
        </Button>
      </View>
      <NotificationList tab={tab} />
    </View>
  );
};

export default Page;
