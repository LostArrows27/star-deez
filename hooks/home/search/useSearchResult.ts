import { Profile, SearchHistory } from "@/types/supabase-util-types";
import { create } from "zustand";

type SearchResultProps = {
  searchResults: Profile[];
  setSearchResults: (searchResults: Profile[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showHistory: boolean;
  setShowHistory: (showHistory: boolean) => void;
  history: SearchHistory[];
  setHistory: (history: SearchHistory[]) => void;
  addHistory: (data: SearchHistory) => void;
  moveToTop: (item: SearchHistory) => void;
  removeHistory: (index: number) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const useSearchResult = create<SearchResultProps>((set) => ({
  searchResults: [],
  setSearchResults: (searchResults: Profile[]) => set({ searchResults }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  showHistory: false,
  setShowHistory: (showHistory: boolean) => set({ showHistory }),
  history: [],
  setHistory: (history: SearchHistory[]) => set({ history }),
  addHistory: (data: SearchHistory) => {
    // add to the top of the list
    set((state) => {
      const history = [data, ...state.history];
      return { history };
    });
  },
  removeHistory: (index: number) => {
    set((state) => {
      const history = [...state.history];
      history.splice(index, 1);
      return { history };
    });
  },
  // move to top: move the item to the top of the list
  moveToTop: (item: SearchHistory) => {
    set((state) => {
      const history = state.history.filter((i) => i !== item);
      return { history: [item, ...history] };
    });
  },
  search: "",
  setSearch: (search: string) => set({ search }),
}));
