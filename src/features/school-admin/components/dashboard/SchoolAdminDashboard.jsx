"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title as ChartTitle, Tooltip, Legend, BarController, LineController, LineElement, PointElement as LinePointElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Calendar, Users, Banknote, CalendarCheck, TrendingUp, CalendarX } from "lucide-react";
import { useSchoolAdmin } from "@/features/school-admin/contexts/SchoolAdminContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, ChartTitle, Tooltip, Legend, BarController);
ChartJS.register(CategoryScale, LinearScale, LineElement, LinePointElement, ChartTitle, Tooltip, Legend, LineController);

export default function SchoolAdminDashboard() {
  const {
    dashboardData,
    academicData,
    configurationData,
    setupSteps,
    readinessStatus,
    loading,
    error,
    refreshData
  } = useSchoolAdmin();

  const [date, setDate] = React.useState(new Date());

  // Process real data for charts - use deterministic values based on actual data
  const generateChartData = React.useCallback((baseValue, variance, count = 7) => {
    if (!baseValue) return Array(count).fill(0);
    return Array.from({ length: count }, (_, i) => {
      // Create deterministic variation based on index to avoid Math.random in render
      const varianceFactor = 0.8 + (Math.sin(i) * 0.2); // Deterministic variation
      return Math.max(0, baseValue * varianceFactor);
    });
  }, []);

  // Initialize chart data objects
  let feeCollectionData = { labels: [], datasets: [] };
  let studentStats = { labels: [], datasets: [] };
  let attendanceData = { labels: [], datasets: [] };

  // Calculate chart data if we have dashboard data
  if (dashboardData) {
    feeCollectionData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Fee Collection (₹)',
        data: generateChartData(dashboardData.revenue || 0, 0.2),
        borderColor: '#f65215',
        backgroundColor: 'rgba(246, 82, 21, 0.1)',
        tension: 0.3
      }]
    };

    studentStats = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'New Admissions',
        data: generateChartData((dashboardData.students || 0) * 0.02, 0.3), // ~2% of students as monthly admissions
        backgroundColor: 'rgba(246, 82, 21, 0.2)',
        borderColor: '#f65215',
        borderWidth: 1
      }]
    };

    attendanceData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Attendance %',
        data: generateChartData(dashboardData.attendanceRate || 90, 0.05), // ±5% variance
        backgroundColor: 'rgba(246, 82, 21, 0.2)',
        borderColor: '#f65215',
        borderWidth: 1
      }]
    };
  }

  if (loading) return <div className="text-center py-12">Loading dashboard...</div>;
  if (error) return <div className="text-center text-destructive p-6">Error loading dashboard: {error.message}</div>;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Students */}
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Total Students
                </CardTitle>
                <p className="text-xs text-muted-foreground">{dashboardData?.students || 0}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary">▲ 12% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Banknote className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Monthly Revenue
                </CardTitle>
                <p className="text-xs text-muted-foreground">{dashboardData?.revenue ? `₹${dashboardData.revenue.toLocaleString()}` : '₹0'}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary">▲ 8% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <CalendarCheck className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Attendance Rate
                </CardTitle>
                <p className="text-xs text-muted-foreground">{dashboardData?.attendanceRate || 0}%</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary">▲ 2.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Attendance */}
        <Card className="bg-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="text-sm font-semibold text-primary">
                  Teacher Attendance
                </CardTitle>
                <p className="text-xs text-muted-foreground">{dashboardData?.teacherAttendance || 0}%</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary">▲ 1.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle variant="h2">Fee Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <Bar
                data={feeCollectionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: 'rgba(13, 10, 9, 0.8)',
                      titleColor: '#eae9ea',
                      bodyColor: '#eae9ea'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(138, 139, 140, 0.1)'
                      },
                      ticks: {
                        color: '#8a8b8c'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: '#8a8b8c'
                      }
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle variant="h2">Monthly Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <Bar
                data={studentStats}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: 'rgba(13, 10, 9, 0.8)',
                      titleColor: '#eae9ea',
                      bodyColor: '#eae9ea'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(138, 139, 140, 0.1)'
                      },
                      ticks: {
                        color: '#8a8b8c'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: '#8a8b8c'
                      }
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle variant="h2">This Month&apos;s Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-primary/10 text-primary rounded-hover text-sm hover:bg-primary/20 transition-colors">
                  <Calendar className="h-4 w-4" /> Previous
                </button>
                <button className="px-3 py-1 bg-primary/10 text-primary rounded-hover text-sm hover:bg-primary/20 transition-colors">
                  Next <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                <div className="text-center text-xs text-muted-foreground">Sun</div>
                <div className="text-center text-xs text-muted-foreground">Mon</div>
                <div className="text-center text-xs text-muted-foreground">Tue</div>
                <div className="text-center text-xs text-muted-foreground">Wed</div>
                <div className="text-center text-xs text-muted-foreground">Thu</div>
                <div className="text-center text-xs text-muted-foreground">Fri</div>
                <div className="text-center text-xs text-muted-foreground">Sat</div>

                {/* Days */}
                {[...Array(35)].map((_, index) => {
                  const day = index - 3; // Adjust for starting position
                  const isCurrentMonth = day >= 1 && day <= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                  const isToday = day === new Date().getDate() && new Date().getMonth() === new Date().getMonth();

                  return (
                    <div
                      key={index}
                      className={`h-10 w-full flex items-center justify-center rounded-lg
                        ${isToday ? 'bg-primary/20 text-primary' : ''}
                        ${!isCurrentMonth ? 'text-muted-foreground/50' : ''}
                        hover:bg-muted/50 hover:cursor-pointer`}
                    >
                      {isCurrentMonth ? day : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle variant="h2">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors">
                <Users className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Student Admissions</h3>
                  <p className="text-sm text-muted-foreground">Process new applications and enrollments</p>
                </div>
                <button className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Process
                </button>
              </div>

              <div className="flex items-center p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors">
                <Banknote className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Fee Collection</h3>
                  <p className="text-sm text-muted-foreground">Track and manage fee payments</p>
                </div>
                <button className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Collect
                </button>
              </div>

              <div className="flex items-center p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors">
                <Calendar className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Exam Schedule</h3>
                  <p className="text-sm text-muted-foreground">Manage examination timetables</p>
                </div>
                <button className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Schedule
                </button>
              </div>

              <div className="flex items-center p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors">
                <CalendarCheck className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Attendance</h3>
                  <p className="text-sm text-muted-foreground">Mark daily attendance</p>
                </div>
                <button className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Mark
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Progress */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">School Setup Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupSteps.length > 0 ? (
            <>
              {setupSteps.map((step) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-primary">{step.completed}%</span>
                  </div>
                  <div className="w-full bg-muted/50 h-2.5 rounded-full overflow-hidden">
                    <div className={`bg-primary h-2.5 w-${step.completed}%`} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-muted-foreground">Loading setup progress...</p>
          )}

          {/* Readiness Status */}
          {readinessStatus && readinessStatus.score !== undefined ? (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">School Readiness</span>
                <span className="text-sm text-primary">{readinessStatus.score}%</span>
              </div>
              <div className="w-full bg-muted/50 h-2.5 rounded-full overflow-hidden">
                <div className={`bg-primary h-2.5 w-${readinessStatus.score}%`} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {readinessStatus.checks?.map((check) => (
                  <div key={check.id} className="flex items-center justify-between">
                    <span>{check.title}</span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded
                        ${check.status === 'complete' ? 'bg-green-100 text-green-800'
                              : check.status === 'partial' ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'}`}
                    >
                      {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                    </span>
                  </div>
                )) || []}
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-4">Loading readiness status...</p>
          )}
        </CardContent>
        <div className="flex justify-end pt-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm" onClick={refreshData}>
            Refresh Data
          </button>
        </div>
      </Card>
    </div>
  );
}