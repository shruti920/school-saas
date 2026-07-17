"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MagnifyingGlass, TagChevronIcon, UserIcon } from "@phosphor-icons/react";
import useAuth from "@/features/auth/hooks/useAuth";
import { logout } from "@/features/auth/services/authService";
import ThemeToggle from "@/components/theme-toggle";

export default function SuperAdminHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(() => {
    // Initialize with search param if available
    if (typeof window !== 'undefined') {
      // For client-side, we can access searchParams
      // This is a bit tricky in Next.js, so we'll use useEffect instead
      return "";
    }
    return "";
  });

  const userName = user?.name || user?.email || "Admin";

  React.useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
  }, [searchParams]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((current) => !current);
  };

  const handleSearch = () => {
    const normalizedQuery = searchQuery.trim();
    const target = normalizedQuery
      ? `/super-admin/schools?search=${encodeURIComponent(normalizedQuery)}`
      : "/super-admin/schools";

    router.push(target);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <div className="shrink-0">
            <Link href="/super-admin" className="flex items-center space-x-2">
              <span className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SchoolSaaS</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/super-admin/dashboard" className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
                pathname === "/super-admin/dashboard" ? "border-b-2 border-blue-500" : ""
              }`}>
              Dashboard
            </Link>
            <Link href="/super-admin/schools" className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
                pathname === "/super-admin/schools" ? "border-b-2 border-blue-500" : ""
              }`}>
              Schools
            </Link>
            <Link href="/super-admin/reports" className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
                pathname === "/super-admin/reports" ? "border-b-2 border-blue-500" : ""
              }`}>
              Reports
            </Link>
            <Link href="/super-admin/settings" className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
                pathname === "/super-admin/settings" ? "border-b-2 border-blue-500" : ""
              }`}>
              Settings
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Search schools, students..."
              className="h-10 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600 dark:text-gray-500"
              aria-label="Search"
            >
              <MagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <UserIcon className="h-4 w-4 text-gray-500" />
            {userName}
            <TagChevronIcon className="ml-1 h-4 w-4 text-gray-500 transition-transform duration-200"
              rotate={isProfileDropdownOpen ? 180 : 0}
            />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Profile Dropdown Menu */}
      {isProfileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40 origin-top-right md:top-2.5 md:right-0">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-label="User menu">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-left w-full cursor-pointer hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}