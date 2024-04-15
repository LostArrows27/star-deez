import React from "react";
import Button from "../components/button";
import { Link, Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import { Image } from "tamagui";
import Banner from "@/components/introduction/banner";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  // if (session) {
  //   return <Redirect href={"/(home)"} />;
  // }

  return (
    <>
      <View
        style={{
          height: "85%",
        }}
      >
        <Swiper
          loop={false}
          dotStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
          activeDotStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Banner
            heading="Make study a habit"
            content="Heeee"
            image={require("@/assets/images/introduction/first.jpg")}
          />
          <Banner
            heading="Hello"
            content="Heeee"
            image={require("@/assets/images/introduction/second.jpg")}
          />
          <Banner
            heading="Hello"
            content="Heeee"
            image={require("@/assets/images/introduction/third.jpg")}
          />
        </Swiper>
        <Text className="text-red-400">aaaaa</Text>
      </View>
    </>
  );
};

export default index;
