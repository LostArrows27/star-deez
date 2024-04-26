import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Circle } from "tamagui";
import { Pen, Plus, X, AlarmClock } from "@tamagui/lucide-icons";
import { Animated, View } from "react-native";

export default function CreateStudyRecordBtn() {
  const [open, setOpen] = useState(false);
  const icon1Anim = useRef(new Animated.Value(0)).current;
  const icon2Anim = useRef(new Animated.Value(0)).current;
  const toggleMenu = () => {
    if (!open) {
      Animated.parallel([
        Animated.spring(icon1Anim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(icon2Anim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(icon2Anim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(icon1Anim, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setOpen(!open);
  };

  const icon1Style = {
    transform: [
      {
        translateY: icon1Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
    opacity: icon1Anim,
  };

  const icon2Style = {
    transform: [
      {
        translateY: icon2Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
    opacity: icon2Anim,
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 32,
        right: 32,
        alignItems: "center",
        gap: 16,
      }}
    >
      <Animated.View style={icon1Style}>
        <Link asChild href={"/(modal)/tracking/create-study-record"}>
          <Circle
            size={50}
            backgroundColor={"$color8"}
            pressStyle={{ backgroundColor: "$green7Light" }}
            overflow="hidden"
          >
            <Pen size={"$1"} color={"#fff"} />
          </Circle>
        </Link>
      </Animated.View>
      <Animated.View style={icon2Style}>
        <Link asChild href={"/(home)/(live-session)/live-study"}>
          <Circle
            size={50}
            backgroundColor={"$color8"}
            pressStyle={{ backgroundColor: "$green7Light" }}
            overflow="hidden"
          >
            <AlarmClock size={"$1"} color={"#fff"} />
          </Circle>
        </Link>
      </Animated.View>
      <Circle
        onPress={toggleMenu}
        size={50}
        backgroundColor={"$color8"}
        elevation="$1"
        pressStyle={{ backgroundColor: "$green7Light" }}
        overflow="hidden"
      >
        {open ? (
          <X size={"$1"} color={"#fff"} />
        ) : (
          <Plus size={"$1"} color={"#fff"} />
        )}
      </Circle>
    </View>
  );
}
