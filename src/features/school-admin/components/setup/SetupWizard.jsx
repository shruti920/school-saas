import * as React from "react";
import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { CheckCircle, Settings, Users, Calendar, Banknote, Bus, Bed, BookOpen, Bell } from "lucide-react";
import { useForm } from "react-hook-form";

export default function SetupWizard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { id: 1, title: "School Profile", icon: Settings, description: "Basic school information" },
    { id: 2, title: "Academic Structure", icon: Calendar, description: "Classes, sections, subjects" },
    { id: 3, title: "Staff & Faculty", icon: Users, description: "Teachers and staff setup" },
    { id: 4, title: "Fee Structure", icon: Banknote, description: "Fee categories and payment schedules" },
    { id: 5, title: "Transport", icon: Bus, description: "Bus routes and vehicle management" },
    { id: 6, title: "Hostel", icon: Bed, description: "Hostel facilities and room management" },
    { id: 7, title: "Library", icon: BookOpen, description: "Library inventory and lending policies" },
    { id: 8, title: "Notifications", icon: Bell, description: "Communication templates and preferences" }
  ];

  const methods = useForm({
    defaultValues: {
      schoolName: "",
      state: "",
      boardType: "CBSE",
      academicYearStart: "",
      academicYearEnd: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      address: ""
    }
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // In real implementation, this would save to Supabase
    alert("Setup step completed!");
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Setup complete! Welcome to School Management System.");
    }
    reset();
  };

  const goToNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Setup Progress</span>
          <span className="text-sm font-semibold">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-muted/50 h-2.5 rounded-full overflow-hidden">
          <div className={`bg-primary h-2.5 transition-width duration-500`} style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-2">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg
              ${activeStep > index ? 'bg-primary text-primary-foreground' : ''}
              ${activeStep === index ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}
              transition-all duration-300`}>
              {activeStep > index ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <div className={`text-xs font-medium ${activeStep === index ? 'text-primary' : 'text-muted-foreground'}`}>
                  {index + 1}
                </div>
              )}
            </div>
            <div className={`text-xs font-medium
              ${activeStep >= index ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.title}
            </div>
            {index < steps.length - 1 && (
              <div className="w-px h-4 bg-muted/50 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader className="pb-4">
          <Title variant="h2">{steps[activeStep].title}</Title>
          <p className="text-sm text-muted-foreground">{steps[activeStep].description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* School Profile Step */}
            {activeStep === 0 && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">School Name</label>
                    <input
                      {...methods.register("schoolName", {
                        required: "School name is required",
                        minLength: {
                          value: 2,
                          message: "School name must be at least 2 characters"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter school name"
                    />
                    {methods.formState.errors.schoolName && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.schoolName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      {...methods.register("state", {
                        required: "State is required",
                        minLength: {
                          value: 2,
                          message: "State must be at least 2 characters"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter state"
                    />
                    {methods.formState.errors.state && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.state.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Board Type</label>
                    <select
                      {...methods.register("boardType")}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="STATE">State Board</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Academic Year Start</label>
                    <input
                      type="date"
                      {...methods.register("academicYearStart", {
                        required: "Start date is required"
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {methods.formState.errors.academicYearStart && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.academicYearStart.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Academic Year End</label>
                    <input
                      type="date"
                      {...methods.register("academicYearEnd", {
                        required: "End date is required"
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {methods.formState.errors.academicYearEnd && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.academicYearEnd.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Person</label>
                    <input
                      {...methods.register("contactPerson")}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Principal or admin contact"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Email</label>
                    <input
                      type="email"
                      {...methods.register("contactEmail", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="contact@school.edu"
                    />
                    {methods.formState.errors.contactEmail && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.contactEmail.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      {...methods.register("contactPhone", {
                        pattern: {
                          value: /^\+?[\d\s-]{10,}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91 XXXXXXXXXX"
                    />
                    {methods.formState.errors.contactPhone && (
                      <p className="text-xs text-destructive mt-1">{methods.formState.errors.contactPhone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    {...methods.register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters"
                      }
                    })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Enter full school address"
                  />
                  {methods.formState.errors.address && (
                    <p className="text-xs text-destructive mt-1">{methods.formState.errors.address.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Academic Structure Step */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Classes Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up your school's class structure from Nursery to Class 12
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Nursery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>LKG</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>UKG</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Class 1</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Class 2</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Class 3</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Class 4</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Class 5</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Classes 6-12</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Academic Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure academic terms, examination patterns, and grading systems
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Academic Terms</label>
                        <select
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="2">2 Terms (Half Yearly)</option>
                          <option value="3" selected>3 Terms (Quarterly)</option>
                          <option value="4">4 Terms (Quarterly)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Grading System</label>
                        <select
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="CBSE" selected>CBSE Grading</option>
                          <option value="ICSE">ICSE Grading</option>
                          <option value="STATE">State Board</option>
                          <option value="PERCENTAGE">Percentage Based</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Staff & Faculty Step */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Staff Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Add your teaching and non-teaching staff members
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Principal: Ms. Priya Sharma</p>
                          <p className="text-xs text-muted-foreground">Administrative Role</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Vice Principal: Mr. Rajesh Kumar</p>
                          <p className="text-xs text-muted-foreground">Academic Role</p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors mt-4">
                      Add More Staff Members
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Subject Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up subjects for each class level
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Mathematics (All Classes)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>English (All Classes)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Science (Classes 3-12)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Social Studies (Classes 3-12)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Hindi (Classes 1-12)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Computer Science (Classes 3-12)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fee Structure Step */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Fee Categories</h3>
                    <p className="text-sm text-muted-foreground">
                      Define different types of fees for your school
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Banknote className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Tuition Fee</p>
                          <p className="text-xs text-muted-foreground">Monthly - ₹2,500</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Banknote className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Transport Fee</p>
                          <p className="text-xs text-muted-foreground">Monthly - ₹800</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Banknote className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Lab Fee</p>
                          <p className="text-xs text-muted-foreground">Quarterly - ₹500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up payment methods and schedules
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Fee Collection Frequency</label>
                        <select
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="monthly" selected>Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="half_yearly">Half Yearly</option>
                          <option value="annual">Annual</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Payment Methods</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                          />
                          <span>Online Payments</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                          />
                          <span>Cash Payments</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                          />
                          <span>Bank Transfer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transport Step */}
            {activeStep === 4 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Transport Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure bus routes and vehicle management
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bus className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Number of Buses</p>
                          <p className="text-xs text-muted-foreground">12 vehicles</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bus className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Average Capacity</p>
                          <p className="text-xs text-muted-foreground">40 students per bus</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Route Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Define bus routes and pickup points
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Route 1: North Campus</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Route 2: South City</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Route 3: East Suburb</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Route 4: West End</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hostel Step */}
            {activeStep === 5 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Hostel Facilities</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure hostel blocks, rooms, and amenities
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bed className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Hostel Blocks</p>
                          <p className="text-xs text-muted-foreground">4 blocks (2 Boys, 2 Girls)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bed className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Total Capacity</p>
                          <p className="text-xs text-muted-foreground">200 students</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bed className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Current Occupancy</p>
                          <p className="text-xs text-muted-foreground">85%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Room Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up room types and amenities
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Single Occupancy Rooms</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Double Occupancy Rooms</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Triple Occupancy Rooms</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Study Rooms</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Common Rooms</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Library Step */}
            {activeStep === 6 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Library Inventory</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up library collections and categories
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Total Books</p>
                          <p className="text-xs text-muted-foreground">5,000 volumes</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Digital Resources</p>
                          <p className="text-xs text-muted-foreground">500 e-books</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Magazines & Journals</p>
                          <p className="text-xs text-muted-foreground">50 periodicals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Library Policies</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure lending rules and fines
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Loan Period</label>
                        <select
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="7">7 days</option>
                          <option value="14" selected>14 days</option>
                          <option value="21">21 days</option>
                          <option value="30">1 month</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium mb-1">Fine Per Day</label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          defaultValue="2"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus-ring-primary"
                        />
                        <span className="ml-2 text-xs text-muted-foreground">₹ per day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Step */}
            {activeStep === 7 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up how and when notifications are sent
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Fee Reminders</p>
                          <p className="text-xs text-muted-foreground">3 days before due date</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Attendance Alerts</p>
                          <p className="text-xs text-muted-foreground">Same day notification</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">Exam Notifications</p>
                          <p className="text-xs text-muted-foreground">1 week before exam</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Communication Channels</h3>
                    <p className="text-sm text-muted-foreground">
                      Select preferred communication methods
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>SMS Notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>In-app Notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary rounded-border focus:ring-primary"
                        />
                        <span>WhatsApp Alerts</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        {activeStep > 0 && (
          <button
            onClick={goToPrevious}
            className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
          >
            Previous Step
          </button>
        )}
        {activeStep < steps.length - 1 ? (
          <button
            onClick={goToNext}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Complete Setup
          </button>
        )}
      </div>
    </div>
  );
}