"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChalkboardIcon,
  StoolIcon,
  DiceOneIcon,
  SignOutIcon,
  LogIcon,
  TagChevronIcon,
} from "@phosphor-icons/react";
import { logout } from "@/features/auth/services/authService";

export default function SuperAdminSidebar() {
  const router = useRouter();
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const menuItems = [
    {
      name: "Dashboard",
      href: "/super-admin",
      icon: ChalkboardIcon,
      active: activeItem === "dashboard",
    },
    {
      name: "Schools",
      href: "/super-admin/schools",
      icon: StoolIcon,
      active: activeItem === "schools",
    },
    {
      name: "Reports",
      href: "/super-admin/reports",
      icon: DiceOneIcon,
      active: activeItem === "reports",
    },
    {
      name: "Settings",
      href: "/super-admin/settings",
      icon: LogIcon,
      active: activeItem === "settings",
    },
  ];

  const handleItemClick = (key) => {
    setActiveItem(key);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
          School ERP
        </span>
      </div>

      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name.toLowerCase()}
            href={item.href}
            className={cn(
              "flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300",
              item.active && "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
            )}
            onClick={() => handleItemClick(item.name.toLowerCase().replace(/\s+/g, ""))}
          >
            <item.icon className="h-5 w-5 shrink-0 mr-3" />
            <span>{item.name}</span>
            <TagChevronIcon className="ml-auto h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0 rotate-[270deg]" />
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          <SignOutIcon className="mr-3 h-5 w-5 shrink-0" />
          <span>Logout</span>
          <TagChevronIcon className="ml-auto h-4 w-4 rotate-[270deg] text-gray-400 dark:text-gray-500 shrink-0" />
        </button>
      </div>
    </aside>
  );
}