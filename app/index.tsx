import React from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import Banner from "@/components/introduction/banner";
import { Button } from "tamagui";
import { router } from "expo-router";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  // if (session) {
  //   return <Redirect href={"/(home)"} />;
  // }

  return (
    <View className="w-full h-full bg-white">
      <View
        style={{
          height: "84%",
        }}
      >
        <Swiper
          loop={false}
          dotStyle={{
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "rgba(38,170,115, 0.3)",
          }}
          activeDotStyle={{
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "rgb(38,170,115)",
          }}
        >
          <Banner
            heading="Turn Study into a Habit"
            content="Let's record the time you spent studying today"
            image={require("@/assets/images/introduction/first.jpg")}
          />
          <Banner
            heading="Friend's Study Records"
            content="What kind of study is your friend doing? Take a peek"
            image={require("@/assets/images/introduction/second.jpg")}
          />
          <Banner
            heading="Check with Graphs"
            content="See your effort at a glance and get motivated"
            image={require("@/assets/images/introduction/third.jpg")}
          />
        </Swiper>
      </View>
      <View className=" items-center gap-4">
        <Button
          onPress={() => {
            router.push("/sign-up");
          }}
          themeInverse
          backgroundColor={"$green9Light"}
          size={"$4"}
        >
          Sign Up
        </Button>
        <Button
          onPress={() => {
            router.push("/sign-in");
          }}
          chromeless
        >
          <View className="flex-row items-center gap-[6px]">
            <View>
              <Text>Already have an account?</Text>
            </View>
            <View>
              <Text className=" text-emerald-600">Log In</Text>
            </View>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default index;
