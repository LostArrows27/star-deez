import { create } from "zustand";

type FollowStatus = {
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useFollowStatus = create<FollowStatus>((set) => ({
  isFollowing: false,
  setIsFollowing: (isFollowing) => set({ isFollowing }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
