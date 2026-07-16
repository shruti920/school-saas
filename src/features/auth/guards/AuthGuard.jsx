"use client";

import useAuth from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children, roles = [] }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Already redirected in useEffect, but return null to prevent rendering children
    return null;
  }

  // Role-based access control
  if (roles.length > 0) {
    // Assuming profile.role exists
    const userRole = profile?.role;
    if (!userRole || !roles.includes(userRole)) {
      // Redirect to unauthorized page
      router.push("/unauthorized");
      // Return null to prevent rendering children while redirecting
      return null;
    }
  }

  return children;
}