import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";
import { useEffect } from "react";
import { useAuth } from "./auth/useAuth";
import { supabase } from "@/lib/supabase";

// NOTE: channel -> realtime_name

export async function useRealTime({
  channel,
  table,
  filter,
  onUpdate,
  onInsert,
  onDelete,
}: RealTimeProps) {
  const { userDetails } = useAuth();

  useEffect(() => {
    if (userDetails && userDetails?.id) {
      const realtimeChannel = supabase
        .channel(channel + "_" + userDetails?.id)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: table,
            filter: filter,
          },
          async (payload) => {
            if (payload.eventType === "UPDATE") {
              if (!onUpdate) return;
              await onUpdate(payload);
            }
            if (payload.eventType === "INSERT") {
              if (!onInsert) return;
              await onInsert(payload);
            }
            if (payload.eventType === "DELETE") {
              if (!onDelete) return;
              await onDelete(payload);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(realtimeChannel);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?.id]);
}

type RealTimeProps = {
  channel: string;
  table: string;
  filter: string;
  onUpdate?: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => Promise<any>;
  onInsert?: (
    payload:
      | RealtimePostgresInsertPayload<{
          [key: string]: any;
        }>
      | RealtimePostgresDeletePayload<{
          [key: string]: any;
        }>
  ) => Promise<any>;
  onDelete?: (
    payload: RealtimePostgresDeletePayload<{
      [key: string]: any;
    }>
  ) => Promise<any>;
};
