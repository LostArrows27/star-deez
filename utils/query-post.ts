import { supabase } from "@/lib/supabase";

const queryPost = (
  type: "all" | "following" | "profiles",
  id: string | null,
  listFollowing? : string[]
) => {
  
        if(type === "all") {
          return supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
          )
          .order("created_at", { ascending: false })
        }else if(type === "following" && listFollowing) {
          
          return supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
          )
          .in("user_id", [...listFollowing,id])
          .order("created_at", { ascending: false })
        }
        else {
          return  supabase
          .from("study_records")
          .select(
            "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
          )
          .eq("user_id", id!)
          .order("created_at", { ascending: false });
        }

};

export default queryPost;
