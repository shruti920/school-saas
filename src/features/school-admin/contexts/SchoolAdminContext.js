"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { createClient } from "@/lib/supabase/client";

// Create context
export const SchoolAdminContext = createContext();

// Provider component
export const SchoolAdminProvider = ({ children }) => {
  // State
  const [dashboardData, setDashboardData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [configurationData, setConfigurationData] = useState(null);
  const [setupSteps, setSetupSteps] = useState([]);
  const [readinessStatus, setReadinessStatus] = useState(null);
  const [schoolProfile, setSchoolProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schoolId, setSchoolId] = useState(null);

  // Create Supabase client
  const supabase = createClient();

  // Set up auth listener to update schoolId
  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get school_id from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('school_id')
          .eq('id', user.id)
          .single();

        if (!profileError && profile) {
          setSchoolId(profile.school_id);
        } else {
          setSchoolId(null);
        }
      } else {
        setSchoolId(null);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Get school_id from profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('school_id')
            .eq('id', session.user.id)
            .single();

          if (!profileError && profile) {
            setSchoolId(profile.school_id);
          } else {
            setSchoolId(null);
          }
        } else {
          setSchoolId(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Fetch functions
  const fetchDashboardData = useCallback(async () => {
    if (!schoolId) {
      setError(new Error("School ID not available"));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getDashboardStats(schoolId);
      setDashboardData(data);
    } catch (err) {
      setError(err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const fetchAcademicData = useCallback(async () => {
    if (!schoolId) {
      setError(new Error("School ID not available"));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getAcademicData(schoolId);
      setAcademicData(data);
    } catch (err) {
      setError(err);
      setAcademicData(null);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const fetchConfigurationData = useCallback(async () => {
    if (!schoolId) {
      setError(new Error("School ID not available"));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getConfiguration(schoolId);
      setConfigurationData(data);
    } catch (err) {
      setError(err);
      setConfigurationData(null);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const fetchSchoolProfile = useCallback(async () => {
    if (!schoolId) {
      setSchoolProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', schoolId)
        .single();

      if (error) throw error;
      setSchoolProfile(data);
    } catch (err) {
      console.error('Error fetching school profile:', err);
      setSchoolProfile(null);
    }
  }, [schoolId, supabase]);

  const fetchReadinessStatus = useCallback(async () => {
    if (!schoolId) {
      setError(new Error("School ID not available"));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await schoolAdminService.getReadinessStatus(schoolId);
      setReadinessStatus(data);
    } catch (err) {
      setError(err);
      setReadinessStatus(null);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  // Load all data - wrapped in microtask to avoid synchronous setState in useEffect
  const loadAllData = useCallback(async () => {
    return Promise.resolve().then(async () => {
      if (!schoolId) {
        setError(new Error("School ID not available"));
        return;
      }
      try {
        setLoading(true);
        setError(null);
        await Promise.all([
          fetchDashboardData(),
          fetchAcademicData(),
          fetchConfigurationData(),
          fetchSetupSteps(),
          fetchReadinessStatus(),
          fetchSchoolProfile()
        ]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    });
  }, [schoolId, fetchDashboardData, fetchAcademicData, fetchConfigurationData, fetchSetupSteps, fetchReadinessStatus, fetchSchoolProfile]);

  // Initial load - run when schoolId changes
  useEffect(() => {
    if (schoolId) {
      loadAllData();
    }
  }, [schoolId, loadAllData]);

  // Realtime updates for school admin data
  useEffect(() => {
    if (!schoolId) return;

    const channel = supabase.channel(`school-admin-${schoolId}`);
    const tables = [
      "classes",
      "sections",
      "subjects",
      "exams",
      "exam_schedule",
      "timetable_slots",
      "transport_routes",
      "library_books",
      "hostel_rooms",
      "fee_structures",
      "notifications",
      "fee_payments",
      "attendance",
      "staff_attendance"
    ];

    tables.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `school_id=eq.${schoolId}` },
        () => {
          loadAllData();
        }
      );
    });

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [schoolId, loadAllData, supabase]);

  // Context value
  const value = {
    // Data
    schoolId,
    dashboardData,
    academicData,
    configurationData,
    setupSteps,
    readinessStatus,
    schoolProfile,

    // Loading states
    loading,
    error,

    // Actions
    refreshData: loadAllData,
    refreshDashboard: fetchDashboardData,
    fetchAcademic: fetchAcademicData,
    fetchConfiguration: fetchConfigurationData,
    fetchSetupSteps: fetchSetupSteps,
    fetchReadiness: fetchReadinessStatus
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