import { authRoute, unverifiedRoute, verifedRoute } from "@/constants/Route";
import { supabase, supabaseClient } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { useAuth } from "@clerk/clerk-expo";
import { Session, User } from "@supabase/supabase-js";
import { router, usePathname } from "expo-router";
import { createContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  user: User | null;
  userDetails: Profile | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserDetails: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: null,
  userDetails: null,
  setSession: () => {},
  setUser: () => {},
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
  const { getToken, sessionId, userId, isSignedIn, isLoaded, signOut } =
    useAuth();
  const fetchData = async () => {
    // TODO #1: Replace with your JWT template name
    const token = await getToken({ template: "supabase" });
    console.log(sessionId, userId, "e;;fpe");
    // signOut();

    // // TODO #2: Replace with your database table name
    // const { data, error } = await supabase.from("your_table").select();

    // TODO #3: Handle the response
  };

  // middleware custome
  useEffect(() => {
    if (loading) return;

    if (!session && authRoute.includes(pathname)) return;

    if (!session) return router.replace("/");

    if (session && !userDetails && unverifiedRoute.includes(pathname)) return;

    if (session && !userDetails) return router.replace("/basic-information");

    if (session && userDetails && verifedRoute.includes(pathname)) return;

    if (session && userDetails)
      return router.replace("/(home)/(drawer)/newfeed");
  }, [pathname, session?.access_token]);

  // useEffect(() => {
  //   if (!sessionId || !userId) return;
  //   fetchData();
  // }, [sessionId, userId]);
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
      value={{
        session,
        loading,
        user,
        userDetails,
        setUserDetails,
        setSession,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
