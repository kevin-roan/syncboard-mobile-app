import "react-native-url-polyfill/auto";
import { useState, useEffect, createContext } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
