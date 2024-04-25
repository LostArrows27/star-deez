import Participant from "@/components/home/live-participants/participant";
import { postData } from "@/constants/Post";
import useUserID from "@/hooks/auth/useUserID";
import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import { Circle, H3 } from "tamagui";
import StyledText from "@/components/styled-text";

const renderParticipant = ({ item, index }: { item: any; index: number }) => {
  return (
    <Participant avatar={item.avatar} name={item.document.name} id={item.id} />
  );
};

const ParticipantsList = () => {
  const id = useUserID();

  return (
    <View className="w-full h-full">
      <View className="bg-emerald-500 flex-row items-center justify-center w-full h-10 gap-5 px-10">
        <Circle backgroundColor={"white"} size={10} />
        <Text className="font-lg font-semibold text-white">
          3,012 studying with you
        </Text>
      </View>
      <View className=" w-full h-full px-4">
        {postData.length === 0 ? (
          <FlatList
            contentContainerStyle={{
              width: "100%",
              paddingTop: 30,
              flex: 1,
              gap: 30,
              height: "100%",
            }}
            numColumns={3}
            data={postData}
            renderItem={renderParticipant}
          />
        ) : (
          <View className="center w-full pt-20">
            <Image
              autoplay
              style={{
                width: 200 * 1.2,
                height: 180 * 1.2,
              }}
              contentFit="cover"
              source={require("@/assets/images/live-session/cat_writing.gif")}
            />
            <H3 mt="$4" color={"$color8"}>
              No participants yet
            </H3>
            <StyledText
              color={"$gray10Light"}
              letterSpacing={"$10"}
              textAlign="center"
              mt="$3"
            >
              Look likes you are the first one here:D
            </StyledText>
          </View>
        )}
      </View>
    </View>
  );
};

export default ParticipantsList;
