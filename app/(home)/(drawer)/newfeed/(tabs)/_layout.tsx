import { View, Text } from "react-native";
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Loading from "@/components/home/newfeed/loading";
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
export default function HomeLayout() {
  return (
    <MaterialTopTabs
      initialRouteName="following"
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: "hsl(151, 49.3%, 46.5%)",
        tabBarIndicatorStyle: {
          borderColor: "hsl(151, 49.3%, 46.5%)",
          backgroundColor: "hsl(151, 49.3%, 46.5%)",
        },
        tabBarPressColor: "rgba(0, 0, 0, 0.1)",
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          textTransform: "capitalize",
        },

        tabBarStyle: {},
      }}
    >
      <MaterialTopTabs.Screen
        name="following"
        options={{
          lazy: true,
          tabBarLabel: "Following",
          lazyPreloadDistance: 0,
          lazyPlaceholder: () => <Loading />,
        }}
      />
      <MaterialTopTabs.Screen
        name="all"
        options={{
          lazy: true,
          tabBarLabel: "Explore",
          lazyPreloadDistance: 1,
          lazyPlaceholder: () => <Loading />,
        }}
      />
    </MaterialTopTabs>
  );
}
