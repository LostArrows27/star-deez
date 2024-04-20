import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import { Profile } from "@/types/supabase-util-types";

export const useGetInitData = (
  func: (userDetails: Profile) => Promise<void>
) => {
  const { userDetails } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userDetails) return;
      setLoading(true);
      await func(userDetails);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?.id]);

  return { loading };
};
