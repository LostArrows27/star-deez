import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContainer } from "@/components/drawer/drawer";
import { useAuth } from "@/hooks/auth/useAuth";
import { Redirect, router } from "expo-router";

// NOTE: drawer container

export default function Layout() {
  // const { userDetails, session } = useAuth();
  // if (!session) {
  //   router.push("/(auth)/sign-in");
  // } else {
  //   if (!userDetails) {
  //     router.push("/(auth)/basic-information");
  //   }

  // }
  return (
    <Drawer
      drawerContent={(props: any) => <DrawerContainer {...props} />}
      screenOptions={{ headerShown: false }}
    ></Drawer>
  );
}
