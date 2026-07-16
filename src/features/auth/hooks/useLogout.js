import { useState } from "react";
import { logout } from "@/features/auth/services/authService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth(); // We can use this to refresh the profile after logout? Actually, we want to clear the user.
  const router = useRouter();

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      // The auth state change will be handled by AuthProvider via onAuthStateChange
      // We can optionally redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally, show an error message
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    handleLogout,
  };
}