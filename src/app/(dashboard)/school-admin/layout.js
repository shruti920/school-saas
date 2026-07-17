import AuthGuard from "@/features/auth/guards/AuthGuard";
import SchoolAdminLayout from "@/features/school-admin/components/layout/SchoolAdminLayout";
import { SchoolAdminProvider } from "@/features/school-admin/contexts/SchoolAdminContext";

export default function SchoolAdminProtectedLayout({ children }) {
  return (
    <AuthGuard roles={["admin"]}>
      <SchoolAdminProvider>
        <SchoolAdminLayout>
          {children}
        </SchoolAdminLayout>
      </SchoolAdminProvider>
    </AuthGuard>
  );
}