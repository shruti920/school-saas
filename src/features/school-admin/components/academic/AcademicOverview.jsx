import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Users, Calendar, Banknote, Building, Bus, Bed, BookOpen, Bell, GraduationCap, List } from "lucide-react";
import { useAcademicData } from "@/features/school-admin/hooks/useSchoolAdminData";
import { schoolAdminService } from "@/features/school-admin/services/schoolAdminService";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";

export default function AcademicOverview() {
  const { data, loading, error, refetch } = useAcademicData();
  const { schoolId } = useSchoolAdmin();
  const classes = data?.classes || [];
  const subjects = data?.subjects || [];
  const exams = data?.exams || [];

  if (loading) return <div className="text-center py-12">Loading academic data...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading academic data: {error.message}</div>;

  // Process classes data for the overview (extract what we need from the Supabase response)
  const processedClasses = classes.map(cls => ({
    name: cls.name,
    students: cls.students?._count || 0,
    sections: cls.sections?.length || 0,
    teacher: cls.sections && cls.sections.length > 0 ? "Assigned" : "Not assigned" // Simplified for now
  }));

  // Process subjects data
  const processedSubjects = subjects.map(subj => ({
    name: subj.name,
    classes: "1-5", // This would need to be calculated from actual class assignments in a real app
    teacher: "Assigned", // Simplified
    classesCount: 5 // Placeholder
  }));

  // Process upcoming exams
  const processedExams = exams.map(exam => ({
    name: exam.name,
    date: new Date(exam.start_date || exam.end_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    classes: "1-5", // Would need to be determined from exam_schedule
    subject: exam.exam_schedule?.[0]?.subject?.name || "General" // Simplified
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Students
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {processedClasses.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              ▲ 12% from last month
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Classes
                </CardTitle>
                <p className="text-xs text-muted-foreground">{processedClasses.length}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              ▲ 2 new this month
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Subjects
                </CardTitle>
                <p className="text-xs text-muted-foreground">{processedSubjects.length}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              ▲ 3 added this term
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Upcoming Exams
                </CardTitle>
                <p className="text-xs text-muted-foreground">{processedExams.length}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="outline" className="text-xs">
              ▲ 1 more than last month
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Class Overview</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {processedClasses.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/5">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cls.sections} sections • {cls.students} students
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{cls.teacher}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Subject Allocation</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeader className="w-1/3">Subject</TableHeader>
                  <TableHeader className="w-1/3">Classes</TableHeader>
                  <TableHeader className="w-1/3">Assigned Teacher</TableHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedSubjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.classes}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-lg font-semibold">Upcoming Examinations</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeader className="w-1/3">Exam Name</TableHeader>
                <TableHeader className="w-1/3">Date</TableHeader>
                <TableHeader className="w-1/3">Applicable Classes</TableHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedExams.map((exam, index) => (
                <TableRow key={index}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.classes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}