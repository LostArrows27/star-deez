import { Tabs } from "expo-router";
import { Text } from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { CustomTabBarButton } from "@/components/home/tabbar-button";
import { Avatar } from "tamagui";
import { useDrawerNavigation } from "@/hooks/useDrawerNavigation";
import { useAuth } from "@/hooks/auth/useAuth";

const TabLayout = () => {
  const navigation = useDrawerNavigation();

  const { userDetails } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgb(38,170,115)",
        tabBarStyle: {
          height: 70,
          gap: 1,
          overflow: "hidden",
          alignItems: "center",
        },
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
        name="live-study"
        options={{
          title: "Live Session",

          lazy: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "alarm" : "alarm-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="live-participants"
        options={{
          title: "Participants",

          lazy: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
