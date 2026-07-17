import * as React from "react";
import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableBodyCell } from "@/components/ui/table";
import { Users, Calendar, Banknote, Building, Bus, Bed, BookOpen, Bell, GraduationCap, List, Brackets, ShieldCheck, Clock, MapPin, Banknote } from "lucide-react";

export default function SchoolConfiguration() {
  // Sample data - would come from Supabase in real implementation
  const infrastructure = [
    { id: 1, name: "Classrooms", count: 24, status: "Operational" },
    { id: 2, name: "Laboratories", count: 4, status: "Operational" },
    { id: 3, name: "Library", count: 1, status: "Operational" },
    { id: 4, name: "Computer Lab", count: 1, status: "Operational" },
    { id: 5, name: "Sports Facilities", count: 2, status: "Maintenance" },
    { id: 6, name: "Auditorium", count: 1, status: "Operational" },
  ];

  const departments = [
    { id: 1, name: "Science", hod: "Dr. Sharma", faculty: 8, students: 120 },
    { id: 2, name: "Mathematics", hod: "Mr. Patel", faculty: 6, students: 110 },
    { id: 3, name: "Languages", hod: "Ms. Gupta", faculty: 5, students: 95 },
    { id: 4, name: "Humanities", hod: "Mr. Kumar", faculty: 4, students: 80 },
    { id: 5, name: "Commerce", hod: "Ms. Nair", faculty: 3, students: 60 },
  ];

  const staffDesignations = [
    { id: 1, title: "Principal", count: 1, department: "Administration" },
    { id: 2, title: "Vice Principal", count: 1, department: "Administration" },
    { id: 3, title: "Head of Department", count: 5, department: "Various" },
    { id: 4, title: "Senior Teacher", count: 12, department: "Various" },
    { id: 5, title: "Teacher", count: 45, department: "Various" },
    { id: 6, title: "Lab Assistant", count: 4, department: "Science" },
    { id: 7, title: "Librarian", count: 1, department: "Library" },
    { id: 8, title: "Administrative Officer", count: 3, department: "Administration" },
  ];

  const policies = [
    { id: 1, name: "Attendance Policy", lastUpdated: "Jan 15, 2025", version: "v2.1" },
    { id: 2, name: "Fee Policy", lastUpdated: "Dec 01, 2024", version: "v1.8" },
    { id: 3, name: "Examination Policy", lastUpdated: "Nov 20, 2024", version: "v3.0" },
    { id: 4, name: "Discipline Policy", lastUpdated: "Oct 10, 2024", version: "v1.5" },
    { id: 5, name: "Leave Policy", lastUpdated: "Sep 05, 2024", version: "v2.0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">School Configuration</h1>
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
          >
            Add Configuration
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Export Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Infrastructure */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Infrastructure
                </Title>
                <p className="text-sm text-muted-foreground">
                  Manage school facilities and resources
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {infrastructure.map((infra) => (
                <div key={infra.id} className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                  <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{infra.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {infra.count} units • {infra.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Departments */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Departments
                </Title>
                <p className="text-sm text-muted-foreground">
                  Academic departments and faculty
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                  <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Brackets className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-xs text-muted-foreground">
                      HOD: {dept.hod} • {dept.faculty} faculty • {dept.students} students
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Designations */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Staff Designations
                </Title>
                <p className="text-sm text-muted-foreground">
                  Teaching and non-teaching positions
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {staffDesignations.map((designation) => (
                <div key={designation.id} className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                  <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{designation.title}</p>
                    <p className="text-xs text-muted-foreground">
                      -foreground">
                      {designation.count} positions • {designation.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Policies */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <List className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Policies & Procedures
                </Title>
                <p className="text-sm text-muted-foreground">
                  School policies and operational guidelines
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policies.map((policy) => (
                <div key={policy.id} className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{policy.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Updated: {policy.lastUpdated} • Version: {policy.version}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Labs & Special Facilities */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Flask className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Laboratories & Facilities
                </Title>
                <p className="text-sm text-muted-foreground">
                  Specialized learning facilities
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Science Labs</h3>
                  <p className="text-sm text-muted-foreground">
                    Physics, Chemistry, Biology labs available
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Computer Lab</h3>
                  <p className="text-sm text-muted-foreground">
                    30 computers with latest software
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Language Lab</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive language learning facility
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Library</h3>
                  <p className="text-sm text-muted-foreground">
                    10,000+ books and digital resources
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transportation & Hostel */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Bus className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Transportation
                </Title>
                <p className="text-sm text-muted-foreground">
                  School transport management
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Bus Fleet</h3>
                  <p className="text-sm text-muted-foreground">
                    15 buses in operation
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Routes</h3>
                  <p className="text-sm text-muted-foreground">
                    12 routes covering the city
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Students Transported</h3>
                  <p className="text-sm text-muted-foreground">
                    450 students daily
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Drivers</h3>
                  <p className="text-sm text-muted-foreground">
                    15 certified drivers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Bed className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h3" className="font-semibold">
                  Hostel Facilities
                </Title>
                <p className="text-sm text-muted-foreground">
                  Student accommodation management
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Hostel Blocks</h3>
                  <p className="text-sm text-muted-foreground">
                    4 blocks (2 Boys, 2 Girls)
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Total Capacity</h3>
                  <p className="text-sm text-muted-foreground">
                    200 students
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Current Occupancy</h3>
                  <p className="text-sm text-muted-foreground">
                    85% (170 students)
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Wardens</h3>
                  <p className="text-sm text-muted-foreground">
                    4 resident wardens
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Since we don't have a Flask icon in lucide-react, let's create a simple placeholder
function Flask({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 4h6l2 6h4l-3 9H6L3 10h4z" />
    </svg>
  );
}