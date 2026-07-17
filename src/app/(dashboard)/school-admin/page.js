import SchoolAdminDashboard from "@/features/school-admin/components/dashboard/SchoolAdminDashboard";
import { SchoolAdminProvider } from "@/features/school-admin/contexts/SchoolAdminContext";

export default function SchoolAdminIndexPage() {
  return (
    <SchoolAdminProvider>
      <SchoolAdminDashboard />
    </SchoolAdminProvider>
  );
}