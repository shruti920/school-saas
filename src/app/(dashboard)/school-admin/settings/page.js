"use client";

import { useSchoolProfile } from "@/features/school-admin/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  WarningIcon,
  WarningCircleIcon,
  CheckCircleIcon,
  UserIcon,
  MapPinIcon,
  BuildingsIcon,
  CalendarDotsIcon,
  ShieldCheckIcon,
  GearIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function SettingsPage() {
  const { schoolProfile, loading, error, refetch: refreshData } = useSchoolProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    board_type: "",
    address: "",
    academic_year_start: "",
    academic_year_end: "",
    is_active: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateSchoolProfile(formData);

      // Reset form to view mode with current data (will be updated after refetch)
      setFormData({
        name: schoolProfile.name || "",
        state: schoolProfile.state || "",
        board_type: schoolProfile.board_type || "",
        address: schoolProfile.address || "",
        academic_year_start: schoolProfile.academic_year_start
          ? new Date(schoolProfile.academic_year_start).toISOString().split('T')[0]
          : "",
        academic_year_end: schoolProfile.academic_year_end
          ? new Date(schoolProfile.academic_year_end).toISOString().split('T')[0]
          : "",
        is_active: schoolProfile.is_active || true
      });

      alert("School profile updated successfully!");
    } catch (err) {
      console.error("Failed to update school profile:", err);
      alert("Failed to update school profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="space-y-6">
        {/* School Profile Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h2" className="text-sm font-semibold text-primary">
                  School Profile
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  View and edit your school&apos;s core information
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading school profile...</p>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 border border-destructive text-destructive rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold">Error loading school profile</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              </div>
            ) : !schoolProfile ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No school profile found</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {/* School Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* School Name */}
                    <div>
                      <h3 className="font-semibold mb-2">School Name</h3>
                      <p className="text-lg font-medium">{schoolProfile.name}</p>
                    </div>

                    {/* State */}
                    <div>
                      <h3 className="font-semibold mb-2">State</h3>
                      <p className="text-lg font-medium">{schoolProfile.state}</p>
                    </div>

                    {/* Board Type */}
                    <div>
                      <h3 className="font-semibold mb-2">Board Type</h3>
                      <p className="text-lg font-medium">{schoolProfile.board_type}</p>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="text-lg font-medium">{schoolProfile.address || "Not provided"}</p>
                    </div>

                    {/* Academic Year Start */}
                    <div>
                      <h3 className="font-semibold mb-2">Academic Year Start</h3>
                      <p className="text-lg font-medium">
                        {schoolProfile.academic_year_start ? new Date(schoolProfile.academic_year_start).toLocaleDateString() : "Not set"}
                      </p>
                    </div>

                    {/* Academic Year End */}
                    <div>
                      <h3 className="font-semibold mb-2">Academic Year End</h3>
                      <p className="text-lg font-medium">
                        {schoolProfile.academic_year_end ? new Date(schoolProfile.academic_year_end).toLocaleDateString() : "Not set"}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <h3 className="font-semibold mb-2">Status</h3>
                      <div className="flex items-center space-x-2">
                        {schoolProfile.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        // Populate form with current data for editing
                        setFormData({
                          name: schoolProfile.name || "",
                          state: schoolProfile.state || "",
                          board_type: schoolProfile.board_type || "",
                          address: schoolProfile.address || "",
                          academic_year_start: schoolProfile.academic_year_start
                            ? new Date(schoolProfile.academic_year_start).toISOString().split('T')[0]
                            : "",
                          academic_year_end: schoolProfile.academic_year_end
                            ? new Date(schoolProfile.academic_year_end).toISOString().split('T')[0]
                            : "",
                          is_active: schoolProfile.is_active || true
                        });
                      }}
                      className="btn btn-primary"
                    >
                      Edit School Profile
                    </button>
                  </div>
                </div>
              </>
          )}
        </CardContent>
      </Card>

      {/* Edit Form (shown when editing) */}
      {(formData.name || formData.state || formData.board_type) && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h2" className="text-sm font-semibold text-primary">
                  Edit School Profile
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Update your school&apos;s information
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* School Name */}
                <FormField>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* State */}
                <FormField>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* Board Type */}
                <FormField>
                  <FormLabel>Board Type</FormLabel>
                  <FormControl>
                    <Select
                      name="board_type"
                      value={formData.board_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select board type</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="STATE">State Board</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* Address */}
                <FormField>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* Academic Year Start */}
                <FormField>
                  <FormLabel>Academic Year Start</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      name="academic_year_start"
                      value={formData.academic_year_start}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* Academic Year End */}
                <FormField>
                  <FormLabel>Academic Year End</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      name="academic_year_end"
                      value={formData.academic_year_end}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>

                {/* Status */}
                <FormField>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormField>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Reset form to current school data
                    setFormData({
                      name: schoolProfile.name || "",
                      state: schoolProfile.state || "",
                      board_type: schoolProfile.board_type || "",
                      address: schoolProfile.address || "",
                      academic_year_start: schoolProfile.academic_year_start
                        ? new Date(schoolProfile.academic_year_start).toISOString().split('T')[0]
                        : "",
                      academic_year_end: schoolProfile.academic_year_end
                        ? new Date(schoolProfile.academic_year_end).toISOString().split('T')[0]
                        : "",
                      is_active: schoolProfile.is_active || true
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Other Settings Sections */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Academic Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure academic calendar, grading systems, and examination policies
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Academic Calendar</h3>
              <p className="text-sm text-muted-foreground">
                Set up academic terms, holidays, and important dates
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Academic Calendar
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Grading System</h3>
              <p className="text-sm text-muted-foreground">
                Configure grading scales, grade points, and promotion criteria
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Configure Grading
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Examination Policies</h3>
              <p className="text-sm text-muted-foreground">
                Set up exam schedules, grading policies, and result processing
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Examinations
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Financial Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Set up fee structures, payment methods, and financial policies
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Fee Structures</h3>
              <p className="text-sm text-muted-foreground">
                Define fee categories, amounts, and payment schedules
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Fee Structures
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              <p className="text-sm text-muted-foreground">
                Configure available payment options and gateways
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Configure Payments
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Financial Policies</h3>
              <p className="text-sm text-muted-foreground">
                Set up late fees, discounts, and financial aid policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Financial Policies
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Transport Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage transport routes, vehicle details, and transport policies
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Routes & Stops</h3>
              <p className="text-sm text-muted-foreground">
                Configure bus routes, stops, and pickup/drop-off points
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Routes
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Vehicle Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage school vehicles, drivers, and maintenance schedules
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Vehicles
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Transport Policies</h3>
              <p className="text-sm text-muted-foreground">
                Set up transport fees, safety policies, and service guidelines
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Transport Policies
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Hostel Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure hostel facilities, room allocations, and hostel policies
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Room Management</h3>
              <p className="text-sm text-muted-foreground">
                Configure hostel rooms, beds, and occupancy management
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Rooms
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Student Allocation</h3>
              <p className="text-sm text-muted-foreground">
                Manage room assignments, waiting lists, and room changes
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Allocations
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Hostel Policies</h3>
              <p className="text-sm text-muted-foreground">
                Set up hostel fees, visitor policies, and daily routines
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Hostel Policies
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Library Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Set up library policies, fine structures, and book management rules
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Book Management</h3>
              <p className="text-sm text-muted-foreground">
                Configure book categorization, lending policies, and inventory
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Books
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Library Policies</h3>
              <p className="text-sm text-muted-foreground">
                Set up borrowing rules, renewal policies, and overdue procedures
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Library Policies
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Fine Management</h3>
              <p className="text-sm text-muted-foreground">
                Configure fine calculation, payment processing, and waiver policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Fines
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6">
            <h3 className="font-semibold mb-3">System Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">Notification Preferences</p>
                  <p className="text-xs text-muted-foreground">
                    Configure how and when notifications are sent to stakeholders
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">User Roles & Permissions</p>
                  <p className="text-xs text-muted-foreground">
                    Define user roles and access permissions for different staff types
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">Data Backup & Recovery</p>
                  <p className="text-xs text-muted-foreground">
                    Configure automated backups and data retention policies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </>
  );
}