import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service functions for school administration
export const schoolAdminService = {
  // Dashboard data
  getDashboardStats: async (school_id) => {
    try {
      // In a real implementation, these would be actual Supabase queries
      const [studentsCount, revenueData, attendanceData, staffAttendanceData, totalStudentsCount, totalStaffCount] = await Promise.all([
        supabase.from("students").select("*", { count: "exact" }).eq("school_id", school_id),
        supabase.from("fee_payments").select("amount_paid").eq("school_id", school_id),
        supabase.from("attendance").select("status").eq("school_id", school_id).eq("date", new Date().toISOString().split('T')[0]),
        supabase.from("staff_attendance").select("status").eq("school_id", school_id).eq("date", new Date().toISOString().split('T')[0]),
        supabase.from("students").select("*", { count: "exact" }).eq("school_id", school_id),
        supabase.from("profiles").select("*", { count: "exact" }).eq("school_id", school_id).in("role", ["admin", "teacher", "accountant", "front_office", "librarian", "transport_manager"])
      ]);

      const totalStudents = totalStudentsCount.count || 0;
      const totalStaff = totalStaffCount.count || 0;

      const presentStudents = attendanceData.data?.filter(record => record.status === 'present').length || 0;
      const studentAttendanceRate = totalStudents > 0 ? (presentStudents / totalStudents) * 100 : 0;

      const presentStaff = staffAttendanceData.data?.filter(record => record.status === 'present').length || 0;
      const staffAttendanceRate = totalStaff > 0 ? (presentStaff / totalStaff) * 100 : 0;

      return {
        students: totalStudents,
        revenue: revenueData.data?.reduce((sum, payment) => sum + (payment.amount_paid || 0), 0) || 0,
        attendanceRate: parseFloat(studentAttendanceRate.toFixed(2)),
        teacherAttendance: parseFloat(staffAttendanceRate.toFixed(2))
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Academic data
  getAcademicData: async (school_id) => {
    try {
      const [classes, subjects, exams] = await Promise.all([
        supabase.from("classes").select(`
          *,
          sections:sections(*),
          students:students(count)
        `).eq("school_id", school_id).order("sort_order", { ascending: true }),
        supabase.from("subjects").select(`
          id,
          name,
          code,
          periods_per_week
        `).eq("school_id", school_id).order("name", { ascending: true }),
        supabase.from("exams").select(`
          *,
          exam_schedule:exam_schedule(
            id,
            class:classes(id,name),
            subject:subjects(id,name),
            exam_date,
            start_time,
            end_time,
            room
          )
        `).eq("school_id", school_id).order("start_date", { ascending: true }),
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

  // Class management
  createClass: async (school_id, classData) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .insert({
          school_id,
          name: classData.name,
          sort_order: classData.sort_order || 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  updateClass: async (classId, classData) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .update({
          name: classData.name,
          sort_order: classData.sort_order || 0
        })
        .eq("id", classId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  },

  deleteClass: async (classId) => {
    try {
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", classId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting class:", error);
      throw error;
    }
  },

  // Subject management
  createSubject: async (school_id, subjectData) => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .insert({
          school_id,
          name: subjectData.name,
          code: subjectData.code,
          periods_per_week: subjectData.periodsPerWeek || 4
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  updateSubject: async (subjectId, subjectData) => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .update({
          name: subjectData.name,
          code: subjectData.code,
          periods_per_week: subjectData.periodsPerWeek || 4
        })
        .eq("id", subjectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  },

  deleteSubject: async (subjectId) => {
    try {
      const { error } = await supabase
        .from("subjects")
        .delete()
        .eq("id", subjectId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  },

  // Section management
  createSection: async (school_id, classId, sectionData) => {
    try {
      const { data, error } = await supabase
        .from("sections")
        .insert({
          school_id,
          class_id: classId,
          name: sectionData.name
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating section:", error);
      throw error;
    }
  },

  updateSection: async (sectionId, sectionData) => {
    try {
      const { data, error } = await supabase
        .from("sections")
        .update({
          name: sectionData.name
        })
        .eq("id", sectionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating section:", error);
      throw error;
    }
  },

  deleteSection: async (sectionId) => {
    try {
      const { error } = await supabase
        .from("sections")
        .delete()
        .eq("id", sectionId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting section:", error);
      throw error;
    }
  },

  // Configuration data
  getConfiguration: async (school_id) => {
    try {
      const [classesCount, subjectsCount, transportCount, libraryCount, hostelCount, notificationsCount, feeStructuresCount, staffCount] = await Promise.all([
        supabase.from("classes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("subjects").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("transport_routes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("library_books").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("hostel_rooms").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("notifications").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("fee_structures").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("school_id", school_id).in("role", ["admin", "teacher", "accountant", "front_office", "librarian", "transport_manager"]),
      ]);

      return {
        infrastructure: [
          { id: 1, name: "Classrooms", count: classesCount.count || 0, status: classesCount.count > 0 ? "Configured" : "Pending" },
          { id: 2, name: "Transport Routes", count: transportCount.count || 0, status: transportCount.count > 0 ? "Configured" : "Pending" },
          { id: 3, name: "Library Books", count: libraryCount.count || 0, status: libraryCount.count > 0 ? "Configured" : "Pending" },
          { id: 4, name: "Hostel Rooms", count: hostelCount.count || 0, status: hostelCount.count > 0 ? "Configured" : "Pending" },
        ],
        departments: [
          { id: 1, name: "Subjects", hod: "Academic", faculty: subjectsCount.count || 0, students: 0 },
          { id: 2, name: "Teachers", hod: "Staff", faculty: staffCount.count || 0, students: 0 },
        ],
        policies: [
          { id: 1, name: "Notifications", lastUpdated: null, version: notificationsCount.count > 0 ? "Enabled" : "Not configured" },
          { id: 2, name: "Fee Structure", lastUpdated: null, version: feeStructuresCount.count > 0 ? "Enabled" : "Not configured" }
        ]
      };
    } catch (error) {
      console.error("Error fetching configuration:", error);
      throw error;
    }
  },

  // Setup wizard data
  getSetupSteps: async (school_id) => {
    try {
      const [schoolResponse, classesResponse, sectionsResponse, subjectsResponse, teachersResponse, feeStructuresResponse, transportRoutesResponse, hostelRoomsResponse, libraryBooksResponse, notificationsResponse, timetableResponse] = await Promise.all([
        supabase.from("schools").select("id").eq("id", school_id).single(),
        supabase.from("classes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("sections").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("subjects").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("school_id", school_id).in("role", ["admin", "teacher", "accountant", "front_office", "librarian", "transport_manager"]),
        supabase.from("fee_structures").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("transport_routes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("hostel_rooms").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("library_books").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("notifications").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("timetable_slots").select("id", { count: "exact", head: true }).eq("school_id", school_id),
      ]);

      const academicComplete = classesResponse.count > 0 && sectionsResponse.count > 0 && subjectsResponse.count > 0;
      const staffComplete = teachersResponse.count > 0;
      const feeComplete = feeStructuresResponse.count > 0;
      const transportComplete = transportRoutesResponse.count > 0;
      const hostelComplete = hostelRoomsResponse.count > 0;
      const libraryComplete = libraryBooksResponse.count > 0;
      const notificationsComplete = notificationsResponse.count > 0;
      const calendarComplete = timetableResponse.count > 0;

      return [
        { id: 1, name: "School Profile", completed: !!schoolResponse.data },
        { id: 2, name: "Academic Structure", completed: academicComplete },
        { id: 3, name: "Staff & Faculty", completed: staffComplete },
        { id: 4, name: "Fee Structure", completed: feeComplete },
        { id: 5, name: "Transport", completed: transportComplete },
        { id: 6, name: "Hostel", completed: hostelComplete },
        { id: 7, name: "Library", completed: libraryComplete },
        { id: 8, name: "Notifications", completed: notificationsComplete },
        { id: 9, name: "Academic Calendar", completed: calendarComplete }
      ];
    } catch (error) {
      console.error("Error fetching setup steps:", error);
      throw error;
    }
  },

  // Validation and readiness
  getReadinessStatus: async (school_id) => {
    try {
      const [schoolResponse, classesResponse, sectionsResponse, subjectsResponse, teachersResponse, feeStructuresResponse, transportRoutesResponse, hostelRoomsResponse, libraryBooksResponse, notificationsResponse, timetableResponse] = await Promise.all([
        supabase.from("schools").select("id").eq("id", school_id).single(),
        supabase.from("classes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("sections").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("subjects").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("school_id", school_id).in("role", ["admin", "teacher", "accountant", "front_office", "librarian", "transport_manager"]),
        supabase.from("fee_structures").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("transport_routes").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("hostel_rooms").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("library_books").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("notifications").select("id", { count: "exact", head: true }).eq("school_id", school_id),
        supabase.from("timetable_slots").select("id", { count: "exact", head: true }).eq("school_id", school_id),
      ]);

      const checks = [
        { id: 1, title: "School Profile", status: schoolResponse.data ? "complete" : "incomplete", category: "Profile" },
        { id: 2, title: "Academic Structure", status: classesResponse.count > 0 && sectionsResponse.count > 0 && subjectsResponse.count > 0 ? "complete" : "partial", category: "Academic" },
        { id: 3, title: "Staff Information", status: teachersResponse.count > 0 ? "complete" : "incomplete", category: "Staff" },
        { id: 4, title: "Fee Structure", status: feeStructuresResponse.count > 0 ? "complete" : "incomplete", category: "Finance" },
        { id: 5, title: "Transport Routes", status: transportRoutesResponse.count > 0 ? "complete" : "incomplete", category: "Transport" },
        { id: 6, title: "Hostel Facilities", status: hostelRoomsResponse.count > 0 ? "complete" : "incomplete", category: "Hostel" },
        { id: 7, title: "Library Inventory", status: libraryBooksResponse.count > 0 ? "complete" : "incomplete", category: "Library" },
        { id: 8, title: "Notifications", status: notificationsResponse.count > 0 ? "complete" : "incomplete", category: "Communication" },
        { id: 9, title: "Academic Calendar", status: timetableResponse.count > 0 ? "complete" : "incomplete", category: "Calendar" }
      ];

      const completeCount = checks.filter(check => check.status === "complete").length;
      const partialCount = checks.filter(check => check.status === "partial").length;
      const score = Math.round(((completeCount * 1 + partialCount * 0.5) / checks.length) * 100);

      return {
        score,
        checks,
      };
    } catch (error) {
      console.error("Error fetching readiness status:", error);
      throw error;
    }
  },

  // Timetable data
  getTimetableSlots: async (school_id) => {
    try {
      const { data, error } = await supabase.from("timetable_slots").select(`
        id,
        day_of_week,
        period_number,
        start_time,
        end_time,
        room,
        class:classes(id,name),
        section:sections(id,name),
        subject:subjects(id,name),
        teacher:profiles(id,full_name)
      `).eq("school_id", school_id).order("day_of_week", { ascending: true }).order("period_number", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching timetable slots:", error);
      throw error;
    }
  },

  createTimetableSlot: async (school_id, timetableData) => {
    try {
      const { data, error } = await supabase.from("timetable_slots").insert({
        school_id,
        class_id: timetableData.class_id,
        section_id: timetableData.section_id,
        subject_id: timetableData.subject_id,
        teacher_profile_id: timetableData.teacher_profile_id,
        day_of_week: timetableData.day_of_week,
        period_number: timetableData.period_number,
        start_time: timetableData.start_time,
        end_time: timetableData.end_time,
        room: timetableData.room || null,
        academic_year: timetableData.academic_year
      }).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating timetable slot:", error);
      throw error;
    }
  },

  updateTimetableSlot: async (timetableId, timetableData) => {
    try {
      const { data, error } = await supabase.from("timetable_slots").update({
        class_id: timetableData.class_id,
        section_id: timetableData.section_id,
        subject_id: timetableData.subject_id,
        teacher_profile_id: timetableData.teacher_profile_id,
        day_of_week: timetableData.day_of_week,
        period_number: timetableData.period_number,
        start_time: timetableData.start_time,
        end_time: timetableData.end_time,
        room: timetableData.room || null,
        academic_year: timetableData.academic_year
      }).eq("id", timetableId).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating timetable slot:", error);
      throw error;
    }
  },

  deleteTimetableSlot: async (timetableId) => {
    try {
      const { error } = await supabase.from("timetable_slots").delete().eq("id", timetableId);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting timetable slot:", error);
      throw error;
    }
  },

  // Transport data
  getTransportData: async (school_id) => {
    try {
      const { data, error } = await supabase.from("transport_routes").select(`
        *,
        route_students:student_transport(id)
      `).eq("school_id", school_id).order("route_name", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching transport data:", error);
      throw error;
    }
  },

  createTransportRoute: async (school_id, routeData) => {
    try {
      const { data, error } = await supabase.from("transport_routes").insert({
        school_id,
        route_name: routeData.route_name,
        vehicle_number: routeData.vehicle_number,
        driver_name: routeData.driver_name,
        driver_phone: routeData.driver_phone,
        capacity: routeData.capacity || 0
      }).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating transport route:", error);
      throw error;
    }
  },

  deleteTransportRoute: async (routeId) => {
    try {
      const { error } = await supabase.from("transport_routes").delete().eq("id", routeId);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting transport route:", error);
      throw error;
    }
  },

  // School profile
  getSchool: async (school_id) => {
    try {
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("id", school_id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching school:", error);
      throw error;
    }
  },

  updateSchool: async (school_id, schoolData) => {
    try {
      const { data, error } = await supabase
        .from("schools")
        .update({
          name: schoolData.name,
          state: schoolData.state,
          board_type: schoolData.board_type,
          address: schoolData.address,
          academic_year_start: schoolData.academic_year_start,
          academic_year_end: schoolData.academic_year_end,
          is_active: schoolData.is_active
        })
        .eq("id", school_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating school:", error);
      throw error;
    }
  },

  // Academic year methods
  getAcademicYears: async (school_id) => {
    try {
      const { data, error } = await supabase
        .from("academic_years")
        .select("*")
        .eq("school_id", school_id)
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching academic years:", error);
      throw error;
    }
  },

  getCurrentAcademicYear: async (school_id) => {
    try {
      const { data, error } = await supabase
        .from("academic_years")
        .select("*")
        .eq("school_id", school_id)
        .eq("is_current", true)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows returned
      return data;
    } catch (error) {
      console.error("Error fetching current academic year:", error);
      throw error;
    }
  },

  createAcademicYear: async (school_id, academicYearData) => {
    try {
      // If this is set as current, unset any existing current year for this school
      if (academicYearData.is_current) {
        await supabase
          .from("academic_years")
          .update({ is_current: false })
          .eq("school_id", school_id);
      }

      const { data, error } = await supabase
        .from("academic_years")
        .insert({
          school_id,
          name: academicYearData.name,
          start_date: academicYearData.start_date,
          end_date: academicYearData.end_date,
          is_current: academicYearData.is_current || false
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating academic year:", error);
      throw error;
    }
  },

  updateAcademicYear: async (academicYearId, academicYearData) => {
    try {
      // If this is set as current, unset any existing current year for this school
      if (academicYearData.is_current) {
        // First get the school_id for this academic year
        const { data: currentYear, error: fetchError } = await supabase
          .from("academic_years")
          .select("school_id")
          .eq("id", academicYearId)
          .single();

        if (fetchError) throw fetchError;

        // Unset any existing current year for this school
        await supabase
          .from("academic_years")
          .update({ is_current: false })
          .eq("school_id", currentYear.school_id);
      }

      const { data, error } = await supabase
        .from("academic_years")
        .update({
          name: academicYearData.name,
          start_date: academicYearData.start_date,
          end_date: academicYearData.end_date,
          is_current: academicYearData.is_current || false
        })
        .eq("id", academicYearId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating academic year:", error);
      throw error;
    }
  },

  deleteAcademicYear: async (academicYearId) => {
    try {
      // Check if this is the current year
      const { data: academicYear, error: fetchError } = await supabase
        .from("academic_years")
        .select("school_id, is_current")
        .eq("id", academicYearId)
        .single();

      if (fetchError) throw fetchError;

      // Prevent deletion of current year if it's the only one
      if (academicYear.is_current) {
        const { count, error: countError } = await supabase
          .from("academic_years")
          .select("id", { count: "exact", head: true })
          .eq("school_id", academicYear.school_id)
          .eq("is_current", true);

        if (countError) throw countError;

        if (count === 1) {
          throw new Error("Cannot delete the current academic year");
        }
      }

      const { error } = await supabase
        .from("academic_years")
        .delete()
        .eq("id", academicYearId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error deleting academic year:", error);
      throw error;
    }
  },

  setCurrentAcademicYear: async (academicYearId) => {
    try {
      // Get the academic year to get its school_id
      const { data: academicYear, error: fetchError } = await supabase
        .from("academic_years")
        .select("school_id")
        .eq("id", academicYearId)
        .single();

      if (fetchError) throw fetchError;

      // Unset all current years for this school
      await supabase
        .from("academic_years")
        .update({ is_current: false })
        .eq("school_id", academicYear.school_id);

      // Set this academic year as current
      const { data, error } = await supabase
        .from("academic_years")
        .update({ is_current: true })
        .eq("id", academicYearId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error setting current academic year:", error);
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
  formatDate,
  // Class management
  createClass,
  updateClass,
  deleteClass,
  // Subject management
  createSubject,
  updateSubject,
  deleteSubject,
  // Section management
  createSection,
  updateSection,
  deleteSection,
  // Timetable and transport
  getTimetableSlots,
  createTimetableSlot,
  updateTimetableSlot,
  deleteTimetableSlot,
  getTransportData,
  createTransportRoute,
  deleteTransportRoute,
  // School profile
  getSchool,
  updateSchool,
  // Academic year
  getAcademicYears,
  getCurrentAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  setCurrentAcademicYear
} = schoolAdminService;