import * as React from "react";
import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { CheckCircle, Settings, Users, Calendar, Banknote, Bus, Bed, BookOpen, Bell } from "lucide-react";
import { useSetupProgress } from "@/features/school-admin/hooks/useSchoolAdminData";

const stepIcons = {
  "School Profile": Settings,
  "Academic Structure": Calendar,
  "Staff & Faculty": Users,
  "Fee Structure": Banknote,
  Transport: Bus,
  Hostel: Bed,
  Library: BookOpen,
  Notifications: Bell
};

export default function SetupWizard() {
  const { steps, loading, error } = useSetupProgress();
  const completedSteps = steps.filter((step) => step.completed).length;
  const progressPercent = steps.length ? Math.round((completedSteps / steps.length) * 100) : 0;

  if (loading) return <div className="text-center py-12">Loading setup progress...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading setup progress: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Setup Progress</span>
          <span className="text-sm font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-muted/50 h-2.5 rounded-full overflow-hidden">
          <div className="bg-primary h-2.5 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <Title variant="h2">Setup Wizard</Title>
          <p className="text-sm text-muted-foreground">Track completion of your school setup steps and launch the admin panel.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No setup steps available for this school yet.</p>
          ) : (
            <div className="space-y-3">
              {steps.map((step) => {
                const Icon = stepIcons[step.name] || Settings;
                return (
                  <div
                    key={step.id}
                    className={`rounded-lg border p-4 transition-colors ${step.completed ? "border-primary/20 bg-primary/5" : "border-border bg-muted/50"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{step.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.completed ? "Completed" : "Pending configuration"}
                          </p>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${step.completed ? "bg-primary/10 text-primary" : "bg-muted/100 text-muted-foreground"}`}>
                        {step.completed ? "Complete" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

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