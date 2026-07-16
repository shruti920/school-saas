"use client";

import useAuth from "@/features/auth/hooks/useAuth";

export default function Home() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <div className="p-10 space-y-6">
      <div>
        <h2 className="font-bold text-xl">User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div>
        <h2 className="font-bold text-xl">Profile</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}