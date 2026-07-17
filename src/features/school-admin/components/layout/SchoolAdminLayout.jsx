"use client";

import * as React from "react";
import SchoolAdminHeader from "@/features/school-admin/components/header/SchoolAdminHeader";
import SchoolAdminSidebar from "@/features/school-admin/components/sidebar/SchoolAdminSidebar";
import SchoolAdminFooter from "@/features/school-admin/components/layout/SchoolAdminFooter";
import SchoolAdminBreadcrumb from "@/features/school-admin/components/layout/SchoolAdminBreadcrumb";

export default function SchoolAdminLayout({ children, breadcrumbTitle, breadcrumbHref, showFooter = true }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row lg:h-screen">
        {/* Sidebar */}
        <SchoolAdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SchoolAdminHeader isSidebarOpen={isMobileSidebarOpen} setIsSidebarOpen={setIsMobileSidebarOpen} />
          <div className="flex-1 overflow-y-auto p-4">
            <SchoolAdminBreadcrumb title={breadcrumbTitle} href={breadcrumbHref} />
            <main className="mt-4 space-y-6">{children}</main>
          </div>
          {showFooter && (
            <SchoolAdminFooter />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <SchoolAdminHeader isSidebarOpen={isMobileSidebarOpen} setIsSidebarOpen={setIsMobileSidebarOpen} />
        <div className="flex-1 overflow-y-auto p-4">
          <SchoolAdminBreadcrumb title={breadcrumbTitle} href={breadcrumbHref} />
          <main className="mt-4 space-y-6">{children}</main>
        </div>
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20" onClick={() => setIsMobileSidebarOpen(false)}>
            <SchoolAdminSidebar className="w-64" />
          </div>
        )}
        {showFooter && (
          <SchoolAdminFooter />
        )}
      </div>
    </div>
  );
}