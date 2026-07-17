"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";

const emptyForm = {
  name: "",
  state: "",
  board_type: "CBSE",
  address: "",
  academic_year_start: "",
  academic_year_end: "",
  is_active: true,
};

export default function SchoolDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id;
  const [school, setSchool] = React.useState(null);
  const [counts, setCounts] = React.useState({ students: 0, teachers: 0 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(emptyForm);
  const [submitting, setSubmitting] = React.useState(false);

  const supabase = React.useMemo(() => createClient(), []);

  const loadDetails = React.useCallback(async () => {
    if (!schoolId) return;

    setLoading(true);
    setError("");

    const [schoolResponse, studentResponse, teacherResponse] = await Promise.all([
      supabase.from("schools").select("*").eq("id", schoolId).maybeSingle(),
      supabase.from("students").select("id", { count: "exact", head: true }).eq("school_id", schoolId),
      supabase.from("profiles").select("id", { count: "exact", head: true }).eq("school_id", schoolId).eq("role", "teacher"),
    ]);

    if (schoolResponse.error) {
      setError(schoolResponse.error.message || "Unable to load this school.");
      setSchool(null);
      setLoading(false);
      return;
    }

    setSchool(schoolResponse.data);
    setCounts({
      students: studentResponse.count ?? 0,
      teachers: teacherResponse.count ?? 0,
    });
    setFormData({
      name: schoolResponse.data?.name ?? "",
      state: schoolResponse.data?.state ?? "",
      board_type: schoolResponse.data?.board_type ?? "CBSE",
      address: schoolResponse.data?.address ?? "",
      academic_year_start: schoolResponse.data?.academic_year_start ?? "",
      academic_year_end: schoolResponse.data?.academic_year_end ?? "",
      is_active: schoolResponse.data?.is_active !== false,
    });
    setLoading(false);
  }, [schoolId, supabase]);

  React.useEffect(() => {
    let isMounted = true;
    let channel = null;

    const subscribe = async () => {
      await loadDetails();
      if (!schoolId || !isMounted) return;

      channel = supabase.channel(`school-details-${schoolId}`);
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "schools", filter: `id=eq.${schoolId}` },
        () => {
          if (isMounted) {
            loadDetails();
          }
        }
      );
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "students", filter: `school_id=eq.${schoolId}` },
        () => {
          if (isMounted) {
            loadDetails();
          }
        }
      );
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles", filter: `school_id=eq.${schoolId}` },
        () => {
          if (isMounted) {
            loadDetails();
          }
        }
      );
      channel.subscribe();
    };

    subscribe();

    return () => {
      isMounted = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [loadDetails, schoolId, supabase]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: formData.name.trim(),
        state: formData.state.trim(),
        board_type: formData.board_type,
        address: formData.address.trim() || null,
        academic_year_start: formData.academic_year_start || null,
        academic_year_end: formData.academic_year_end || null,
        is_active: formData.is_active,
      };

      const { error: updateError } = await supabase.from("schools").update(payload).eq("id", schoolId);
      if (updateError) throw updateError;
      setIsEditing(false);
    } catch (saveError) {
      setError(saveError.message || "Unable to update this school right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm(`Deactivate ${school?.name}?`)) {
      return;
    }

    try {
      const { error } = await supabase.from("schools").update({ is_active: false }).eq("id", schoolId);
      if (error) throw error;
      router.push("/super-admin/schools");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to deactivate this school.");
    }
  };

  const getStatusBadgeClass = (isActive) => {
    if (isActive === false) {
      return "bg-red-100 text-red-700";
    }
    return "bg-green-100 text-green-700";
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading school details…</div>;
  }

  if (!school) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-gray-500">School not found</h1>
        <p className="mt-4 text-gray-400">The requested school could not be found in Supabase.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white shadow-sm dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex flex-col">
              <Link
                href="/super-admin/schools"
                className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Schools</span>
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{school.name}</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {school.state} • {school.board_type}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing((current) => !current)}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Deactivate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        ) : null}

        {isEditing ? (
          <form onSubmit={handleSave} className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit school details</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Updates are sent straight to Supabase.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">School name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">State</span>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">Board</span>
                <select
                  name="board_type"
                  value={formData.board_type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="STATE">State Board</option>
                </select>
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">Status</span>
                <select
                  name="is_active"
                  value={formData.is_active ? "active" : "inactive"}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, is_active: event.target.value === "active" }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 md:col-span-2">
                <span className="mb-1 block">Address</span>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">Academic year start</span>
                <input
                  name="academic_year_start"
                  type="date"
                  value={formData.academic_year_start}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mb-1 block">Academic year end</span>
                <input
                  name="academic_year_end"
                  type="date"
                  value={formData.academic_year_end}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </label>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        ) : null}

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{school.is_active === false ? "Inactive" : "Active"}</p>
            <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(school.is_active)}`}>
              {school.is_active === false ? "Disabled" : "Live"}
            </span>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Students</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{counts.students}</p>
            <p className="mt-1 text-xs text-green-500">Synced from students table</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Teachers</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{counts.teachers}</p>
            <p className="mt-1 text-xs text-green-500">Synced from profiles table</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Board</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{school.board_type}</p>
            <p className="mt-1 text-xs text-gray-500">Per-school config from Supabase</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">School profile</h3>
            <dl className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Address</dt>
                <dd className="text-right">{school.address || "Not provided"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Academic year</dt>
                <dd className="text-right">
                  {school.academic_year_start && school.academic_year_end
                    ? `${school.academic_year_start} → ${school.academic_year_end}`
                    : "Not set"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="text-right">{school.created_at ? new Date(school.created_at).toLocaleDateString() : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Updated</dt>
                <dd className="text-right">{school.updated_at ? new Date(school.updated_at).toLocaleString() : "—"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Live status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This page listens for Supabase changes on the schools, students, and profiles tables. Any inserts, edits, or deactivations appear here without a manual refresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}