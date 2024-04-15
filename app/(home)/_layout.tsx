import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContainer } from "@/components/drawer/drawer";
import { useAuth } from "@/hooks/auth/useAuth";
import { Redirect } from "expo-router";

// NOTE: drawer container

export default function Layout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Drawer
      drawerContent={(props) => <DrawerContainer {...props} />}
      screenOptions={{ headerShown: false }}
    ></Drawer>
  );
}
