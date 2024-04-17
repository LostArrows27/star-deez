import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Image, Separator } from "tamagui";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import StyledText from "../styled-text";

export const DrawerContainer = (props: any) => {
  const pathname = usePathname();

  const { userDetails } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
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
      <Separator marginVertical={15} />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/feed" ? "#fff" : "#000"}
          />
        )}
        label={"Feed"}
        labelStyle={[{ color: pathname == "/feed" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname == "/feed" ? "#333" : "#fff" }}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <AntDesign
            name="user"
            size={size}
            color={pathname == "/profile" ? "#fff" : "#000"}
          />
        )}
        label={"Profile"}
        labelStyle={[{ color: pathname == "/profile" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname == "/profile" ? "#333" : "#fff" }}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons
            name="favorite-outline"
            size={size}
            color={pathname == "/favourites" ? "#fff" : "#000"}
          />
        )}
        label={"Favourites"}
        labelStyle={[{ color: pathname == "/favourites" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname == "/favourites" ? "#333" : "#fff" }}
        onPress={() => {}}
      />
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
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="log-in"
            size={24}
            color={pathname == "/settings" ? "#fff" : "#000"}
          />
        )}
        label={"Log out"}
        labelStyle={[{ color: pathname == "/settings" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
        onPress={() => {
          supabase.auth.signOut();
        }}
      />
    </DrawerContentScrollView>
  );
};
