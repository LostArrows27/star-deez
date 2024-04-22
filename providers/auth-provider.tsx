import { authRoute, unverifiedRoute, verifedRoute } from "@/constants/Route";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { Session, User } from "@supabase/supabase-js";
import { router, usePathname } from "expo-router";
import { createContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  user: User | null;
  userDetails: Profile | null;
  setUserDetails: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: null,
  userDetails: null,
  setUserDetails: () => {},
});

const AuthProvider = ({
  children,
  loading,
  setLoading,
}: {
  children: React.ReactNode;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<Profile | null>(null);
  const getUserDetails = (id: string) =>
    supabase.from("profiles").select("*").eq("id", id).maybeSingle();

  const pathname = usePathname();

  // middleware custome
  useEffect(() => {
    if (loading) return;

    if (!session && authRoute.includes(pathname)) return;

    if (!session) return router.replace("/");

    if (session && !userDetails && unverifiedRoute.includes(pathname)) return;

    if (session && !userDetails) return router.replace("/basic-information");

    // so that we don't need to update the route in the future => verified route = !unverifiedRoute + !authRoute
    if (
      session &&
      userDetails &&
      !authRoute.includes(pathname) &&
      !unverifiedRoute.includes(pathname)
    )
      return;

    if (session && userDetails)
      return router.replace("/(home)/(drawer)/newfeed/(tabs)/all");
  }, [pathname, session?.access_token]);

  useEffect(() => {
    const { data: res } = supabase.auth.onAuthStateChange(
      async (_event, sessionChange) => {
        if (sessionChange) {
          setLoading(true);
          const { data: userData, error } = await getUserDetails(
            sessionChange.user.id
          );
          setLoading(false);
          if (error || !userData) {
            setUserDetails(null);
          } else {
            setUserDetails(userData);
          }
        }
        if (!sessionChange) {
          setUserDetails(null);
        }
        setUser(sessionChange?.user ? sessionChange.user : null);
        setSession(sessionChange);

        setLoading(false);
      }
    );
    return () => {
      res.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, user, userDetails, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
