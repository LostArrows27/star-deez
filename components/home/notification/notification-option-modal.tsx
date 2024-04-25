import StyledPressable from "@/components/styled-pressable";
import { Ionicons } from "@expo/vector-icons";
import { TouchableNativeFeedback, View, Text } from "react-native";
import { useNotificationChildOption } from "@/hooks/home/notification/useNotificationChildOption";
import { Adapt, Popover } from "tamagui";
import { supabase } from "@/lib/supabase";

const NotificationOptionModal = () => {
  const { open, setOpen, notification_id, is_readed } =
    useNotificationChildOption();

  const markAsReaded = async () => {
    setOpen(false);
    if (is_readed || !notification_id) return;
    const { data, error } = await supabase
      .from("notification")
      .update({ is_readed: true, is_seen: true })
      .eq("id", notification_id);
  };

  const hideNotification = async () => {
    setOpen(false);
    if (!notification_id) return;
    const { data, error } = await supabase
      .from("notification")
      .delete()
      .eq("id", notification_id);
  };

  return (
    <Popover
      onOpenChange={(open) => {
        setOpen(open);
      }}
      open={open}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
        style={{
          display: "none",
        }}
      >
        <View></View>
      </TouchableNativeFeedback>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet snapPointsMode="fit" modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding={"$0"} pt="$3">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        padding={0}
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "lazy",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        height={100}
      >
        <Popover.ScrollView
          style={{
            gap: 0,
            padding: 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StyledPressable
            onPress={markAsReaded}
            className="gap-7 flex-row items-center w-full px-6 py-4"
          >
            <Ionicons name="checkmark-sharp" size={24} color="black" />
            <Text>Mark this notification as readed</Text>
          </StyledPressable>
          <StyledPressable
            onPress={hideNotification}
            className="gap-7 flex-row items-center w-full px-6 py-4"
          >
            <Ionicons name="eye-off-outline" size={24} color="black" />
            <Text>Hide this notification</Text>
          </StyledPressable>
        </Popover.ScrollView>
      </Popover.Content>
    </Popover>
  );
};

export default NotificationOptionModal;
