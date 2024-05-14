import { useAuth } from "@/hooks/auth/useAuth";
import { useGetInitData } from "@/hooks/useGetInitData";
import { useRealTime } from "@/hooks/useRealTime";
import { supabase } from "@/lib/supabase";
import { Notification } from "@/types/supabase-util-types";
import { useState } from "react";

export const useCountNewNotification = () => {
  const [count, setCount] = useState(0);

  const { userDetails } = useAuth();

  useGetInitData(async (user) => {
    const { data, error } = await supabase
      .from("notification")
      .select("is_seen", { count: "exact" })
      .eq("receiver_id", user?.id)
      .eq("is_seen", false);

    if (!error) {
      setCount(data.length);
    }
  });

  useRealTime({
    channel: "notification_count_" + userDetails?.id,
    table: "notification",
    filter: "receiver_id=eq." + userDetails?.id,
    onInsert: async (payload) => {
      setCount((prev) => prev + 1);
    },
    onDelete: async (payload) => {
      setCount((prev) => prev - 1);
    },
    onUpdate: async (payload) => {
      let newData = payload.new as Notification;

      if (newData) {
        if (newData.is_seen) {
          setCount((prev) => prev - 1);
        } else {
          setCount((prev) => prev + 1);
        }
      }
    },
  });

  return { count, setCount };
};
