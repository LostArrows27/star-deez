import { router, Tabs } from "expo-router";
import { Text, ToastAndroid } from "react-native";

import { useAuth } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import { Avatar } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";

export default function TabLayout() {
  const { session } = useAuth();

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  // TODO: adjust this
  // if (!session) {
  //   return <Redirect href={"/"} />;
  // }

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <Avatar
            style={{
              marginLeft: 20,
              marginRight: 8,
            }}
            onPress={() => {
              navigation.openDrawer();
            }}
            circular
            size="$2.5"
          >
            <Avatar.Image
              src={require("@/assets/images/header/placeholder.jpg")}
            />
            <Avatar.Fallback bc="$green9" />
          </Avatar>
        ),
        headerShadowVisible: true,
        tabBarActiveTintColor: "rgb(38,170,115)",
        tabBarStyle: {
          height: 74,
          paddingTop: 4,
          paddingBottom: 8,
          gap: 1,
        },
        tabBarLabel: ({ children, focused }) => (
          <Text
            className={cn("text-xs tracking-widest", {
              "text-[rgb(38,170,115)] font-medium": focused,
            })}
          >
            {children}
          </Text>
        ),
      }}
    >
      <Tabs.Screen
        name="newfeed"
        options={{
          title: "Home",
          lazy: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          lazy: false,
          title: "Post",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "pencil-plus" : "pencil-plus-outline"}
              size={27}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          lazy: false,
          title: "Statistics",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          lazy: false,
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "bell-fill" : "bell"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
