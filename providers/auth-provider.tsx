import { supabase } from "@/lib/supabase";
import { createContext, PropsWithChildren, useEffect } from "react";

type AuthData = {};

const AuthContext = createContext<AuthData>({});

const AuthProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const fetchSession = async () => {
      const result = await supabase.auth.getSession();
    };
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
