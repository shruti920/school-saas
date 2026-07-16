"use client";

import { createContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "../utils/getProfile";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      try {
        const profile = await getProfile(user.id);
        setProfile(profile);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile: loadSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}