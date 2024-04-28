import { Drawer } from "expo-router/drawer";
import { DrawerContainer } from "@/components/drawer/drawer";

// NOTE: drawer container

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props: any) => <DrawerContainer {...props} />}
      screenOptions={{ headerShown: false, lazy: true }}
    ></Drawer>
  );
}
