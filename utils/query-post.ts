import { supabase } from "@/lib/supabase";

const queryPost = (
  type: "all" | "following" | "profiles",
  id: string | null
) => {
  const queryFunc =
    type === "all"
      ? supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
          )
          .order("created_at", { ascending: false })
      : type === "following"
      ? supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name, follower!public_follower_user_id_fkey(*)),document(id,title,cover,unit(name))"
          )
          .order("created_at", { ascending: false })
          .eq("profiles.follower.user_id", id!)
      : supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
          )
          .eq("profile_id", id!)
          .order("created_at", { ascending: false });
  return queryFunc;
};

export default queryPost;
