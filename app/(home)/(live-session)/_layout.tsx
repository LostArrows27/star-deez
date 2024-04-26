import { Redirect, router, Tabs } from "expo-router";
import { Text } from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { CustomTabBarButton } from "@/components/home/tabbar-button";
import { Avatar } from "tamagui";
import { useDrawerNavigation } from "@/hooks/useDrawerNavigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Participant,
  useParticipantsList,
} from "@/hooks/home/live-participants/useParticipantsList";
import { useFocusEffect } from "@react-navigation/native";

const TabLayout = () => {
  const navigation = useDrawerNavigation();

  const { userDetails } = useAuth();

  const { setParticipants } = useParticipantsList();

  const [focus, setFocus] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocus(true);

      return () => {
        setFocus(false);
      };
    }, [])
  );

  useEffect(() => {
    if (userDetails?.id && focus) {
      const userStatus = {
        id: userDetails!.id,
        avatar: userDetails!.avatar,
        name: userDetails!.full_name,
      };

      const room = supabase.channel("live_session");

      room
        .on("presence", { event: "sync" }, () => {
          const newState = room.presenceState();

          const usersList = Object.keys(newState)
            .map((data) => {
              const presences = newState[data] as unknown as Participant[];

              const lists = presences.map((presence) => {
                return {
                  id: presence.id,
                  avatar: presence.avatar,
                  name: presence.name,
                };
              });

              return lists;
            })
            .flat();

          setParticipants(usersList);
        })
        .subscribe()
        .track(userStatus);

      return () => {
        room.untrack();
        room.unsubscribe();
      };
    }
  }, [focus, userDetails?.id]);

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
