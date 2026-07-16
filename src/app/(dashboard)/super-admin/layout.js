import AuthGuard from "@/features/auth/guards/AuthGuard";

export default function SuperAdminLayout({ children }) {
  return (
    <AuthGuard roles={["super_admin"]}>
      {children}
    </AuthGuard>
  );
}