import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContainer } from "@/components/drawer/drawer";
import { useAuth } from "@/hooks/auth/useAuth";
import { Redirect, router } from "expo-router";
import { Stack } from "tamagui";

// NOTE: drawer container

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props: any) => <DrawerContainer {...props} />}
      screenOptions={{ headerShown: false, lazy: true }}
    ></Drawer>
  );
}
