import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  authenticated: boolean;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  session: null,
  loading: true,
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      // setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      // setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!session,
        session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
