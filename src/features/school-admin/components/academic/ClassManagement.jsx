import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Users, Calendar, Banknote, Building, Bus, Bed, BookOpen, Bell, GraduationCap, List, Brackets, Plus, Trash2, Edit2 } from "lucide-react";
import { useAcademicData } from "@/features/school-admin/hooks/useSchoolAdminData";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";
import { toast } from "sonner";

export default function ClassManagement() {
  const { data, loading, error, refetch } = useAcademicData();
  const { schoolId } = useSchoolAdmin();
  const classes = data?.classes || [];
  const [showAddClassModal, setShowAddClassModal] = React.useState(false);
  const [editingClassId, setEditingClassId] = React.useState(null);
  const [editClassData, setEditClassData] = React.useState({
    name: "",
    stream: "",
    capacity: 30
  });

  const handleAddClass = async () => {
    // In a real app, this would call a service to create a class
    // For now, we'll just show a toast and refresh
    try {
      // Validate input
      if (!editClassData.name.trim()) {
        toast.error("Class name is required");
        return;
      }

      // Call the service to create a class
      await schoolAdminService.createClass(schoolId, {
        name: editClassData.name,
        sort_order: 0 // Default sort order, could be calculated based on existing classes
      });

      toast.success("Class added successfully!");
      setShowAddClassModal(false);
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error adding class:", err);
      toast.error("Failed to add class: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateClass = async (classId) => {
    // In a real app, this would call a service to update the class
    try {
      // Validate input
      if (!editClassData.name.trim()) {
        toast.error("Class name is required");
        return;
      }

      // Call the service to update the class
      await schoolAdminService.updateClass(classId, {
        name: editClassData.name,
        stream: editClassData.stream,
        capacity: editClassData.capacity
      });

      toast.success("Class updated successfully!");
      setEditingClassId(null);
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error updating class:", err);
      toast.error("Failed to update class: " + (err.message || "Unknown error"));
    }
  };

  const handleDeleteClass = async (classId) => {
    // In a real app, this would call a service to delete the class
    try {
      // Call the service to delete the class
      await schoolAdminService.deleteClass(classId);

      toast.success("Class deleted successfully!");
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error deleting class:", err);
      toast.error("Failed to delete class: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <div className="text-center py-12">Loading classes...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading classes: {error.message}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle variant="h2">Class Management</CardTitle>
            <button
              onClick={() => setShowAddClassModal(true)}
              className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Class
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage class sections, student allocations, and class teachers
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">{classes.length}</h3>
              <p className="text-sm text-muted-foreground">Total Classes</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {classes.reduce((sum, cls) => sum + (cls.students?._count || 0), 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {classes.reduce((sum, cls) => sum + (cls.sections?.length || 0), 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Sections</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {/* Count unique streams - in a real app this would come from a stream/class stream table */}
                {[...new Set(classes.map(cls => cls.stream || 'General'))].length}
              </h3>
              <p className="text-sm text-muted-foreground">Streams</p>
            </div>
          </div>

          {/* Classes Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeader className="w-1/6">Class Name</TableHeader>
                  <TableHeader className="w-1/6">Sections</TableHeader>
                  <TableHeader className="w-1/6">Total Students</TableHeader>
                  <TableHeader className="w-1/6">Class Teacher</TableHeader>
                  <TableHeader className="w-1/6">Stream</TableHeader>
                  <TableHeader className="w-1/6">Actions</TableHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-muted/50">
                    <TableCell>{cls.name}</TableCell>
                    <TableCell>{cls.sections?.length || 0}</TableCell>
                    <TableCell>{cls.students?._count || 0}</TableCell>
                    <TableCell>
                      {/* In a real app, we'd get the teacher name from a teacher assignment table */}
                      {cls.sections && cls.sections.length > 0 ? (
                        <span className="text-xs text-primary">Assigned</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {/* We would need to get stream from a separate table or field */}
                      <span className="text-xs text-muted-foreground">{cls.stream || 'General'}</span>
                    </TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      {editingClassId === cls.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateClass(cls.id)}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingClassId(null)}
                            className="px-3 py-1 bg-muted/10 text-muted-foreground text-xs rounded-hover hover:bg-muted/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingClassId(cls.id);
                              setEditClassData({
                                name: cls.name,
                                stream: cls.stream || '',
                                capacity: cls.capacity || 30
                              });
                            }}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                          >
                            <Edit2 className="mr-1 h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls.id)}
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

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Class</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Class Name</label>
                <input
                  type="text"
                  value={editClassData.name}
                  onChange={(e) => setEditClassData({...editClassData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter class name (e.g., Class 5A)"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Stream</label>
                <select
                  value={editClassData.stream}
                  onChange={(e) => setEditClassData({...editClassData, stream: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Stream</option>
                  <option value="General">General</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Capacity</label>
                <input
                  type="number"
                  value={editClassData.capacity || 30}
                  onChange={(e) => setEditClassData({...editClassData, capacity: parseInt(e.target.value) || 30})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="10"
                  max="50"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClass}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {editingClassId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Class</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Class Name</label>
                <input
                  type="text"
                  value={editClassData.name}
                  onChange={(e) => setEditClassData({...editClassData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Stream</label>
                <select
                  value={editClassData.stream}
                  onChange={(e) => setEditClassData({...editClassData, stream: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Stream</option>
                  <option value="General">General</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Capacity</label>
                <input
                  type="number"
                  value={editClassData.capacity || 30}
                  onChange={(e) => setEditClassData({...editClassData, capacity: parseInt(e.target.value) || 30})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="10"
                  max="50"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingClassId(null)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateClass(editingClassId)}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Section Management */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Section Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage sections within each class (e.g., Section A, B, C)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Sections by Class</h3>
                <div className="space-y-3">
                  {classes.map((cls) => (
                    <div key={cls.id} className="p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{cls.name}</span>
                        <span className="text-xs text-primary">{cls.sections?.length || 0} sections</span>
                      </div>
                      <div className="space-y-1">
                        {(cls.sections || []).map((section, index) => (
                          <div key={section.id || index} className="flex items-center space-x-2">
                            <div className="h-6 w-6 bg-primary/20 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {String.fromCharCode(65 + index)} {/* A, B, C, ... */}
                              </span>
                            </div>
                            <span className="text-sm">Section {String.fromCharCode(65 + index)}</span>
                          </div>
                        ))}
                        {(cls.sections || []).length === 0 && (
                          <div className="text-xs text-muted-foreground text-center py-2">
                            No sections defined
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Section Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure section-specific settings and policies
                </p>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1">Maximum Students per Section</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        min="10"
                        max="50"
                        defaultValue="30"
                        className="w-20 px-3 py-2 border border-border rounded-lg bg-muted/50 text-center"
                      />
                      <span className="text-xs text-muted-foreground">students</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1">Section Promotion Policy</label>
                    <select
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="merit" selected>Merit Based</option>
                      <option value="age">Age Based</option>
                      <option value="random">Random Distribution</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}