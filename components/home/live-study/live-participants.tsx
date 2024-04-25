import StyledPressable from "@/components/styled-pressable";
import { useAuth } from "@/hooks/auth/useAuth";
import { ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { Avatar, Circle } from "tamagui";

const LiveParticipants = () => {
  const { userDetails } = useAuth();

  return (
    <StyledPressable
      onPress={() => {
        router.push("/live-participants/");
      }}
      className="rounded-xl bg-emerald-500 flex-row items-center w-4/5 h-16 px-4 py-2 mt-10"
    >
      <Circle backgroundColor={"white"} size={10} />
      <View className="flex-row items-center ml-3">
        <Avatar style={styles.avatar} circular size="$3.5">
          <Avatar.Image src={userDetails!.avatar} />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
        <Avatar style={styles.avatar} circular size="$3.5">
          <Avatar.Image src={userDetails!.avatar} />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
        <Avatar style={styles.avatar} circular size="$3.5">
          <Avatar.Image src={userDetails!.avatar} />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
      </View>
      <View className="flex-row items-center">
        <Text className="ml-9 font-semibold text-white">
          3,012 studying now
        </Text>
        <ChevronRight size={"$2.5"} color={"white"} ml={"$2"} />
      </View>
    </StyledPressable>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    marginRight: -20,
    backgroundColor: "gray",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgb(16,185,129)",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
});

export default LiveParticipants;
