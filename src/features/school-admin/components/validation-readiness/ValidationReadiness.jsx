import * as React from "react";
import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, CheckCircle, Loader2, TrendingUp, Users, Calendar, Banknote } from "lucide-react";
import { useReadinessStatus } from "@/features/school-admin/hooks/useSchoolAdminData";

export default function ValidationReadiness() {
  const { status, loading, error } = useReadinessStatus();
  const [filters, setFilters] = React.useState({
    category: "all",
    status: "all"
  });

  const readinessScore = status?.score ?? 0;
  const checks = status?.checks || [];

  const filteredChecks = checks.filter(check => {
    const categoryMatch = filters.category === "all" || check.category === filters.category;
    const statusMatch = filters.status === "all" || check.status === filters.status;
    return categoryMatch && statusMatch;
  });

  if (loading) return <div className="text-center py-12">Loading readiness status...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading readiness status: {error.message}</div>;

  const filteredChecks = checks.filter(check => {
    const categoryMatch = filters.category === "all" || check.category === filters.category;
    const statusMatch = filters.status === "all" || check.status === filters.status;
    return categoryMatch && statusMatch;
  });

  const handleCheckClick = (check) => {
    // Action not supported in read-only validation view
    return;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">School Readiness & Validation</h1>
        <div className="flex items-center space-x-3">
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-2 border border-border rounded-lg bg-muted/50 text-foreground"
          >
            <option value="all">All Categories</option>
            <option value="Profile">Profile</option>
            <option value="Academic">Academic</option>
            <option value="Staff">Staff</option>
            <option value="Finance">Finance</option>
            <option value="Transport">Transport</option>
            <option value="Hostel">Hostel</option>
            <option value="Library">Library</option>
            <option value="Communication">Communication</option>
            <option value="Calendar">Calendar</option>
            <option value="Schedule">Schedule</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 border border-border rounded-lg bg-muted/50 text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="complete">Complete</option>
            <option value="partial">Partial</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>

      {/* Readiness Score Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <Title variant="h2" className="font-semibold">
                  School Readiness Score
                </Title>
                <p className="text-sm text-muted-foreground">
                  Overall readiness for academic session
                </p>
              </div>
            </div>
            <div className="text-4xl font-bold">
              {readinessScore}%
            </div>
          </div>
          <div className="w-full bg-muted/50 h-4 rounded-full overflow-hidden">
            <div
              className={`bg-primary h-4 transition-width duration-1000`}
              style={{ width: `${readinessScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Ready for Session</span>
            <span>{readinessScore >= 80 ? "Yes" : "Needs Attention"}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Core Requirements Met</p>
                <p className="text-xs text-muted-foreground">
                  8/10 essential components completed
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Pending Actions Required</p>
                <p className="text-xs text-muted-foreground">
                  2 critical items need attention before session start
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Checks */}
      <Card>
        <CardHeader className="pb-4">
          <Title variant="h2" className="font-semibold">
            Validation Checklist
          </Title>
          <p className="text-sm text-muted-foreground">
            Review and complete all setup requirements
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {filteredChecks.map((check) => (
              <div
                key={check.id}
                onClick={() => handleClick(check)}
                className={`cursor-pointer flex items-start space-x-3 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors border-l-4 ${check.status === "complete" ? "border-primary" : check.status === "partial" ? "border-primary/50" : "border-destructive/50"}`}
              >
                <div className="h-8 w-8 flex items-center justify-center shrink-0">
                  {check.status === "complete" ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : check.status === "partial" ? (
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  ) : (
                    <Loader2 className="h-4 w-4 text-destructive animate-spin" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{check.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Category: {check.category}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  {check.status === "complete" && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-xs">
                      Completed
                    </span>
                  )}
                  {check.status === "partial" && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-xs">
                      In Progress
                    </span>
                  )}
                  {check.status === "incomplete" && (
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive rounded-xs">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-4">
          <Title variant="h2" className="font-semibold">
            Recommendations & Next Steps
          </Title>
          <p className="text-sm text-muted-foreground">
            Suggested actions to improve school readiness
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Complete Fee Structure Setup</p>
                <p className="text-xs text-muted-foreground">
                  Configure fee categories, amounts, and payment schedules for all classes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Finalize Staff Information</p>
                <p className="text-xs text-muted-foreground">
                  Add remaining staff members and assign them to appropriate departments
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Generate Master Timetable</p>
                <p className="text-xs text-muted-foreground">
                  Create and publish the academic timetable for all classes and sections
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end pt-4">
        <button
          className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 mr-2"
        >
          Export Readiness Report
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Run Validation Check
        </button>
      </div>
    </div>
  );
}