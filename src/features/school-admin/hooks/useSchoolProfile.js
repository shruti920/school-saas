import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { useCallback } from "react";

export const useSchoolProfile = () => {
  const { schoolId, schoolProfile, loading, error, refreshData } = useSchoolAdmin();

  const updateSchoolProfile = useCallback(async (schoolData) => {
    try {
      if (!schoolId) {
        throw new Error("School ID not available");
      }

      // Call the updateSchool service method
      const updatedSchool = await schoolAdminService.updateSchool(schoolId, schoolData);

      // Refresh data to get updated school profile
      await refreshData();

      return updatedSchool;
    } catch (err) {
      console.error("Error updating school profile:", err);
      throw err;
    }
  }, [schoolId, refreshData]);

  return {
    schoolProfile,
    loading,
    error,
    updateSchoolProfile,
    refetch: refreshData
  };
};