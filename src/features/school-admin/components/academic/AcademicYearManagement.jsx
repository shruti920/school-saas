import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Calendar, Check, Plus, Trash2, Edit2 } from "lucide-react";
import { useAcademicYear } from "@/features/school-admin/hooks";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { toast } from "sonner";

export default function AcademicYearManagement() {
  const { data: academicYears, current: currentYear, loading, error, refetch } = useAcademicYear();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingYearId, setEditingYearId] = React.useState(null);
  const [editYearData, setEditYearData] = React.useState({
    name: "",
    start_date: "",
    end_date: "",
    is_current: false
  });

  const handleAddAcademicYear = async () => {
    try {
      if (!editYearData.name.trim()) {
        toast.error("Academic year name is required");
        return;
      }
      if (!editYearData.start_date) {
        toast.error("Start date is required");
        return;
      }
      if (!editYearData.end_date) {
        toast.error("End date is required");
        return;
      }

      await schoolAdminService.createAcademicYear(schoolId, {
        name: editYearData.name,
        start_date: editYearData.start_date,
        end_date: editYearData.end_date,
        is_current: editYearData.is_current
      });

      toast.success("Academic year added successfully!");
      setShowAddModal(false);
      refetch();
    } catch (err) {
      console.error("Error adding academic year:", err);
      toast.error("Failed to add academic year: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateAcademicYear = async () => {
    try {
      if (!editYearData.name.trim()) {
        toast.error("Academic year name is required");
        return;
      }
      if (!editYearData.start_date) {
        toast.error("Start date is required");
        return;
      }
      if (!editYearData.end_date) {
        toast.error("End date is required");
        return;
      }

      await schoolAdminService.updateAcademicYear(editingYearId, {
        name: editYearData.name,
        start_date: editYearData.start_date,
        end_date: editYearData.end_date,
        is_current: editYearData.is_current
      });

      toast.success("Academic year updated successfully!");
      setShowEditModal(false);
      refetch();
    } catch (err) {
      console.error("Error updating academic year:", err);
      toast.error("Failed to update academic year: " + (err.message || "Unknown error"));
    }
  };

  const handleDeleteAcademicYear = async (id) => {
    try {
      await schoolAdminService.deleteAcademicYear(id);
      toast.success("Academic year deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Error deleting academic year:", err);
      toast.error("Failed to delete academic year: " + (err.message || "Unknown error"));
    }
  };

  const handleSetCurrent = async (id) => {
    try {
      await schoolAdminService.setCurrentAcademicYear(id);
      toast.success("Academic year set as current!");
      refetch();
    } catch (err) {
      console.error("Error setting current academic year:", err);
      toast.error("Failed to set current academic year: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <div className="text-center py-12">Loading academic years...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading academic years: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Academic Years
                </CardTitle>
                <p className="text-xs text-muted-foreground">{academicYears?.length || 0}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {currentYear ? `${currentYear.name} (Current)` : "None"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Current Academic Year
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {currentYear ? new Date(currentYear.start_date).toLocaleDateString('en-US', { year: 'numeric' }) + ' - ' + new Date(currentYear.end_date).toLocaleDateString('en-US', { year: 'numeric' }) : "None"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {currentYear ? "Active" : "None Set"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Plus className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Add Academic Year
                </CardTitle>
                <p className="text-xs text-muted-foreground">Click to add new</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <button
              onClick={() => {
                setEditYearData({
                  name: "",
                  start_date: "",
                  end_date: "",
                  is_current: false
                });
                setShowAddModal(true);
              }}
              className="w-full h-12 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
            >
              + Add New
            </button>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Academic Year Duration
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {academicYears && academicYears.length > 0 ?
                    `${academicYears.reduce((min, y) => new Date(y.start_date) < new Date(min.start_date) ? y : min, academicYears[0]).start_date.substring(0, 4)} - ${academicYears.reduce((max, y) => new Date(y.end_date) > new Date(max.end_date) ? y : max, academicYears[0]).end_date.substring(0, 4)}`
                    : "No data"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              {academicYears && academicYears.length > 0 ? "Valid Range" : "No Data"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Academic Years Table */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold">Academic Years</h2>
          <p className="text-sm text-muted-foreground">
            Manage academic years for your school
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeader className="w-1/4">Academic Year</TableHeader>
                  <TableHeader className="w-1/4">Duration</TableHeader>
                  <TableHeader className="w-1/6">Status</TableHeader>
                  <TableHeader className="w-1/6">Actions</TableHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {academicYears && academicYears.length > 0 ? (
                  academicYears.map((year) => (
                    <TableRow key={year.id} className="hover:bg-muted/50">
                      <TableCell>{year.name}</TableCell>
                      <TableCell>
                        {new Date(year.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} -
                        {new Date(year.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="flex items-center space-x-2">
                        {year.is_current ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetCurrent(year.id)}
                            className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                            disabled={year.is_current}
                          >
                            Set as Current
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="flex justify-end space-x-2">
                        {editingYearId === year.id ? (
                          <>
                            <button
                              onClick={handleUpdateAcademicYear}
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
                                setEditYearData({
                                  name: year.name,
                                  start_date: year.start_date,
                                  end_date: year.end_date,
                                  is_current: year.is_current
                                });
                                setEditingYearId(year.id);
                                setShowEditModal(true);
                              }}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors"
                            >
                              <Edit2 className="mr-1 h-3 w-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAcademicYear(year.id)}
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
                    <TableCell colSpan="4" className="text-center py-4">
                      No academic years found. Click "Add Academic Year" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Academic Year Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add Academic Year</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Academic Year Name</label>
                <input
                  type="text"
                  value={editYearData.name}
                  onChange={(e) => setEditYearData({...editYearData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 2024-2025"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={editYearData.start_date}
                  onChange={(e) => setEditYearData({...editYearData, start_date: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={editYearData.end_date}
                  onChange={(e) => setEditYearData({...editYearData, end_date: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Set as Current Year</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editYearData.is_current}
                    onChange={(e) => setEditYearData({...editYearData, is_current: e.target.checked})}
                    className="h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {editYearData.is_current ? "Will be set as current academic year" : ""}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAcademicYear}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Add Academic Year
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Academic Year Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Academic Year</h2>
            <form onClick={e => e.stopPropagation()} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Academic Year Name</label>
                <input
                  type="text"
                  value={editYearData.name}
                  onChange={(e) => setEditYearData({...editYearData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={editYearData.start_date}
                  onChange={(e) => setEditYearData({...editYearData, start_date: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={editYearData.end_date}
                  onChange={(e) => setEditYearData({...editYearData, end_date: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Set as Current Year</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editYearData.is_current}
                    onChange={(e) => setEditYearData({...editYearData, is_current: e.target.checked})}
                    className="h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {editYearData.is_current ? "Will be set as current academic year" : ""}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAcademicYear}
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