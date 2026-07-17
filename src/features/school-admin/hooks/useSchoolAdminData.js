import { useState, useEffect } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardData = await schoolAdminService.getDashboardStats();
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
  }, []);

  return { data, loading, error };
};

export const useAcademicData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const academicData = await schoolAdminService.getAcademicData();
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
  }, []);

  return { data, loading, error };
};

export const useConfigurationData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const configData = await schoolAdminService.getConfiguration();
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
  }, []);

  return { data, loading, error };
};

export const useSetupProgress = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stepsData = await schoolAdminService.getSetupSteps();
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
  }, []);

  return { steps, loading, error };
};

export const useReadinessStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const readinessData = await schoolAdminService.getReadinessStatus();
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
  }, []);

  return { status, loading, error };
};