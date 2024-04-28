import Participant from "@/components/home/live-participants/participant";
import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import { Circle, H3 } from "tamagui";
import StyledText from "@/components/styled-text";
import { useParticipantsList } from "@/hooks/home/live-participants/useParticipantsList";

const renderParticipant = ({ item, index }: { item: any; index: number }) => {
  return (
    <Participant
      isRunning={item.isRunning}
      avatar={item.avatar}
      name={item.name}
      id={item.id}
      studyTime={item?.studyTime}
    />
  );
};

const ParticipantsList = () => {
  const participants = useParticipantsList((state) => state.participants);

  return (
    <View className="w-full h-full">
      <View className="bg-emerald-500 flex-row items-center justify-center w-full h-10 gap-5 px-10">
        <Circle backgroundColor={"white"} size={10} />
        <Text className="font-lg font-semibold text-white">
          {participants.length} studying with you
        </Text>
      </View>
      <View className=" w-full h-full px-4">
        {participants.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              paddingTop: 30,
              gap: 30,
            }}
            className="h-full"
            initialNumToRender={
              participants.length > 12 ? 12 : participants.length
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            numColumns={3}
            data={participants}
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
