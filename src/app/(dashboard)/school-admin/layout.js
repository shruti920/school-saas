import AuthGuard from "@/features/auth/guards/AuthGuard";
import SchoolAdminLayout from "@/features/school-admin/components/layout/SchoolAdminLayout";

export default function SchoolAdminProtectedLayout({ children }) {
  return (
    <AuthGuard roles={["admin"]}>
      <SchoolAdminLayout>
        {children}
      </SchoolAdminLayout>
    </AuthGuard>
  );
}