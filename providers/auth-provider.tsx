import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { Session, User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  user: User | undefined;
  userDetails: Profile | null;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: undefined,
  userDetails: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const [userDetails, setUserDetails] = useState<Profile | null>(null);
  const getUserDetails = (id: string) =>
    supabase.from("profiles").select("*, clubs(*)").eq("id", id).maybeSingle();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      if (data.session) {
        router.push("/dashboard");
        setUser(data.session.user);
        const { data: userData, error } = await getUserDetails(
          data.session.user.id
        );
        setUserDetails(userData);
      } else {
        router.push("/");
      }
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard");
        setUser(session.user);

        (async () => {
          const { data: userData, error } = await getUserDetails(
            session.user.id
          );
          setUserDetails(userData);
        })();
      } else {
        router.push("/");
      }
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, user, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
