"use client";

import SuperAdminLayout from "@/features/super-admin/components/layout/SuperAdminLayout";
import SuperAdminSidebar from "@/features/super-admin/components/sidebar/SuperAdminSidebar";
import SuperAdminHeader from "@/features/super-admin/components/header/SuperAdminHeader";

export default function SuperAdminDashboardLayout({ children }) {
  return (
    <SuperAdminLayout>
      {children}
    </SuperAdminLayout>
  );
}

// Export the layout so it can be used in app/layout.js if needed
export { SuperAdminDashboardLayout };