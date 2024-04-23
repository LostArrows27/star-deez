import { Profile } from "@/types/supabase-util-types";
import { create } from "zustand";

type FollowerListProps = {
  followers: Profile[];
  setFollowers: (followers: Profile[]) => void;
  countFollower: number;
  countFollowing: number;
  setCountFollower: (count: number) => void;
  setCountFollowing: (count: number) => void;
};

export const useFollowerList = create<FollowerListProps>((set) => ({
  followers: [],
  setFollowers: (followers) => set({ followers }),
  countFollower: 0,
  countFollowing: 0,
  setCountFollower: (count) => set({ countFollower: count }),
  setCountFollowing: (count) => set({ countFollowing: count }),
}));
