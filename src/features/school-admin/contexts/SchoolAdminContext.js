import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";

// Create context
const SchoolAdminContext = createContext();

// Provider component
export const SchoolAdminProvider = ({ children }) => {
  // State
  const [dashboardData, setDashboardData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [configurationData, setConfigurationData] = useState(null);
  const [setupSteps, setSetupSteps] = useState([]);
  const [readinessStatus, setReadinessStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch functions
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getDashboardStats();
      setDashboardData(data);
    } catch (err) {
      setError(err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAcademicData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getAcademicData();
      setAcademicData(data);
    } catch (err) {
      setError(err);
      setAcademicData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConfigurationData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getConfiguration();
      setConfigurationData(data);
    } catch (err) {
      setError(err);
      setConfigurationData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSetupSteps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getSetupSteps();
      setSetupSteps(data);
    } catch (err) {
      setError(err);
      setSetupSteps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReadinessStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getReadinessStatus();
      setReadinessStatus(data);
    } catch (err) {
      setError(err);
      setReadinessStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all data
  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchDashboardData(),
        fetchAcademicData(),
        fetchConfigurationData(),
        fetchSetupSteps(),
        fetchReadinessStatus()
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    fetchDashboardData,
    fetchAcademicData,
    fetchConfigurationData,
    fetchSetupSteps,
    fetchReadinessStatus
  ]);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Context value
  const value = {
    // Data
    dashboardData,
    academicData,
    configurationData,
    setupSteps,
    readinessStatus,

    // Loading states
    loading,
    error,

    // Actions
    refreshData: loadAllData,
    refreshDashboard: fetchDashboardData,
    refreshAcademic: fetchAcademicData,
    refreshConfiguration: fetchConfigurationData,
    refreshSetupSteps: fetchSetupSteps,
    refreshReadiness: fetchReadinessStatus
  };

  return (
    <SchoolAdminContext.Provider value={value}>
      {children}
    </SchoolAdminContext.Provider>
  );
};

// Custom hook to use the context
export const useSchoolAdmin = () => {
  const context = useContext(SchoolAdminContext);
  if (!context) {
    throw new Error("useSchoolAdmin must be used within a SchoolAdminProvider");
  }
  return context;
};

export default SchoolAdminContext;