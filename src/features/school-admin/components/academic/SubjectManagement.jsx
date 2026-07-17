import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { GraduationCap, BookOpen, Users, Calendar, Settings, Plus, Trash2, Edit2 } from "lucide-react";
import { useAcademicData } from "@/features/school-admin/hooks/useSchoolAdminData";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";
import { toast } from "sonner";

export default function SubjectManagement() {
  const { data, loading, error, refetch } = useAcademicData();
  const { schoolId } = useSchoolAdmin();
  const subjects = data?.subjects || [];
  const [showAddSubjectModal, setShowAddSubjectModal] = React.useState(false);
  const [editingSubjectId, setEditingSubjectId] = React.useState(null);
  const [editSubjectData, setEditSubjectData] = React.useState({
    name: "",
    code: "",
    periodsPerWeek: 4
  });

  // Process subjects data to match the expected format
  const processedSubjects = subjects.map((subj, index) => ({
    id: subj.id,
    name: subj.name,
    code: subj.code,
    classes: "1-12", // This would need to be determined from subject assignments in a real app
    teacher: "Assigned", // Simplified - would need to join with teacher assignments
    periodsPerWeek: subj.periods_per_week || 4 // Default value if not present
  }));

  const handleAddSubject = async () => {
    // In a real app, this would call a service to create a subject
    try {
      // Validate input
      if (!editSubjectData.name.trim()) {
        toast.error("Subject name is required");
        return;
      }
      if (!editSubjectData.code.trim()) {
        toast.error("Subject code is required");
        return;
      }

      // Call the service to create a subject
      await schoolAdminService.createSubject(schoolId, {
        name: editSubjectData.name,
        code: editSubjectData.code.toUpperCase(),
        periodsPerWeek: editSubjectData.periodsPerWeek
      });

      toast.success("Subject added successfully!");
      setShowAddSubjectModal(false);
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error adding subject:", err);
      toast.error("Failed to add subject: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateSubject = async (subjectId) => {
    // In a real app, this would call a service to update the subject
    try {
      // Validate input
      if (!editSubjectData.name.trim()) {
        toast.error("Subject name is required");
        return;
      }
      if (!editSubjectData.code.trim()) {
        toast.error("Subject code is required");
        return;
      }

      // Call the service to update the subject
      await schoolAdminService.updateSubject(subjectId, {
        name: editSubjectData.name,
        code: editSubjectData.code.toUpperCase(),
        periodsPerWeek: editSubjectData.periodsPerWeek
      });

      toast.success("Subject updated successfully!");
      setEditingSubjectId(null);
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error updating subject:", err);
      toast.error("Failed to update subject: " + (err.message || "Unknown error"));
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    // In a real app, this would call a service to delete the subject
    try {
      // Call the service to delete the subject
      await schoolAdminService.deleteSubject(subjectId);

      toast.success("Subject deleted successfully!");
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error deleting subject:", err);
      toast.error("Failed to delete subject: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <div className="text-center py-12">Loading subjects...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading subjects: {error.message}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle variant="h2">Subject Management</CardTitle>
            <button
              onClick={() => setShowAddSubjectModal(true)}
              className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Subject
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage subjects, subject codes, and teacher assignments
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">{processedSubjects.length}</h3>
              <p className="text-sm text-muted-foreground">Total Subjects</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {/* In a real app, we would calculate actual class-subject mappings from the database */}
                {/* For now, we'll use a placeholder value based on subjects count */}
                {processedSubjects.length > 0 ? processedSubjects.length * 5 : 0} {/* Placeholder: 5 classes per subject on average */}
              </h3>
              <p className="text-sm text-muted-foreground">Class-Subject Mappings</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {/* Count unique teachers - in a real app this would come from teacher assignments */}
                {/* For now, we'll use a placeholder */}
                {Math.min(5, processedSubjects.length)}
              </h3>
              <p className="text-sm text-muted-foreground">Unique Teachers</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {processedSubjects.reduce((sum, subj) => sum + (subj.periodsPerWeek || 4), 0) / Math.max(1, processedSubjects.length)}
              </h3>
              <p className="text-sm text-muted-foreground">Avg Periods/Week</p>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeader className="w-1/6">Subject Name</TableHeader>
                  <TableHeader className="w-1/6">Subject Code</TableHeader>
                  <TableHeader className="w-1/6">Applicable Classes</TableHeader>
                  <TableHeader className="w-1/6">Assigned Teacher</TableHeader>
                  <TableHeader className="w-1/6">Periods/Week</TableHeader>
                  <TableHeader className="w-1/6">Actions</TableHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedSubjects.map((subject) => (
                  <TableRow key={subject.id} className="hover:bg-muted/50">
                    <TableCell>{subject.name}</TableCell>
                    <TableCell className="text-xs font-mono">{subject.code}</TableCell>
                    <TableCell>{subject.classes}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>{subject.periodsPerWeek}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      {editingSubjectId === subject.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateSubject(subject.id)}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSubjectId(null)}
                            className="px-3 py-1 bg-muted/10 text-muted-foreground text-xs rounded-hover hover:bg-muted/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingSubjectId(subject.id);
                              const subjectData = subjects.find(s => s.id === subject.id);
                              setEditSubjectData({
                                name: subjectData?.name || "",
                                code: subjectData?.code || "",
                                periodsPerWeek: subjectData?.periods_per_week || 4
                              });
                            }}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                          >
                            <Edit2 className="mr-1 h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="px-3 py-1 bg-destructive/10 text-destructive text-xs rounded-hover hover:bg-destructive/20 transition-colors"
                          >
                            <Trash2 className="mr-1 h-3 w-3" /> Delete
                          </button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Subject</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject Name</label>
                <input
                  type="text"
                  value={editSubjectData.name}
                  onChange={(e) => setEditSubjectData({...editSubjectData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter subject name (e.g., Mathematics)"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject Code</label>
                <input
                  type="text"
                  value={editSubjectData.code}
                  onChange={(e) => setEditSubjectData({...editSubjectData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter subject code (e.g., MATH101)"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Periods per Week</label>
                <input
                  type="number"
                  value={editSubjectData.periodsPerWeek || 4}
                  onChange={(e) => setEditSubjectData({...editSubjectData, periodsPerWeek: parseInt(e.target.value) || 4})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  max="10"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubject}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {editingSubjectId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject Name</label>
                <input
                  type="text"
                  value={editSubjectData.name}
                  onChange={(e) => setEditSubjectData({...editSubjectData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Subject Code</label>
                <input
                  type="text"
                  value={editSubjectData.code}
                  onChange={(e) => setEditSubjectData({...editSubjectData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Periods per Week</label>
                <input
                  type="number"
                  value={editSubjectData.periodsPerWeek || 4}
                  onChange={(e) => setEditSubjectData({...editSubjectData, periodsPerWeek: parseInt(e.target.value) || 4})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  max="10"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingSubjectId(null)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateSubject(editingSubjectId)}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subject Distribution by Class */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Subject Distribution by Class</CardTitle>
          <p className="text-sm text-muted-foreground">
            View which subjects are taught in each class
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Generate classes from 1 to 12 plus nursery, lkg, ukg */}
              {[...Array(12).keys()].map(i => i + 1).concat(['Nursery', 'LKG', 'UKG']).map((clsName, index) => {
                // Determine if class name is numeric or string
                const isNumeric = typeof clsName === 'number' || !isNaN(parseInt(clsName));
                const displayName = isNumeric ? `${clsName}th` : clsName;

                // Find subjects for this class
                // In a real app, we would filter based on actual subject-class assignments
                // For now, we'll show all subjects for all classes as a placeholder
                const classSubjects = processedSubjects; // Placeholder - all subjects for all classes

                return (
                  <div key={index} className="p-3 bg-primary/10 rounded-lg h-[200px]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-primary">{displayName}</span>
                      <span className="text-xs text-muted-foreground">{classSubjects.length} subjects</span>
                    </div>
                    <div className="h-[150px] overflow-y-auto">
                      <div className="space-y-1">
                        {classSubjects.map((subj, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                            <div className="h-4 w-4 bg-primary/20 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-3 w-3 text-primary" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-medium">{subj.name}</span>
                              <br />
                              <span className="text-xs text-muted-foreground block">
                                ({subj.code}) • {subj.periodsPerWeek} periods/week
                              </span>
                            </div>
                          </div>
                        ))}
                         {classSubjects.length === 0 && (
                          <div className="text-xs text-muted-foreground text-center py-4">
                            No subjects assigned
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}