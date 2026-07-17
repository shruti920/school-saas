import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Users, Calendar, Banknote, Building, Bus, Bed, BookOpen, Bell, GraduationCap, List, Brackets } from "lucide-react";

export default function ClassManagement() {
  // Sample data - would come from Supabase in real implementation
  const classes = [
    { id: 1, name: "Nursery", sections: 2, students: 25, teacher: "Ms. Sharma" },
    { id: 2, name: "LKG", sections: 2, students: 28, teacher: "Ms. Patel" },
    { id: 3, name: "UKG", sections: 2, students: 30, teacher: "Ms. Gupta" },
    { id: 4, name: "1st", sections: 3, students: 32, teacher: "Mr. Singh" },
    { id: 5, name: "2nd", sections: 3, students: 30, teacher: "Ms. Reddy" },
    { id: 6, name: "3rd", sections: 2, students: 28, teacher: "Mr. Kumar" },
    { id: 7, name: "4th", sections: 2, students: 25, teacher: "Ms. Nair" },
    { id: 8, name: "5th", sections: 2, students: 22, teacher: "Mr. Joshi" },
    { id: 9, name: "6th", sections: 3, students: 35, teacher: "Ms. Reddy" },
    { id: 10, name: "7th", sections: 3, students: 33, teacher: "Mr. Kumar" },
    { id: 11, name: "8th", sections: 2, students: 30, teacher: "Ms. Nair" },
    { id: 12, name: "9th", sections: 2, students: 28, teacher: "Mr. Sharma" },
    { id: 13, name: "10th", sections: 2, students: 25, teacher: "Ms. Patel" },
    { id: 14, name: "11th", sections: 2, students: 22, teacher: "Mr. Joshi", stream: "Science" },
    { id: 15, name: "12th", sections: 2, students: 20, teacher: "Ms. Gupta", stream: "Science" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle variant="h2">Class Management</CardTitle>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
              Add New Class
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
                {classes.reduce((sum, c) => sum + c.students, 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {classes.reduce((sum, c) => sum + c.sections, 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Sections</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {classes.reduce((unique, c) => {
                  const stream = c.stream || 'General';
                  return [...new Set([...unique, stream])].length;
                }, ['General'])}
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
                    <TableCell>{cls.sections}</TableCell>
                    <TableCell>{cls.students}</TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell>
                      {cls.stream ? (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-xs text-xs">
                          {cls.stream}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">General</span>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <button className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-hover hover:bg-primary/20 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-destructive/10 text-destructive text-xs rounded-hover hover:bg-destructive/20 transition-colors">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
                        <span className="text-xs text-primary">{cls.sections} sections</span>
                      </div>
                      <div className="space-y-1">
                        {[...Array(cls.sections)].map((_, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="h-6 w-6 bg-primary/20 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {String.fromCharCode(65 + index)} {/* A, B, C, ... */}
                              </span>
                            </div>
                            <span className="text-sm">Section {String.fromCharCode(65 + index)}</span>
                          </div>
                        ))}
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