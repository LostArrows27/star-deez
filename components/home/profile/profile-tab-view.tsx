import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, H4, Separator } from "tamagui";
import Swiper from "react-native-swiper";
import { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import ProfileStudyRecords from "./profile-study-records";
import ProfileStatistic from "./profile-statistic/profile-statistic";
import { Animated } from "react-native";
import ProfileInformation from "./profile-information/profile-information";

const ProfileTabView = () => {
  const swiperRef = useRef<any>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [heights, setHeights] = useState([0, 0, 0]);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: heights[currentIndex],
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, heights]);

  const handleLayout = (index: any) => (event: any) => {
    const { height } = event.nativeEvent.layout;
    const newHeights = [...heights];
    newHeights[index] = height;
    setHeights(newHeights);
  };

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
      <View style={{ flex: 1 }}>
        <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
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
            <View onLayout={handleLayout(0)}>
              <ProfileStatistic />
            </View>
            <View onLayout={handleLayout(1)}>
              <H4 px={"$4"} pb={"$5"} pt={"$2"}>
                Study records
              </H4>
              <Separator mb={"$4"} />
              <ProfileStudyRecords />
            </View>
            <View onLayout={handleLayout(2)}>
              <ProfileInformation />
            </View>
          </Swiper>
        </Animated.View>
      </View>
    </View>
  );
};

export default ProfileTabView;
