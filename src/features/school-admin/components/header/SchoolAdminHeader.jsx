"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, UserCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SchoolAdminHeader({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleOnSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleNotificationClick = () => {
    // Handle notification click
    console.log("Notifications clicked");
  };

  const handleProfileClick = () => {
    // Handle profile click
    console.log("Profile clicked");
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="lg:hidden h-16 bg-sidebar border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <button
          className="p-2 rounded-md hover:bg-sidebar/50 shrink-0"
          onClick={handleMenuToggle}
        >
          <Menu className="h-4 w-4 text-sidebar-foreground" />
        </button>

        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">
            School Admin
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <form onSubmit={handleOnSearch} className="hidden lg:flex items-center space-x-2">
          <Search className="h-4 w-4 text-sidebar-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1 bg-muted border border-border rounded-md text-sidebar-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="p-2 rounded-md hover:bg-sidebar/50">
            <Search className="h-4 w-4 text-sidebar-foreground" />
          </button>
        </form>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-md hover:bg-sidebar/50"
          onClick={handleNotificationClick}
        >
          <Bell className="h-4 w-4 text-sidebar-foreground" />
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center">
            <div className="h-2 w-2 bg-primary rounded-full" />
          </div>
        </button>

        {/* Theme Toggle */}
        <button
          className="p-2 rounded-md hover:bg-sidebar/50"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            className="p-2 rounded-md hover:bg-sidebar/50"
            onClick={handleProfileClick}
          >
            <UserCircle className="h-4 w-4 text-sidebar-foreground" />
          </button>
          {/* Profile dropdown would go here */}
        </div>
      </div>
    </header>
  );
}

// Menu icon component since we don't have it in lucide-react yet
function Menu({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}