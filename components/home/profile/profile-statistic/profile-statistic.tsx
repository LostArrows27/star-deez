import { forwardRef, useState } from "react";
import { View } from "react-native";
import useUserID from "@/hooks/auth/useUserID";
import { RecordProps } from "@/hooks/home/statistic/calendar-stats/useDateStats";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import StudyTimeChart from "../../statistic/study-time/study-time-chart";
import DocumentPieChartStats from "../../statistic/document-stats/document-pie-chart-stats";
import YearGraph from "../../statistic/year-graph/year-graph";

const ProfileStatistic = () => {
  const [records, setRecords] = useState<RecordProps[]>([]);
  const [load, setLoad] = useState<boolean>(true);

  const { profile } = useProfileData();

  const id = useUserID();

  useGetInitData(async (user) => {
    setLoad(true);
    let query = supabase
      .from("study_records")
      .select("id, created_at, time, duration, document(title)")
      .eq("user_id", profile!.id);

    if (user.id !== profile!.id) query = query.eq("visibility", "public");

    const { data, error } = await query;

    if (!error) {
      setRecords(data);
    }

    setLoad(false);
  });

  return (
    <View className="w-full">
      <StudyTimeChart
        isUser={profile?.id === id}
        load={load}
        records={records}
      />
      <DocumentPieChartStats
        isUser={profile?.id === id}
        load={load}
        records={records}
      />
      <YearGraph isUser={profile?.id === id} load={load} records={records} />
    </View>
  );
};

export default forwardRef(ProfileStatistic);
