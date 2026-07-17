"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

export default function SuperAdminDashboardPage() {
  const [stats, setStats] = React.useState({ schools: 0, students: 0, teachers: 0 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      setLoading(true);
      setError("");

      const [schoolsResponse, studentsResponse, teachersResponse] = await Promise.all([
        supabase.from("schools").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("students").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "teacher").eq("is_active", true),
      ]);

      if (!isMounted) return;

      if (schoolsResponse.error || studentsResponse.error || teachersResponse.error) {
        setError("Unable to load live dashboard stats from Supabase.");
      } else {
        setStats({
          schools: schoolsResponse.count ?? 0,
          students: studentsResponse.count ?? 0,
          teachers: teachersResponse.count ?? 0,
        });
      }

      setLoading(false);
    };

    loadStats();

    const channel = supabase.channel("super-admin-dashboard-realtime");
    channel.on("postgres_changes", { event: "*", schema: "public", table: "schools" }, () => loadStats());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "students" }, () => loadStats());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => loadStats());
    channel.subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold">Super Admin Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Live metrics from Supabase now drive this workspace. School, student, and teacher changes appear instantly.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-2 font-medium">Active Schools</h3>
          <p className="text-2xl font-bold text-emerald-600">{loading ? "—" : stats.schools}</p>
          <p className="text-xs text-green-500">Live count from the schools table</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-2 font-medium">Active Students</h3>
          <p className="text-2xl font-bold text-blue-600">{loading ? "—" : stats.students}</p>
          <p className="text-xs text-green-500">Live count from the students table</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-2 font-medium">Active Teachers</h3>
          <p className="text-2xl font-bold text-purple-600">{loading ? "—" : stats.teachers}</p>
          <p className="text-xs text-green-500">Live count from the profiles table</p>
        </div>
      </div>
    </div>
  );
}