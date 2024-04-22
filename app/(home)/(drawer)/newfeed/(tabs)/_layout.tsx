import { View, Text } from "react-native";
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
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
      initialRouteName="All"
      screenOptions={{
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
        name="all"
        options={{
          tabBarLabel: "All feeds",
        }}
      />
      <MaterialTopTabs.Screen
        name="following"
        options={{
          tabBarLabel: "Following",
        }}
      />
    </MaterialTopTabs>
  );
}
