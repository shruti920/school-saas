"use client";

import SchoolAdminHeader from "@/features/school-admin/components/header/SchoolAdminHeader";
import SchoolAdminSidebar from "@/features/school-admin/components/sidebar/SchoolAdminSidebar";
import SchoolAdminFooter from "@/features/school-admin/components/layout/SchoolAdminFooter";
import SchoolAdminBreadcrumb from "@/features/school-admin/components/layout/SchoolAdminBreadcrumb";

export default function SchoolAdminLayout({ children, breadcrumbTitle, breadcrumbHref, showFooter = true }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row lg:h-screen">
        {/* Sidebar */}
        <SchoolAdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SchoolAdminHeader />
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
        <SchoolAdminHeader />
        <div className="flex-1 overflow-y-auto p-4">
          <SchoolAdminBreadcrumb title={breadcrumbTitle} href={breadcrumbHref} />
          <main className="mt-4 space-y-6">{children}</main>
        </div>
        {showFooter && (
          <SchoolAdminFooter />
        )}
      </div>
    </div>
  );
}