import { View } from "react-native";
import { cn } from "@/lib/utils";
import { Avatar, Button, Text } from "tamagui";
import { Entypo } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import StyledPressable from "@/components/styled-pressable";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useNotificationChildOption } from "@/hooks/home/notification/useNotificationChildOption";

type ChildProps = {
  id: string;
  is_readed: boolean;
  avatar: string;
  content: string;
  created_at: string;
  link_to: string;
};

const NotificationChild = (props: ChildProps) => {
  const { setOpen, setNotificationId, setIsReaded } =
    useNotificationChildOption();

  return (
    <StyledPressable
      onPress={async () => {
        router.push(props.link_to as any);
        if (props.is_readed) return;
        const { data, error } = await supabase
          .from("notification")
          .update({ is_readed: true, is_seen: true })
          .eq("id", props.id);
      }}
      style={
        props.is_readed
          ? {
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5.62,
              elevation: 7,
            }
          : {}
      }
      className={cn(
        "flex-row p-4 mx-3 justify-between mb-7 relative rounded-lg",
        {
          "bg-emerald-500": !props.is_readed,
          "bg-white": props.is_readed,
        }
      )}
    >
      <View>
        <Avatar circular size="$4.5">
          <Avatar.Image src={props.avatar || ""} />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
      </View>
      <View className="flex-1 gap-2 pr-1 ml-6">
        <Text color={props.is_readed ? "black" : "white"} numberOfLines={3}>
          {props.content}
        </Text>
        <Text
          fontSize={"$2"}
          color={props.is_readed ? "$gray9Light" : "$gray2Light"}
        >
          {formatDistanceToNowStrict(new Date(props.created_at))} ago
        </Text>
      </View>
      <View className="center mr-1">
        <Button
          onPress={() => {
            setOpen(true);
            setIsReaded(props.is_readed);
            setNotificationId(props.id);
          }}
          size={"$2"}
          backgroundColor={"$colorTransparent"}
          icon={<Entypo name="dots-three-vertical" size={16} color="black" />}
        ></Button>
      </View>
      <View className="top-0 bottom-0 right-0 justify-center">
        <View
          style={{
            backgroundColor: props.is_readed ? "transparent" : "white",
          }}
          className="w-[9px] h-[9px]  rounded-full"
        ></View>
      </View>
    </StyledPressable>
  );
};

export default NotificationChild;
