import AuthGuard from "@/features/auth/guards/AuthGuard";

export default function StudentLayout({ children }) {
  return (
    <AuthGuard roles={["student"]}>
      {children}
    </AuthGuard>
  );
}