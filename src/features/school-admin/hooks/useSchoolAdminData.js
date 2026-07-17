import { useState, useEffect, useContext } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { SchoolAdminContext } from "@/features/school-admin/contexts/SchoolAdminContext";

export const useDashboardData = () => {
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
        const dashboardData = await schoolAdminService.getDashboardStats(schoolId);
        setData(dashboardData);
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

  return { data, loading, error };
};

export const useAcademicData = () => {
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
        const academicData = await schoolAdminService.getAcademicData(schoolId);
        setData(academicData);
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
      const academicData = await schoolAdminService.getAcademicData(schoolId);
      setData(academicData);
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

export const useConfigurationData = () => {
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
        const configData = await schoolAdminService.getConfiguration(schoolId);
        setData(configData);
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

  return { data, loading, error };
};

export const useSetupProgress = () => {
  const { schoolId } = useContext(SchoolAdminContext);
  const [steps, setSteps] = useState([]);
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
        const stepsData = await schoolAdminService.getSetupSteps(schoolId);
        setSteps(stepsData);
        setError(null);
      } catch (err) {
        setError(err);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  return { steps, loading, error };
};

export const useReadinessStatus = () => {
  const { schoolId } = useContext(SchoolAdminContext);
  const [status, setStatus] = useState(null);
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
        const readinessData = await schoolAdminService.getReadinessStatus(schoolId);
        setStatus(readinessData);
        setError(null);
      } catch (err) {
        setError(err);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  return { status, loading, error };
};