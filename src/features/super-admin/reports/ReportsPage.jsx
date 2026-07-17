"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

const reportCategories = [
  {
    key: "academic",
    title: "Academic Performance",
    description: "Live school, student, and teacher totals across the franchise.",
    accent: "blue",
  },
  {
    key: "financial",
    title: "Financial Overview",
    description: "Revenue-linked school activity and fee-payment visibility from Supabase.",
    accent: "green",
  },
  {
    key: "attendance",
    title: "Attendance Tracking",
    description: "Attendance status counts from the live attendance table.",
    accent: "purple",
  },
];

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = React.useState("academic");
  const [loading, setLoading] = React.useState(true);
  const [reportData, setReportData] = React.useState({
    schools: 0,
    students: 0,
    teachers: 0,
    attendance: { present: 0, absent: 0, late: 0, half_day: 0, on_leave: 0 },
    feePayments: 0,
  });
  const [error, setError] = React.useState("");

  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      setLoading(true);
      setError("");

      const [schoolsResponse, studentsResponse, teachersResponse, attendanceResponse, feePaymentsResponse] = await Promise.all([
        supabase.from("schools").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("students").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "teacher").eq("is_active", true),
        supabase.from("attendance").select("status"),
        supabase.from("fee_payments").select("id", { count: "exact", head: true }),
      ]);

      if (!isMounted) return;

      if (schoolsResponse.error || studentsResponse.error || teachersResponse.error) {
        setError("Live report data could not be loaded from Supabase.");
      }

      const attendanceCounts = (attendanceResponse.data ?? []).reduce(
        (accumulator, entry) => {
          const status = entry.status ?? "present";
          accumulator[status] = (accumulator[status] ?? 0) + 1;
          return accumulator;
        },
        { present: 0, absent: 0, late: 0, half_day: 0, on_leave: 0 }
      );

      setReportData({
        schools: schoolsResponse.count ?? 0,
        students: studentsResponse.count ?? 0,
        teachers: teachersResponse.count ?? 0,
        attendance: attendanceCounts,
        feePayments: feePaymentsResponse.count ?? 0,
      });
      setLoading(false);
    };

    loadReports();

    const channel = supabase.channel("super-admin-reports-realtime");
    channel.on("postgres_changes", { event: "*", schema: "public", table: "schools" }, () => loadReports());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "students" }, () => loadReports());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => loadReports());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "attendance" }, () => loadReports());
    channel.on("postgres_changes", { event: "*", schema: "public", table: "fee_payments" }, () => loadReports());
    channel.subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleExport = () => {
    const rows = [
      `Report: ${activeCategory}`,
      `Schools: ${reportData.schools}`,
      `Students: ${reportData.students}`,
      `Teachers: ${reportData.teachers}`,
      `Fee Payments: ${reportData.feePayments}`,
      `Attendance Present: ${reportData.attendance.present}`,
      `Attendance Absent: ${reportData.attendance.absent}`,
      `Attendance Late: ${reportData.attendance.late}`,
    ];

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`<!doctype html><html><head><title>School report</title><style>body{font-family:Arial;padding:24px;}h1{margin-bottom:8px;}pre{white-space:pre-wrap;}</style></head><body><h1>School Management Report</h1><pre>${rows.join("\n")}</pre></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold">Reports</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Live franchise reports from Supabase. The cards below reflect the current school, student, teacher, attendance, and fee-payment data.
        </p>
      </div>

      {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportCategories.map((category) => (
          <div key={category.key} className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg dark:bg-gray-800">
            <div className="flex items-start space-x-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded ${category.accent === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : category.accent === "green" ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400" : "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1-2-2-2zm0 2a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm0 4a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm0 4a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-medium">{category.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                <button
                  onClick={() => setActiveCategory(category.key)}
                  className="mt-2 rounded bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-800/50"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Live report view</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Currently showing the {activeCategory} overview.</p>
          </div>
          <button
            onClick={handleExport}
            className="rounded bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading live data…</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="mb-3 font-semibold">Snapshot</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Active schools: {reportData.schools}</li>
                <li>Active students: {reportData.students}</li>
                <li>Active teachers: {reportData.teachers}</li>
                <li>Fee payments logged: {reportData.feePayments}</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="mb-3 font-semibold">Attendance breakdown</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Present: {reportData.attendance.present}</li>
                <li>Absent: {reportData.attendance.absent}</li>
                <li>Late: {reportData.attendance.late}</li>
                <li>Half day: {reportData.attendance.half_day}</li>
                <li>On leave: {reportData.attendance.on_leave}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}