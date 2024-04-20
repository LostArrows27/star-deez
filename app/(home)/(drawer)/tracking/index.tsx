import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { SelectStatus } from "@/components/home/tracking/select-status";
import { Button, Circle, TextArea } from "tamagui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pen } from "@tamagui/lucide-icons";

const Page = () => {
  return (
    <View className="flex-col flex-1 h-full p-4 pt-2">
      <Stack.Screen />
      <SelectStatus />
      <View
        style={{
          marginHorizontal: 40,
          marginVertical: 30,
        }}
      >
        <Link asChild href={"/(modal)/tracking/create-document"}>
          <Button
            pressStyle={{
              backgroundColor: "$green2Light",
            }}
            gap="$-0"
            chromeless
          >
            <MaterialCommunityIcons
              name="book-plus-multiple-outline"
              size={24}
              color="rgb(16,185,129)"
            />
            <Text className="text-emerald-500 font-bold">
              Create new document
            </Text>
          </Button>
        </Link>
      </View>
      <Link asChild href={"/(modal)/tracking/create-study-record"}>
        <Circle
          size={50}
          backgroundColor={"$color8"}
          elevation="$1"
          pressStyle={{ backgroundColor: "$green7Light" }}
          overflow="hidden"
          position="absolute"
          bottom={30}
          right={30}
        >
          <Pen size={"$1"} color={"#fff"} />
        </Circle>
      </Link>
    </View>
  );
};

export default Page;
