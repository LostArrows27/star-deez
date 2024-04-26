import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export const useDrawerNavigation = useNavigation<
  DrawerNavigationProp<ParamListBase>
>;
