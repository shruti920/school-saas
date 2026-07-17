import { useState, useEffect, useContext } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { SchoolAdminContext } from "@/features/school-admin/contexts/SchoolAdminContext";

export const useTimetable = () => {
  const { schoolId } = useContext(SchoolAdminContext);
  const [data, setData] = useState(null);
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
        const timetableData = await schoolAdminService.getTimetableSlots(schoolId);
        setData(timetableData);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
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
      const timetableData = await schoolAdminService.getTimetableSlots(schoolId);
      setData(timetableData);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};