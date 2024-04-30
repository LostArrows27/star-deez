import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Image, Separator } from "tamagui";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import { router, usePathname } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const DrawerContainer = (props: any) => {
  const pathname = usePathname();

  const { userDetails } = useAuth();

  return (
    <DrawerContentScrollView contentContainerClassName="h-full" {...props}>
      <View className="flex flex-row items-start w-full gap-5 pt-4 pl-4 pr-8">
        <Image
          source={{
            uri: userDetails
              ? userDetails.avatar
              : require("@/assets/images/header/placeholder.jpg"),
          }}
          width={60}
          height={60}
          borderRadius={9999}
        />
        <View className="">
          <Text className="mb-1 text-2xl font-bold">
            {userDetails?.first_name + " " + userDetails?.last_name}
          </Text>
        </View>
      </View>
      <Separator borderColor={"$gray5Light"} marginVertical={15} />
      <View className="gap-4">
        <DrawerItem
          icon={({ color, size }) => (
            <Feather
              name="list"
              size={size}
              color={pathname == "/newfeed/following" ? "#059669" : "#000"}
            />
          )}
          label={"Feed"}
          labelStyle={[
            { color: pathname == "/newfeed/following" ? "#059669" : "#000" },
          ]}
          style={{
            backgroundColor:
              pathname == "/newfeed/following" ? "#dcfce7" : "#fff",
          }}
          onPress={() => {
            if (pathname != "/newfeed/following")
              router.push("/(home)/(drawer)/newfeed/(tabs)/following");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <AntDesign
              name="search1"
              size={size}
              color={pathname == `/search` ? "#059669" : "#000"}
            />
          )}
          label={"Search"}
          labelStyle={[
            {
              color: pathname == `/search` ? "#059669" : "#000",
            },
          ]}
          style={{
            backgroundColor: pathname == `/search` ? "#dcfce7" : "#fff",
          }}
          onPress={() => {
            if (pathname != `/search` && userDetails?.id) {
              router.push(`/search/`);
            }
          }}
        />

        <DrawerItem
          icon={({ color, size }) => (
            <AntDesign
              name="user"
              size={size}
              color={
                pathname == `/profile/${userDetails?.id}` ? "#059669" : "#000"
              }
            />
          )}
          label={"Profile"}
          labelStyle={[
            {
              color:
                pathname == `/profile/${userDetails?.id}` ? "#059669" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == `/profile/${userDetails?.id}` ? "#dcfce7" : "#fff",
          }}
          onPress={() => {
            if (pathname != `/profile/${userDetails?.id}` && userDetails?.id) {
              router.push(`/profile/${userDetails?.id}`);
            }
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons
              name="access-alarms"
              size={size}
              color={pathname == `/live-study` ? "#059669" : "#000"}
            />
          )}
          label={"Study together"}
          labelStyle={[
            {
              color: pathname == `/live-study` ? "#059669" : "#000",
            },
          ]}
          style={{
            backgroundColor: pathname == `/live-study` ? "#dcfce7" : "#fff",
          }}
          onPress={() => {
            if (pathname != `/live-study` && userDetails?.id) {
              router.push(`/live-study/`);
            }
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="medal-outline"
              size={size}
              color="black"
            />
          )}
          label={"Ranking"}
          labelStyle={[
            {
              color: pathname.startsWith(`/ranking`) ? "#059669" : "#000",
            },
          ]}
          style={{
            backgroundColor: pathname.startsWith(`/ranking`)
              ? "#dcfce7"
              : "#fff",
          }}
          onPress={() => {
            if (pathname != `/ranking` && userDetails?.id) {
              router.push(`/ranking/day`);
            }
          }}
        />
        <Separator borderColor={"$gray5Light"} />

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={pathname == "/settings" ? "#fff" : "#000"}
            />
          )}
          label={"Settings"}
          labelStyle={[{ color: pathname == "/settings" ? "#fff" : "#000" }]}
          style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
          onPress={() => {
            // router.push("/global-feed/");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => <Feather name="log-in" size={24} />}
          label={"Log out"}
          onPress={async () => {
            props.navigation.closeDrawer();
            const { error } = await supabase.auth.signOut();
          }}
        />
      </View>
      <View className="flex-1 w-full"></View>
      <View className="pb-5"></View>
    </DrawerContentScrollView>
  );
};
