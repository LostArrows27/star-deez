import { View } from "react-native";
import { Stack } from "expo-router";
import LiveClock from "@/components/home/live-study/live-clock";
import ClockController from "@/components/home/live-study/clock-controller";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Participant,
  useParticipantsList,
} from "@/hooks/home/live-participants/useParticipantsList";
import { useAuth } from "@/hooks/auth/useAuth";

const LiveStudyPage = () => {
  const { userDetails } = useAuth();

  const { setParticipants, setRoom } = useParticipantsList((state) => ({
    setParticipants: state.setParticipants,
    setRoom: state.setRoom,
  }));

  useEffect(() => {
    if (userDetails?.id) {
      const userStatus = {
        id: userDetails!.id,
        avatar: userDetails!.avatar,
        name: userDetails!.full_name,
        isRunning: false,
        studyTime: 0,
      };

      const room = supabase.channel("live_session", {
        config: {
          presence: {
            key: userDetails.id,
          },
        },
      });

      room
        .on("presence", { event: "sync" }, () => {
          const newState = room.presenceState();

          const usersList = Object.keys(newState)
            .map((data) => {
              const presences = newState[data] as unknown as Participant[];

              const lists = presences.map((presence) => {
                return {
                  id: presence.id,
                  avatar: presence.avatar,
                  name: presence.name,
                  isRunning: presence.isRunning,
                  studyTime: presence?.studyTime,
                };
              });
              return lists;
            })
            .flat();

          setParticipants(usersList);
        })
        .subscribe();

      setRoom(room);

      return () => {
        room.untrack();
        room.unsubscribe();
      };
    }
  }, [userDetails?.id]);

  return (
    <View className="">
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Live Study Session",
        }}
      />
      <View className="justify-between h-full bg-white">
        <LiveClock />
        <ClockController />
      </View>
    </View>
  );
};

export default LiveStudyPage;
