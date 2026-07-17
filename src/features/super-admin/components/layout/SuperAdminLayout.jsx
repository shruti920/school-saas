import * as React from "react";
import { cn } from "@/lib/utils";
import SuperAdminSidebar from "@/features/super-admin/components/sidebar/SuperAdminSidebar";
import SuperAdminHeader from "@/features/super-admin/components/header/SuperAdminHeader";
import SuperAdminFooter from "@/features/super-admin/components/layout/SuperAdminFooter";

export default function SuperAdminLayout({
  children,
  className = "",
  showSidebar = true,
  showHeader = true,
  showFooter = true
}) {
  return (
    <div className={cn("flex min-h-screen bg-gray-50 dark:bg-gray-900", className)}>
      {showSidebar && <SuperAdminSidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && <SuperAdminHeader />}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        {showFooter && <SuperAdminFooter />}
      </div>
    </div>
  );
}