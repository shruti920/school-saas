import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service functions for school administration
export const schoolAdminService = {
  // Dashboard data
  getDashboardStats: async () => {
    try {
      // In a real implementation, these would be actual Supabase queries
      const [studentsCount, revenueData, attendanceData] = await Promise.all([
        supabase.from("students").select("*", { count: "exact" }),
        supabase.from("fee_payments").select("amount_paid"),
        supabase.from("attendance").select("status"),
      ]);

      return {
        students: studentsCount.count || 0,
        revenue: revenueData.data?.reduce((sum, payment) => sum + (payment.amount_paid || 0), 0) || 0,
        attendanceRate: 0 // Calculate from attendance data
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Academic data
  getAcademicData: async () => {
    try {
      const [classes, subjects, exams] = await Promise.all([
        supabase.from("classes").select(`
          *,
          sections:sections(*),
          students:students(count)
        `),
        supabase.from("subjects").select("*"),
        supabase.from("exams").select(`
          *,
          exam_schedule:exam_schedule(*)
        `),
      ]);

      return {
        classes: classes.data || [],
        subjects: subjects.data || [],
        exams: exams.data || []
      };
    } catch (error) {
      console.error("Error fetching academic data:", error);
      throw error;
    }
  },

  // Configuration data
  getConfiguration: async () => {
    try {
      const [infrastructure, departments, policies] = await Promise.all([
        supabase.from("infrastructure").select("*"),
        supabase.from("departments").select("*"),
        supabase.from("policies").select("*"),
      ]);

      return {
        infrastructure: infrastructure.data || [],
        departments: departments.data || [],
        policies: policies.data || []
      };
    } catch (error) {
      console.error("Error fetching configuration:", error);
      throw error;
    }
  },

  // Setup wizard data
  getSetupSteps: async () => {
    try {
      const steps = [
        { id: 1, name: "School Profile", completed: false },
        { id: 2, name: "Academic Structure", completed: false },
        { id: 3, name: "Staff & Faculty", completed: false },
        { id: 4, name: "Fee Structure", completed: false },
        { id: 5, name: "Transport", completed: false },
        { id: 6, name: "Hostel", completed: false },
        { id: 7, name: "Library", completed: false },
        { id: 8, name: "Notifications", completed: false }
      ];

      // In a real app, we'd check completion status from database
      return steps;
    } catch (error) {
      console.error("Error fetching setup steps:", error);
      throw error;
    }
  },

  // Validation and readiness
  getReadinessStatus: async () => {
    try {
      // This would check various completion statuses
      const readinessData = {
        score: 78, // Example score
        checks: [
          { id: 1, title: "School Profile", status: "complete" },
          { id: 2, title: "Academic Structure", status: "complete" },
          { id: 3, title: "Staff Information", status: "partial" },
          { id: 4, title: "Fee Structure", status: "incomplete" },
          // ... more checks
        ]
      };

      return readinessData;
    } catch (error) {
      console.error("Error fetching readiness status:", error);
      throw error;
    }
  },

  // Utility functions
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Export individual functions for backward compatibility
export const {
  getDashboardStats,
  getAcademicData,
  getConfiguration,
  getSetupSteps,
  getReadinessStatus,
  formatCurrency,
  formatDate
} = schoolAdminService;