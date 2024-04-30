import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WeekCalendarHorizontals from "./week-calendar-horizontal";
import { useAuth } from "@/hooks/auth/useAuth";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import Loading from "../newfeed/loading";
import TopTierLearners from "./top-tier-learners";
import { Separator } from "tamagui";
import RankingItem from "./ranking-item";
import StyledPressable from "@/components/styled-pressable";
import { endOfWeek, startOfWeek } from "date-fns";
type RankedLearners = {
  id: string;
  name: string;
  avatar: string;
  time: number;
};
const formatDateForQuery = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function RankingWeek() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stickyRankVisible, setStickyRankVisible] = useState(true);
  const [ranking, setRanking] = useState<RankedLearners[]>([]);
  const { userDetails } = useAuth();
  const [myRank, setMyRank] = useState<
    RankedLearners & {
      rank: number;
    }
  >({
    id: "",
    name: "",
    avatar: "",
    time: 0,
    rank: 0,
  });
  const itemHeight = 56; // Assume each item has a fixed height
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const handleScroll = (event: any) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y + 305;
    const stickyItemThreshold = itemHeight * (myRank.rank + 1);
    if (currentScrollPosition >= stickyItemThreshold) {
      setStickyRankVisible(false);
    } else {
      setStickyRankVisible(true);
    }
  };

  useEffect(() => {
    const currentScrollPosition = 305;
    const stickyItemThreshold = itemHeight * (myRank.rank + 1);
    if (currentScrollPosition >= stickyItemThreshold) {
      setStickyRankVisible(false);
    } else {
      setStickyRankVisible(true);
    }
  }, [myRank]);

  useEffect(() => {
    (async () => {
      if (!userDetails?.id) return;
      setLoading(true);
      const queryDate = formatDateForQuery(selectedDate);

      const startWeek = formatDateForQuery(startOfWeek(queryDate));
      const endWeek = formatDateForQuery(endOfWeek(queryDate));

      const startDate = new Date(startWeek);

      const endDate = new Date(endWeek);

      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0, 0);

      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("study_records")
        .select("duration, profiles(first_name, last_name, avatar,id),id")
        .gte("time", startDate.toISOString())
        .lt("time", endDate.toISOString());

      if (error || !data) return console.log(error);

      const orderedRanked: {
        [key: string]: {
          name: string;
          avatar: string;
          time: number;
        };
      } = {};
      for (var i = 0; i < data.length; i++) {
        if (data[i].profiles) {
          if (orderedRanked.hasOwnProperty((data[i].profiles as Profile).id)) {
            orderedRanked[(data[i].profiles as Profile).id].time +=
              data[i].duration;
          } else {
            orderedRanked[(data[i].profiles as Profile).id] = {
              name: `${data[i].profiles?.first_name} ${data[i].profiles?.last_name}`,
              avatar: data[i].profiles?.avatar + "",
              time: data[i].duration,
            };
          }
        }
      }
      const rankedLearners: RankedLearners[] = Object.entries(orderedRanked)
        .map(([id, { name, avatar, time }]) => ({
          id,
          name,
          avatar,
          time,
        }))
        .sort((a, b) => b.time - a.time);

      // Find my rank
      const a = rankedLearners.findIndex(
        (learner) => learner.id === userDetails.id
      );

      setMyRank({
        ...rankedLearners[a],
        rank: a + 1,
      });

      setRanking(rankedLearners);
      setLoading(false);
    })();
  }, [selectedDate]);
  return (
    <View className="h-full p-5 bg-white">
      <WeekCalendarHorizontals
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          className="flex-1 h-full"
          onScroll={handleScroll}
        >
          <TopTierLearners learners={ranking} />
          <Separator borderWidth={"$0.5"} backgroundColor={"$color7"} />
          <View className="flex-row gap-4 mt-3">
            <Text className=" font-semibold">Total: {ranking.length}</Text>
            <Text className=" font-semibold">My rank: {myRank.rank}</Text>
          </View>
          <View className=" h-fit items-center my-5">
            {ranking.length > 0 ? (
              ranking.map((item, index) => {
                return (
                  <RankingItem
                    ranking={index + 1}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    avatar={item.avatar}
                    time={item.time}
                    topTime={ranking[0].time}
                  />
                );
              })
            ) : (
              <Text>No one learning this week</Text>
            )}
          </View>
        </ScrollView>
      )}
      {stickyRankVisible && ranking.length > 0 && (
        <StyledPressable
          onPress={() => {
            const y = itemHeight * (myRank.rank + 1) - 290; // Calculate y position of sticky rank
            scrollViewRef.current?.scrollTo({ y, animated: true });
          }}
          style={{
            position: "absolute",
            backgroundColor: "white",
            bottom: 0,
            right: 0,
            left: 0,
            paddingLeft: 20,
            paddingRight: 20,
            zIndex: 1000,
          }}
        >
          <RankingItem
            ranking={myRank.rank}
            id={myRank?.id + ""}
            avatar={myRank?.avatar + ""}
            name={myRank.name}
            time={myRank.time}
            topTime={ranking[0].time}
          />
        </StyledPressable>
      )}
    </View>
  );
}
