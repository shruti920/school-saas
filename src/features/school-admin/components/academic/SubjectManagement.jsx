import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { GraduationCap, BookOpen, Users, Calendar, Settings } from "lucide-react";

export default function SubjectManagement() {
  // Sample data - would come from Supabase in real implementation
  const subjects = [
    { id: 1, name: "Mathematics", code: "MATH", classes: "1-10", teacher: "Mr. Sharma", periodsPerWeek: 5 },
    { id: 2, name: "English", code: "ENG", classes: "1-12", teacher: "Ms. Patel", periodsPerWeek: 5 },
    { id: 3, name: "Science", code: "SCI", classes: "3-10", teacher: "Ms. Gupta", periodsPerWeek: 4 },
    { id: 4, name: "Physics", code: "PHY", classes: "11-12", teacher: "Mr. Kumar", periodsPerWeek: 5 },
    { id: 5, name: "Chemistry", code: "CHEM", classes: "11-12", teacher: "Ms. Nair", periodsPerWeek: 5 },
    { id: 6, name: "Biology", code: "BIO", classes: "11-12", teacher: "Mr. Joshi", periodsPerWeek: 5 },
    { id: 7, name: "History", code: "HIS", classes: "6-10", teacher: "Ms. Reddy", periodsPerWeek: 3 },
    { id: 8, name: "Geography", code: "GEO", classes: "6-10", teacher: "Ms. Reddy", periodsPerWeek: 3 },
    { id: 9, name: "Computer Science", code: "CS", classes: "3-12", teacher: "Mr. Sharma", periodsPerWeek: 3 },
    { id: 10, name: "Hindi", code: "HIN", classes: "1-10", teacher: "Ms. Gupta", periodsPerWeek: 4 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle variant="h2">Subject Management</CardTitle>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
              Add New Subject
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
              <h3 className="font-semibold text-primary">{subjects.length}</h3>
              <p className="text-sm text-muted-foreground">Total Subjects</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {subjects.reduce((sum, s) => {
                  const classes = s.classes.split('-');
                  if (classes.length === 2) {
                    const start = parseInt(classes[0]);
                    const end = parseInt(classes[1]);
                    return sum + (end - start + 1);
                  }
                  return sum + 1;
                }, 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Class-Subject Mappings</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {...new Set(subjects.map(s => s.teacher))}.length
              </h3>
              <p className="text-sm text-muted-foreground">Unique Teachers</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-primary">
                {subjects.reduce((avg, s) => avg + s.periodsPerWeek, 0) / subjects.length}
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
                {subjects.map((subject) => (
                  <TableRow key={subject.id} className="hover:bg-muted/50">
                    <TableCell>{subject.name}</TableCell>
                    <TableCell className="text-xs font-mono">{subject.code}</TableCell>
                    <TableCell>{subject.classes}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>{subject.periodsPerWeek}</TableCell>
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
                const classSubjects = subjects.filter(subject => {
                  if (subject.classes.includes('1-12') || subject.classes.includes('1-10') ||
                      subject.classes.includes('1-8') || subject.classes.includes('1-5') ||
                      subject.classes.includes('3-12') || subject.classes.includes('3-10') ||
                      subject.classes.includes('3-8') || subject.classes.includes('6-10') ||
                      subject.classes.includes('6-8') || subject.classes.includes('11-12')) {
                    // Simplified check - in reality would parse the range properly
                    return true;
                  }
                  return false;
                });

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
                );
              })
            }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}