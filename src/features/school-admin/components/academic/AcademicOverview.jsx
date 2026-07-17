import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Users, Calendar, Banknote, Building, Bus, Bed, BookOpen, Bell, GraduationCap, List } from "lucide-react";

export default function AcademicOverview() {
  // Sample data - would come from Supabase in real implementation
  const classes = [
    { name: "Nursery", students: 25, sections: 2, teacher: "Ms. Sharma" },
    { name: "LKG", students: 28, sections: 2, teacher: "Ms. Patel" },
    { name: "UKG", students: 30, sections: 2, teacher: "Ms. Gupta" },
    { name: "1st", students: 32, sections: 3, teacher: "Mr. Singh" },
    { name: "2nd", students: 30, sections: 3, teacher: "Ms. Reddy" },
    { name: "3rd", students: 28, sections: 2, teacher: "Mr. Kumar" },
    { name: "4th", students: 25, sections: 2, teacher: "Ms. Nair" },
    { name: "5th", students: 22, sections: 2, teacher: "Mr. Joshi" },
  ];

  const subjects = [
    { name: "Mathematics", classes: "1-5", teacher: "Mr. Sharma", classesCount: 5 },
    { name: "English", classes: "1-5", teacher: "Ms. Patel", classesCount: 5 },
    { name: " Science", classes: "3-5", teacher: "Ms. Gupta", classesCount: 3 },
    { name: "Hindi", classes: "1-5", teacher: "Mr. Kumar", classesCount: 5 },
    { name: "Computer", classes: "3-5", teacher: "Ms. Nair", classesCount: 3 },
  ];

  const upcomingExams = [
    { name: "Unit Test 1", date: "Jan 15, 2025", classes: "1-5", subject: "Mathematics" },
    { name: "Unit Test 1", date: "Jan 16, 2025", classes: "1-5", subject: "English" },
    { name: "Unit Test 1", date: "Jan 17, 2025", classes: "3-5", subject: "Science" },
  ];

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
                <p className="text-xs text-muted-foreground">1,245</p>
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
                <p className="text-xs text-muted-foreground">8</p>
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
                <p className="text-xs text-muted-foreground">15</p>
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
                <p className="text-xs text-muted-foreground">3</p>
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
              {classes.map((cls, index) => (
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
                {subjects.map((subject, index) => (
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
              {upcomingExams.map((exam, index) => (
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