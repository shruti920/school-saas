import { useState, useEffect, useContext } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { SchoolAdminContext } from "@/features/school-admin/contexts/SchoolAdminContext";

export const useAcademicYear = () => {
  const { schoolId } = useContext(SchoolAdminContext);
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [academicYears, currentYear] = await Promise.all([
          schoolAdminService.getAcademicYears(schoolId),
          schoolAdminService.getCurrentAcademicYear(schoolId)
        ]);
        setData(academicYears);
        setCurrent(currentYear);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
        setCurrent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  const refetch = async () => {
    if (!schoolId) return;
    setLoading(true);
    try {
      const [academicYears, currentYear] = await Promise.all([
        schoolAdminService.getAcademicYears(schoolId),
        schoolAdminService.getCurrentAcademicYear(schoolId)
      ]);
      setData(academicYears);
      setCurrent(currentYear);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
      setCurrent(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, current, loading, error, refetch };
};