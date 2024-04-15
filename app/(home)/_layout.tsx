import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContainer } from "@/components/drawer/drawer";

// NOTE: drawer container

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContainer {...props} />}
      screenOptions={{ headerShown: false }}
    ></Drawer>
  );
}
