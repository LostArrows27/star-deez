import EditImage from "@/components/home/edit-profile/edit-image/edit-image";
import EditInformation from "@/components/home/edit-profile/edit-information/edit-information";
import StyledView from "@/components/styled-view";
import { Stack } from "expo-router";
import { View } from "tamagui";

const ProfileEditPage = () => {
  return (
    <View className="flex-1 h-full bg-white">
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTransparent: false,
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <StyledView w={"100%"} pb={"$2"} h={"100%"}>
        <EditImage />
        <EditInformation />
      </StyledView>
    </View>
  );
};

export default ProfileEditPage;
