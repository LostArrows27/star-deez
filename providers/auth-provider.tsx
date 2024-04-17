import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { Session, User } from "@supabase/supabase-js";
import { router, usePathname } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

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

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<Profile | null>(null);
  const getUserDetails = (id: string) =>
    supabase.from("profiles").select("*").eq("id", id).maybeSingle();

  const pathname = usePathname();
  // middleware custome
  useEffect(() => {
    if (session) {
      if (userDetails) {
        if (
          pathname === "/sign-in" ||
          pathname === "/sign-up" ||
          pathname === "/forgot-password" ||
          pathname === "/"
        ) {
          router.push("/(home)/(drawer)/newfeed");
        }
      } else {
        if (pathname !== "/basic-information") {
          router.push("/(auth)/basic-information");
        }
      }
    } else {
      if (
        pathname !== "/sign-in" &&
        pathname !== "/sign-up" &&
        pathname !== "/forgot-password" &&
        pathname !== "/"
      ) {
        router.push("/");
      }
    }
  }, [pathname, session, userDetails]);

  useEffect(() => {
    const { data: res } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        (async () => {
          const { data: userData, error } = await getUserDetails(
            session.user.id
          );
          if (error || !userData) {
            return;
          } else {
            setUserDetails(userData);
          }
        })();
      }
      setUser(session?.user ? session.user : null);
      setSession(session);
      setLoading(false);
    });
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
