export const SCHOOL_ADMIN_CONSTANTS = {
  // Roles and permissions
  ROLES: {
    SUPER_ADMIN: "super_admin",
    SCHOOL_ADMIN: "school_admin",
    TEACHER: "teacher",
    STUDENT: "student",
    PARENT: "parent",
    ACCOUNTANT: "accountant",
    FRONT_OFFICE: "front_office",
    LIBRARIAN: "librarian",
    TRANSPORT_MANAGER: "transport_manager"
  },

  // Academic constants
  ACADEMIC: {
    CLASSES: [
      "Nursery",
      "LKG",
      "UKG",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    SECTIONS: ["A", "B", "C", "D", "E"],
    STREAMS: ["Science", "Commerce", "Humanities", "Vocational"],
    SUBJECT_CATEGORIES: ["Core", "Elective", "Language", "Practical"],
    GRADE_SYSTEMS: ["CBSE", "ICSE", "STATE_BOARD", "IGCSE"]
  },

  // Fee and finance
  FINANCE: {
    FEE_TYPES: ["Tuition", "Transport", "Hostel", "Lab", "Library", "Activity", "Development"],
    FEE_FREQUENCY: ["One-time", "Monthly", "Quarterly", "Half-Yearly", "Annual"],
    PAYMENT_METHODS: ["Online", "Cash", "Cheque", "Bank Transfer", "UPI"],
    FEE_STATUS: ["Pending", "Partial", "Paid", "Overdue", "Waived", "Refunded"]
  },

  // Attendance and timetable
  ATTENDANCE: {
    STATUS: ["Present", "Absent", "Late", "Half Day", "On Leave"],
    PERIODS_PER_DAY: 8,
    WORKING_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },

  // Notifications
  NOTIFICATIONS: {
    TYPES: ["Fee Reminder", "Attendance Alert", "Exam Schedule", "Holiday Notice", "Event Invitation", "General Announcement"],
    CHANNELS: ["SMS", "Email", "In-App", "WhatsApp"],
    PRIORITY: ["Low", "Medium", "High", "Urgent"]
  },

  // Infrastructure
  INFRASTRUCTURE: {
    FACILITY_TYPES: ["Classroom", "Laboratory", "Library", "Computer Lab", "Sports Facility", "Auditorium", "Cafeteria", "Admin Office"],
    ROOM_TYPES: ["Classroom", "Lab", "Library", "Office", "Storage", "Meeting Room"]
  },

  // Hostel
  HOSTEL: {
    ROOM_TYPES: ["Single", "Double", "Triple", "Dormitory"],
    FACILITIES: ["Mess", "Laundry", "Study Room", "Common Room", "Gym", "Indoor Games"]
  },

  // Transport
  TRANSPORT: {
    VEHICLE_TYPES: ["Bus", "Van", "Mini Bus"],
    ROUTE_TYPES: ["Urban", "Suburban", "Rural"],
    SEAT_CAPACITY: [20, 25, 30, 35, 40, 45, 50]
  }
};

// Export individual constants for easy importing
export const {
  ROLES,
  ACADEMIC,
  FINANCE,
  ATTENDANCE,
  NOTIFICATIONS,
  INFRASTRUCTURE,
  HOSTEL,
  TRANSPORT
} = SCHOOL_ADMIN_CONSTANTS;

export default SCHOOL_ADMIN_CONSTANTS;