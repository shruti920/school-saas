export const schoolAdminSchemas = {
  // School profile schema
  schoolProfile: {
    schoolName: {
      required: "School name is required",
      minLength: {
        value: 2,
        message: "School name must be at least 2 characters"
      },
      maxLength: {
        value: 100,
        message: "School name must not exceed 100 characters"
      }
    },
    state: {
      required: "State is required",
      minLength: {
        value: 2,
        message: "State must be at least 2 characters"
      }
    },
    boardType: {
      required: "Board type is required"
    },
    academicYearStart: {
      required: "Academic year start date is required"
    },
    academicYearEnd: {
      required: "Academic year end date is required"
    },
    contactPerson: {
      required: "Contact person is required",
      maxLength: {
        value: 50,
        message: "Contact person name must not exceed 50 characters"
      }
    },
    contactEmail: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
      }
    },
    contactPhone: {
      required: "Phone number is required",
      pattern: {
        value: /^\+?[\d\s-]{10,}$/,
        message: "Please enter a valid phone number"
      }
    },
    address: {
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters"
      }
    }
  },

  // Academic structure schema
  academicStructure: {
    className: {
      required: "Class name is required",
      pattern: {
        value: /^(Nursery|LKG|UKG|[1-9]|1[0-2])$/,
        message: "Please enter a valid class name"
      }
    },
    sectionName: {
      required: "Section name is required",
      pattern: {
        value: /^[A-Z]$/,
        message: "Section must be a single uppercase letter (A-Z)"
      }
    },
    studentCount: {
      required: "Student count is required",
      min: {
        value: 0,
        message: "Student count cannot be negative"
      },
      max: {
        value: 100,
        message: "Student count cannot exceed 100"
      }
    }
  },

  // Academic year schema
  academicYear: {
    name: {
      required: "Academic year name is required",
      minLength: {
        value: 4,
        message: "Academic year name must be at least 4 characters"
      },
      maxLength: {
        value: 20,
        message: "Academic year name must not exceed 20 characters"
      },
      pattern: {
        value: /^\d{4}-\d{4}$/,
        message: "Academic year must be in format YYYY-YYYY (e.g., 2024-2025)"
      }
    },
    start_date: {
      required: "Start date is required"
    },
    end_date: {
      required: "End date is required"
    },
    is_current: {
      // No validation needed for boolean
    }
  },

  // Staff schema
  staff: {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters"
      }
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters"
      }
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
      }
    },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^\+?[\d\s-]{10,}$/,
        message: "Please enter a valid phone number"
      }
    },
    dateOfJoining: {
      required: "Date of joining is required"
    },
    qualification: {
      required: "Qualification is required"
    }
  },

  // Fee structure schema
  feeStructure: {
    feeName: {
      required: "Fee name is required",
      minLength: {
        value: 2,
        message: "Fee name must be at least 2 characters"
      }
    },
    amount: {
      required: "Amount is required",
      min: {
        value: 0,
        message: "Amount cannot be negative"
      }
    },
    frequency: {
      required: "Frequency is required"
    },
    dueDay: {
      min: {
        value: 1,
        message: "Due day must be between 1 and 31"
      },
      max: {
        value: 31,
        message: "Day must be between 1 and 31"
      }
    }
  },

  // Timetable schema
  timetable: {
    class_id: {
      required: "Class is required"
    },
    section_id: {
      required: "Section is required"
    },
    subject_id: {
      required: "Subject is required"
    },
    teacher_profile_id: {
      required: "Teacher is required"
    },
    day_of_week: {
      required: "Day of week is required",
      min: {
        value: 1,
        message: "Day of week must be between 1 (Monday) and 7 (Sunday)"
      },
      max: {
        value: 7,
        message: "Day of week must be between 1 (Monday) and 7 (Sunday)"
      }
    },
    period_number: {
      required: "Period number is required",
      min: {
        value: 1,
        message: "Period number must be at least 1"
      }
    },
    start_time: {
      required: "Start time is required",
      pattern: {
        value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        message: "Please enter a valid time in HH:MM format"
      }
    },
    end_time: {
      required: "End time is required",
      pattern: {
        value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        message: "Please enter a valid time in HH:MM format"
      }
    },
    room: {
      // Optional field
    },
    academic_year: {
      required: "Academic year is required",
      pattern: {
        value: /^\d{4}-\d{4}$/,
        message: "Academic year must be in format YYYY-YYYY (e.g., 2024-2025)"
      }
    }
  },

  // Validation rules
  VALIDATION_RULES: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s-]{10,}$/,
    CLASS_CODE: /^(Nursery|LKG|UKG|[1-9]|1[0-2])$/,
    SECTION: /^[A-Z]$/,
    YEAR: /^\d{4}$/,
    ACADEMIC_YEAR: /^\d{4}-\d{4}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
    ALPHA_ONLY: /^[a-zA-Z\s]+$/
  }
};

// Export individual schemas
export const {
  schoolProfile,
  academicStructure,
  academicYear,
  staff,
  feeSchedule,
  VALIDATION_RULES
} = schoolAdminSchemas;

export default schoolAdminSchemas;

// Export individual schemas
export const {
  schoolProfile,
  academicStructure,
  staff,
  feeSchedule,
  VALIDATION_RULES
} = schoolAdminSchemas;

export default schoolAdminSchemas;