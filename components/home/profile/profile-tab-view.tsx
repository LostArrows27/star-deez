import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Theme } from "tamagui";
import Swiper from "react-native-swiper";
import Banner from "@/components/introduction/banner";
import { useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import ProfileStudyRecords from "./profile-study-records";
import { authRoute } from "@/constants/Route";

const ProfileTabView = () => {
  const swiperRef = useRef<any>();

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className="w-full">
      <View className="bg-gray-100 h-[15px] w-full"></View>
      <View className=" flex-row w-full">
        <Button
          flex={1}
          height={"$6"}
          borderRadius={"$2"}
          pressStyle={{
            borderColor: "$colorTransparent",
            backgroundColor: "$gray6Light",
          }}
          backgroundColor={"$colorTransparent"}
          style={{
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
            transitionDuration: "150ms",
          }}
          onPress={() => {
            swiperRef.current?.scrollTo(0);
            setCurrentIndex(0);
          }}
        >
          <Ionicons
            name="stats-chart-outline"
            size={24}
            color={currentIndex === 0 ? "#059669" : "black"}
          />
        </Button>
        <Button
          flex={1}
          height={"$6"}
          borderRadius={"$2"}
          pressStyle={{
            borderColor: "$colorTransparent",
            backgroundColor: "$gray6Light",
          }}
          backgroundColor={"$colorTransparent"}
          style={{
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
            transitionDuration: "150ms",
          }}
          onPress={() => {
            swiperRef.current?.scrollTo(1);
            setCurrentIndex(1);
          }}
        >
          <FontAwesome6
            name="clock-rotate-left"
            size={24}
            color={currentIndex === 1 ? "#059669" : "black"}
          />
        </Button>
        <Button
          flex={1}
          height={"$6"}
          borderRadius={"$2"}
          pressStyle={{
            borderColor: "$colorTransparent",
            backgroundColor: "$gray6Light",
          }}
          backgroundColor={"$colorTransparent"}
          style={{
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
            transitionDuration: "150ms",
          }}
          onPress={() => {
            swiperRef.current?.scrollTo(2);
            setCurrentIndex(2);
          }}
        >
          <FontAwesome6
            name="address-book"
            size={24}
            color={currentIndex === 2 ? "#059669" : "black"}
          />
        </Button>
      </View>
      <Swiper
        onIndexChanged={(index) => {
          setCurrentIndex(index);
        }}
        ref={swiperRef as any}
        loop={false}
        dotStyle={{
          display: "none",
        }}
        activeDotStyle={{
          display: "none",
        }}
      >
        {/* <Banner
          heading="Turn Study into a Habit"
          content="Let's record the time you spent studying today"
          image={require("@/assets/images/introduction/first.jpg")}
        /> */}
        <View></View>
        <ProfileStudyRecords />
        {/* <Banner
          heading="Check with Graphs"
          content="See your effort at a glance and get motivated"
          image={require("@/assets/images/introduction/third.jpg")}
        /> */}
        <View></View>
      </Swiper>
    </View>
  );
};

export default ProfileTabView;
