import AuthGuard from "@/features/auth/guards/AuthGuard";

export default function TeacherLayout({ children }) {
  return (
    <AuthGuard roles={["teacher"]}>
      {children}
    </AuthGuard>
  );
}