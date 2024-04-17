import { Redirect, router, Tabs } from "expo-router";
import { Text, ToastAndroid } from "react-native";

import { cn } from "@/lib/utils";
import { Avatar } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useAuth } from "@/hooks/auth/useAuth";
import { CustomTabBarButton } from "@/components/home/tabbar-button";

export default function TabLayout() {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const { userDetails } = useAuth();

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
              src={
                userDetails
                  ? userDetails.avatar
                  : require("@/assets/images/header/placeholder.jpg")
              }
            />
            <Avatar.Fallback bc="$green9" />
          </Avatar>
        ),
        headerShadowVisible: true,
        tabBarActiveTintColor: "rgb(38,170,115)",
        tabBarStyle: {
          height: 70,
          gap: 1,
          overflow: "hidden",
          alignItems: "center",
        },
        tabBarButton: (props) => (
          <CustomTabBarButton
            onPress={(e) => {
              props.onPress?.(e);
            }}
          >
            {props.children}
          </CustomTabBarButton>
        ),
        tabBarLabel: ({ children, focused }) => (
          <Text
            className={cn(
              "text-xs font-[Inter] transition-all -mt-5 text-transparent tracking-widest",
              {
                "text-[rgb(38,170,115)] mt-0 font-medium": focused,
              }
            )}
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
          headerTintColor: "text-[rgb(5,150,105)]",
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
        name="tracking"
        options={{
          lazy: false,
          headerTintColor: "text-[rgb(5,150,105)]",
          title: "Tracking",
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
          headerTintColor: "text-[rgb(5,150,105)]",
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
          headerTintColor: "text-[rgb(5,150,105)]",
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
