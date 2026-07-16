import AuthGuard from "@/features/auth/guards/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard roles={["admin"]}>
      {children}
    </AuthGuard>
  );
}