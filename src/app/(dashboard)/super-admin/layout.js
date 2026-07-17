import AuthGuard from "@/features/auth/guards/AuthGuard";
import SuperAdminLayout from "@/features/super-admin/components/layout/SuperAdminLayout";

export default function SuperAdminProtectedLayout({ children }) {
  return (
    <AuthGuard roles={["super_admin"]}>
      <SuperAdminLayout>
        {children}
      </SuperAdminLayout>
    </AuthGuard>
  );
}