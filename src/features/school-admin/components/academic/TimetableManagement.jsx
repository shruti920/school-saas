import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, Plus, Trash2, Edit2, Clock } from "lucide-react";
import { useTimetable } from "@/features/school-admin/hooks";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { toast } from "sonner";

export default function TimetableManagement() {
  const { data: timetableSlots, loading, error, refetch } = useTimetable();
  const { schoolId } = useSchoolAdmin();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingSlotId, setEditingSlotId] = React.useState(null);
  const [editSlotData, setEditSlotData] = React.useState({
    class_id: "",
    section_id: "",
    subject_id: "",
    teacher_profile_id: "",
    day_of_week: "",
    period_number: "",
    start_time: "",
    end_time: "",
    room: "",
    academic_year: ""
  });

  // Fetch classes, sections, subjects, teachers for dropdowns
  const [classes, setClasses] = React.useState([]);
  const [sections, setSections] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [academicYears, setAcademicYears] = React.useState([]);
  const [loadingOptions, setLoadingOptions] = React.useState(true);

  React.useEffect(() => {
    const fetchOptions = async () => {
      if (!schoolId) return;
      try {
        setLoadingOptions(true);
        // Fetch all needed data in parallel
        const [
          classesRes,
          subjectsRes,
          teachersRes,
          yearsRes
        ] = await Promise.all([
          schoolAdminService.getAcademicData(schoolId),
          schoolAdminService.getAcademicData(schoolId),
          schoolAdminService.getAcademicData(schoolId), // This needs to be changed to fetch teachers properly
          schoolAdminService.getAcademicYears(schoolId)
        ]);

        // Extract data from the combined response
        setClasses(classesRes.classes || []);
        // Flatten sections from classes
        const allSections = [];
        classesRes.classes?.forEach(cls => {
          cls.sections?.forEach(sec => {
            allSections.push({ ...sec, class_name: cls.name });
          });
        });
        setSections(allSections);
        setSubjects(subjectsRes.subjects || []);
        // Teachers would come from profiles with role teacher
        // For now, we'll fetch teachers separately since getAcademicData doesn't return them
        setTeachers([]); // Placeholder - would need proper service method
        setAcademicYears(yearsRes || []);
      } catch (err) {
        console.error("Error fetching options:", err);
        toast.error("Failed to load form options");
      } finally {
        setLoadingOptions(false);
      }
    };

    if (schoolId) {
      fetchOptions();
    }
  }, [schoolId]);

  const handleAddTimetableSlot = async () => {
    try {
      // Validation
      if (!editSlotData.class_id) {
        toast.error("Class is required");
        return;
      }
      if (!editSlotData.section_id) {
        toast.error("Section is required");
        return;
      }
      if (!editSlotData.subject_id) {
        toast.error("Subject is required");
        return;
      }
      if (!editSlotData.teacher_profile_id) {
        toast.error("Teacher is required");
        return;
      }
      if (!editSlotData.day_of_week) {
        toast.error("Day of week is required");
        return;
      }
      if (!editSlotData.period_number) {
        toast.error("Period number is required");
        return;
      }
      if (!editSlotData.start_time) {
        toast.error("Start time is required");
        return;
      }
      if (!editSlotData.end_time) {
        toast.error("End time is required");
        return;
      }
      if (!editSlotData.academic_year) {
        toast.error("Academic year is required");
        return;
      }

      await schoolAdminService.createTimetableSlot(schoolId, {
        class_id: editSlotData.class_id,
        section_id: editSlotData.section_id,
        subject_id: editSlotData.subject_id,
        teacher_profile_id: editSlotData.teacher_profile_id,
        day_of_week: parseInt(editSlotData.day_of_week),
        period_number: parseInt(editSlotData.period_number),
        start_time: editSlotData.start_time,
        end_time: editSlotData.end_time,
        room: editSlotData.room || null,
        academic_year: editSlotData.academic_year
      });

      toast.success("Timetable slot added successfully!");
      setShowAddModal(false);
      refetch();
    } catch (err) {
      console.error("Error adding timetable slot:", err);
      toast.error("Failed to add timetable slot: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateTimetableSlot = async () => {
    try {
      // Validation (same as add)
      if (!editSlotData.class_id) {
        toast.error("Class is required");
        return;
      }
      if (!editSlotData.section_id) {
        toast.error("Section is required");
        return;
      }
      if (!editSlotData.subject_id) {
        toast.error("Subject is required");
        return;
      }
      if (!editSlotData.teacher_profile_id) {
        toast.error("Teacher is required");
        return;
      }
      if (!editSlotData.day_of_week) {
        toast.error("Day of week is required");
        return;
      }
      if (!editSlotData.period_number) {
        toast.error("Period number is required");
        return;
      }
      if (!editSlotData.start_time) {
        toast.error("Start time is required");
        return;
      }
      if (!editSlotData.end_time) {
        toast.error("End time is required");
        return;
      }
      if (!editSlotData.academic_year) {
        toast.error("Academic year is required");
        return;
      }

      await schoolAdminService.updateTimetableSlot(editingSlotId, {
        class_id: editSlotData.class_id,
        section_id: editSlotData.section_id,
        subject_id: editSlotData.subject_id,
        teacher_profile_id: editSlotData.teacher_profile_id,
        day_of_week: parseInt(editSlotData.day_of_week),
        period_number: parseInt(editSlotData.period_number),
        start_time: editSlotData.start_time,
        end_time: editSlotData.end_time,
        room: editSlotData.room || null,
        academic_year: editSlotData.academic_year
      });

      toast.success("Timetable slot updated successfully!");
      setShowEditModal(false);
      refetch();
    } catch (err) {
      console.error("Error updating timetable slot:", err);
      toast.error("Failed to update timetable slot: " + (err.message || "Unknown error"));
    }
  };

  const handleDeleteTimetableSlot = async (id) => {
    try {
      await schoolAdminService.deleteTimetableSlot(id);
      toast.success("Timetable slot deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Error deleting timetable slot:", err);
      toast.error("Failed to delete timetable slot: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <div className="text-center py-12">Loading timetable...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading timetable: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Timetable Slots
                </CardTitle>
                <p className="text-xs text-muted-foreground">{timetableSlots?.length || 0}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {timetableSlots && timetableSlots.length > 0 ? `${timetableSlots.length} Slots` : "No Slots"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Configured Classes
                </CardTitle>
                <p className="text-xs text-muted-foreground">{classes.length || 0}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {classes.length > 0 ? "Classes Ready" : "Add Classes"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Plus className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Add Timetable Slot
                </CardTitle>
                <p className="text-xs text-muted-foreground">Click to add new</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <button
              onClick={() => {
                setEditSlotData({
                  class_id: "",
                  section_id: "",
                  subject_id: "",
                  teacher_profile_id: "",
                  day_of_week: "",
                  period_number: "",
                  start_time: "",
                  end_time: "",
                  room: "",
                  academic_year: ""
                });
                setShowAddModal(true);
              }}
              className="w-full h-12 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
            >
              + Add Slot
            </button>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Academic Year
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {academicYears.find(y => y.is_current)?.name || "Not Set"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {academicYears.find(y => y.is_current) ? "Set" : "Not Set"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Timetable Slots Table */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold">Timetable Slots</h2>
          <p className="text-sm text-muted-foreground">
            Manage class timetable slots for your school
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/6">Class</TableHead>
                  <TableHead className="w-1/6">Section</TableHead>
                  <TableHead className="w-1/6">Subject</TableHead>
                  <TableHead className="w-1/6">Teacher</TableHead>
                  <TableHead className="w-1/6">Day & Period</TableHead>
                  <TableHead className="w-1/6">Time</TableHead>
                  <TableHead className="w-1/6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetableSlots && timetableSlots.length > 0 ? (
                  timetableSlots.map((slot) => (
                    <TableRow key={slot.id} className="hover:bg-muted/50">
                      <TableCell>
                        {slot.class?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {slot.section?.name || "N/A"}
                        ({slot.class?.name || ""})
                      </TableCell>
                      <TableCell>
                        {slot.subject?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {slot.teacher?.full_name || "N/A"}
                      </TableCell>
                      <TableCell className="flex flex-col">
                        <span>
                          {/* Convert day number to name */}
                          {[,"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][parseInt(slot.day_of_week)] || "Invalid"}
                        </span>
                        <span className="mt-1">Period {slot.period_number}</span>
                      </TableCell>
                      <TableCell>
                        {slot.start_time} - {slot.end_time}
                      </TableCell>
                      <TableCell className="flex justify-end space-x-2">
                        {editingSlotId === slot.id ? (
                          <>
                            <button
                              onClick={handleUpdateTimetableSlot}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setShowEditModal(false)}
                              className="px-3 py-1 bg-muted/10 text-muted-foreground text-xs rounded-hover hover:bg-muted/20 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditSlotData({
                                  class_id: slot.class_id || "",
                                  section_id: slot.section_id || "",
                                  subject_id: slot.subject_id || "",
                                  teacher_profile_id: slot.teacher_profile_id || "",
                                  day_of_week: slot.day_of_week.toString(),
                                  period_number: slot.period_number.toString(),
                                  start_time: slot.start_time,
                                  end_time: slot.end_time,
                                  room: slot.room || "",
                                  academic_year: slot.academic_year
                                });
                                setEditingSlotId(slot.id);
                                setShowEditModal(true);
                              }}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                            >
                              <Edit2 className="mr-1 h-3 w-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTimetableSlot(slot.id)}
                              className="px-3 py-1 bg-destructive/10 text-destructive text-xs rounded-hover hover:bg-destructive/20 transition-colors"
                            >
                              <Trash2 className="mr-1 h-3 w-3" /> Delete
                            </button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No timetable slots found. Click "Add Timetable Slot" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Timetable Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add Timetable Slot</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Class</label>
                <select
                  value={editSlotData.class_id}
                  onChange={(e) => setEditSlotData({...editSlotData, class_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Section</label>
                <select
                  value={editSlotData.section_id}
                  onChange={(e) => setEditSlotData({...editSlotData, section_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name} ({sec.class_name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select
                  value={editSlotData.subject_id}
                  onChange={(e) => setEditSlotData({...editSlotData, subject_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Teacher</label>
                <select
                  value={editSlotData.teacher_profile_id}
                  onChange={(e) => setEditSlotData({...editSlotData, teacher_profile_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Teacher</option>
                  {/* Teachers would be populated from profiles service */}
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Day of Week</label>
                <select
                  value={editSlotData.day_of_week}
                  onChange={(e) => setEditSlotData({...editSlotData, day_of_week: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Day</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="7">Sunday</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Period Number</label>
                <input
                  type="number"
                  value={editSlotData.period_number}
                  onChange={(e) => setEditSlotData({...editSlotData, period_number: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={editSlotData.start_time}
                  onChange={(e) => setEditSlotData({...editSlotData, start_time: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={editSlotData.end_time}
                  onChange={(e) => setEditSlotData({...editSlotData, end_time: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Room (Optional)</label>
                <input
                  type="text"
                  value={editSlotData.room}
                  onChange={(e) => setEditSlotData({...editSlotData, room: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Academic Year</label>
                <select
                  value={editSlotData.academic_year}
                  onChange={(e) => setEditSlotData({...editSlotData, academic_year: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map(year => (
                    <option key={year.id} value={year.name}>
                      {year.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddTimetableSlot}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Add Timetable Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Timetable Slot Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Timetable Slot</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Class</label>
                <select
                  value={editSlotData.class_id}
                  onChange={(e) => setEditSlotData({...editSlotData, class_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Section</label>
                <select
                  value={editSlotData.section_id}
                  onChange={(e) => setEditSlotData({...editSlotData, section_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name} ({sec.class_name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select
                  value={editSlotData.subject_id}
                  onChange={(e) => setEditSlotData({...editSlotData, subject_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Teacher</label>
                <select
                  value={editSlotData.teacher_profile_id}
                  onChange={(e) => setEditSlotData({...editSlotData, teacher_profile_id: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Day of Week</label>
                <select
                  value={editSlotData.day_of_week}
                  onChange={(e) => setEditSlotData({...editSlotData, day_of_week: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Day</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="7">Sunday</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Period Number</label>
                <input
                  type="number"
                  value={editSlotData.period_number}
                  onChange={(e) => setEditSlotData({...editSlotData, period_number: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={editSlotData.start_time}
                  onChange={(e) => setEditSlotData({...editSlotData, start_time: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={editSlotData.end_time}
                  onChange={(e) => setEditSlotData({...editSlotData, end_time: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Room (Optional)</label>
                <input
                  type="text"
                  value={editSlotData.room}
                  onChange={(e) => setEditSlotData({...editSlotData, room: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Academic Year</label>
                <select
                  value={editSlotData.academic_year}
                  onChange={(e) => setEditSlotData({...editSlotData, academic_year: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map(year => (
                    <option key={year.id} value={year.name}>
                      {year.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateTimetableSlot}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}