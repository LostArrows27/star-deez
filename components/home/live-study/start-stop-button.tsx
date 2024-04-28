import { AntDesign } from "@expo/vector-icons";
import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { Button, Theme } from "tamagui";
import { Feather } from "@expo/vector-icons";
import { useParticipantsList } from "@/hooks/home/live-participants/useParticipantsList";
import { useAuth } from "@/hooks/auth/useAuth";

const StartStopButton = () => {
  const { isRunning, start, stop, time } = useClockTimer();

  const room = useParticipantsList((state) => state.room);

  const { userDetails } = useAuth();

  return (
    <Theme name={"orange"}>
      <Button
        onPress={async () => {
          let userData = {
            id: userDetails!.id,
            avatar: userDetails!.avatar,
            name: userDetails!.full_name,
            studyTime: time,
          };

          if (isRunning) {
            stop();
            room?.track(
              {
                ...userData,
                isRunning: false,
              },
              {
                presence: {
                  key: userDetails!.id,
                },
              }
            );
            return;
          }
          start();
          room?.track(
            {
              ...userData,
              isRunning: true,
            },
            {
              presence: {
                key: userDetails!.id,
              },
            }
          );
        }}
        borderRadius={99999999}
        borderWidth={2}
        alignItems="center"
        justifyContent="center"
        borderColor={"$color7"}
        p={10}
        w={"$6"}
        h={"$6"}
        icon={
          isRunning ? (
            <AntDesign name="pause" size={24} color="orange" />
          ) : (
            <Feather name="play" size={24} color="orange" />
          )
        }
        backgroundColor={"$colorTransparent"}
      ></Button>
    </Theme>
  );
};

export default StartStopButton;
