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

  // Validation rules
  VALIDATION_RULES: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s-]{10,}$/,
    CLASS_CODE: /^(Nursery|LKG|UKG|[1-9]|1[0-2])$/,
    SECTION: /^[A-Z]$/,
    YEAR: /^\d{4}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
    ALPHA_ONLY: /^[a-zA-Z\s]+$/
  }
};

// Export individual schemas
export const {
  schoolProfile,
  academicStructure,
  staff,
  feeSchedule,
  VALIDATION_RULES
} = schoolAdminSchemas;

export default schoolAdminSchemas;