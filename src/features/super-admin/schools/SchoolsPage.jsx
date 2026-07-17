"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon, PencilIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
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

export default function SchoolsPage() {
  const [schools, setSchools] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSchool, setEditingSchool] = React.useState(null);
  const [formData, setFormData] = React.useState(emptyForm);
  const [submitting, setSubmitting] = React.useState(false);
  const searchParams = useSearchParams();

  const supabase = React.useMemo(() => createClient(), []);

  const resetForm = React.useCallback(() => {
    setFormData(emptyForm);
    setEditingSchool(null);
  }, []);

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (school) => {
    setEditingSchool(school);
    setFormData({
      name: school.name ?? "",
      state: school.state ?? "",
      board_type: school.board_type ?? "CBSE",
      address: school.address ?? "",
      academic_year_start: school.academic_year_start ?? "",
      academic_year_end: school.academic_year_end ?? "",
      is_active: school.is_active !== false,
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
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

      if (editingSchool) {
        const { error: updateError } = await supabase
          .from("schools")
          .update(payload)
          .eq("id", editingSchool.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("schools").insert(payload);
        if (insertError) throw insertError;
      }

      setIsFormOpen(false);
      resetForm();
    } catch (submitError) {
      setError(submitError.message || "Unable to save this school right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (school) => {
    if (!window.confirm(`Deactivate ${school.name}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("schools")
        .update({ is_active: false })
        .eq("id", school.id);

      if (error) throw error;
    } catch (deleteError) {
      setError(deleteError.message || "Unable to deactivate this school.");
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadSchools = async () => {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("schools")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message || "Unable to load schools from Supabase.");
        setSchools([]);
      } else {
        setSchools(data ?? []);
      }

      setLoading(false);
    };

    loadSchools();

    const channel = supabase.channel("super-admin-schools-realtime");
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "schools" },
      (payload) => {
        if (!isMounted) return;

        if (payload.eventType === "INSERT") {
          setSchools((current) => [payload.new, ...current.filter((item) => item.id !== payload.new.id)]);
        }

        if (payload.eventType === "UPDATE") {
          setSchools((current) => current.map((item) => (item.id === payload.new.id ? payload.new : item)));
        }

        if (payload.eventType === "DELETE") {
          setSchools((current) => current.filter((item) => item.id !== payload.old.id));
        }
      }
    );

    channel.subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();
  const visibleSchools = React.useMemo(() => {
    const activeSchools = schools.filter((school) => school.is_active !== false);

    if (!searchTerm) {
      return activeSchools;
    }

    return activeSchools.filter((school) => {
      const haystack = `${school.name || ""} ${school.state || ""} ${school.board_type || ""}`.toLowerCase();
      return haystack.includes(searchTerm);
    });
  }, [schools, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schools</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Live school records from Supabase. Changes appear instantly across the panel.
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add School
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isFormOpen ? (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingSchool ? "Edit school" : "Add school"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This form writes directly to the schools table in Supabase.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingSchool ? "Save changes" : "Create school"}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
          {loading ? (
            <div className="p-6 text-sm text-gray-500 dark:text-gray-400">Loading live school records…</div>
          ) : visibleSchools.length === 0 ? (
            <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm ? `No schools match “${searchTerm}”.` : "No active schools found yet."}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Board
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {visibleSchools.map((school) => (
                  <tr key={school.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{school.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{school.state}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{school.board_type}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          school.is_active === false
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {school.is_active === false ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/super-admin/schools/${school.id}`}
                          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <CheckCircleIcon className="h-4 w-4 text-gray-500" />
                        </Link>
                        <button
                          onClick={() => openEditForm(school)}
                          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(school)}
                          className="rounded p-1 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-600 dark:hover:text-red-200"
                        >
                          <TrashIcon className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}