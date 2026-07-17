import * as React from "react";
import { Calendar, Clock, MapPin, TrendingUp, CheckCircle, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarTimetable() {
  // Sample data - would come from Supabase in real implementation
  const workingDays = [
    { id: 1, day: "Monday", status: "Working" },
    { id: 2, day: "Tuesday", status: "Working" },
    { id: 3, day: "Wednesday", status: "Working" },
    { id: 4, day: "Thursday", status: "Working" },
    { id: 5, day: "Friday", status: "Working" },
    { id: 6, day: "Saturday", status: "Half Day" },
    { id: 7, day: "Sunday", status: "Holiday" },
  ];

  const periods = [
    { id: 1, time: "8:30 AM - 9:15 AM", label: "Period 1" },
    { id: 2, time: "9:15 AM - 10:00 AM", label: "Period 2" },
    { id: 3, time: "10:00 AM - 10:45 AM", label: "Period 3" },
    { id: 4, time: "10:45 AM - 11:00 AM", label: "Short Break" },
    { id: 5, time: "11:00 AM - 11:45 AM", label: "Period 4" },
    { id: 6, time: "11:45 AM - 12:30 PM", label: "Period 5" },
    { id: 7, time: "12:30 PM - 1:15 PM", label: "Lunch Break" },
    { id: 8, time: "1:15 PM - 2:00 PM", label: "Period 6" },
    { id: 9, time: "2:00 PM - 2:45 PM", label: "Period 7" },
    { id: 10, time: "2:45 PM - 3:00 PM", label: "Short Break" },
    { id: 11, time: "3:00 PM - 3:45 PM", label: "Period 8" },
    { id: 12, time: "3:45 PM - 4:30 PM", label: "Period 9" },
  ];

  const holidays = [
    { id: 1, name: "Republic Day", date: "Jan 26, 2025", type: "National" },
    { id: 2, name: "Holi", date: "Mar 14, 2025", type: "Religious" },
    { id: 3, name: "Independence Day", date: "Aug 15, 2025", type: "National" },
    { id: 4, name: "Diwali", date: "Nov 01, 2025", type: "Religious" },
    { id: 5, name: "Christmas", date: "Dec 25, 2025", type: "Religious" },
  ];

  const timetable = [
    // Monday
    { day: "Monday", period: 1, subject: "Mathematics", teacher: "Mr. Sharma", class: "10A" },
    { day: "Monday", period: 2, subject: "Physics", teacher: "Ms. Gupta", class: "10A" },
    { day: "Monday", period: 3, subject: "English", teacher: "Ms. Patel", class: "10A" },
    { day: "Monday", period: 4, subject: "Chemistry", teacher: "Mr. Kumar", class: "10A" },
    { day: "Monday", period: 5, subject: "Biology", teacher: "Ms. Nair", class: "10A" },
    { day: "Monday", period: 6, subject: "History", teacher: "Mr. Joshi", class: "10A" },
    { day: "Monday", period: 7, subject: "Physical Education", teacher: "Coach Raj", class: "10A" },
    { day: "Monday", period: 8, subject: "Computer Science", teacher: "Mr. Sharma", class: "10A" },
    { day: "Monday", period: 9, subject: "Art", teacher: "Ms. Reddy", class: "10A" },

    // Tuesday
    { day: "Tuesday", period: 1, subject: "Physics", teacher: "Ms. Gupta", class: "10A" },
    { day: "Tuesday", period: 2, subject: "Mathematics", teacher: "Mr. Sharma", class: "10A" },
    { day: "Tuesday", period: 3, subject: "Chemistry", teacher: "Mr. Kumar", class: "10A" },
    { day: "Tuesday", period: 4, subject: "English", teacher: "Ms. Patel", class: "10A" },
    { day: "Tuesday", period: 5, subject: "Biology", teacher: "Ms. Nair", class: "10A" },
    { day: "Tuesday", period: 6, subject: "History", teacher: "Mr. Joshi", class: "10A" },
    { day: "Tuesday", period: 7, subject: "Sanskrit", teacher: "Ms. Sharma", class: "10A" },
    { day: "Tuesday", period: 8, subject: "Computer Science", teacher: "Mr. Sharma", class: "10A" },
    { day: "Tuesday", period: 9, subject: "Music", teacher: "Mr. Verma", class: "10A" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Calendar & Timetable Management</h1>
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
          >
            Generate Timetable
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Export Calendar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Working Days */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="font-semibold">
                  Working Days
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure school working days and holidays
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {workingDays.map((day) => (
                <div key={day.id} className="flex items-start space-x-3 p-2 bg-primary/5 rounded-lg">
                  <div className="h-6 w-6 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    {day.status === "Working" ? (
                      <CheckCircle className="h-3 w-3 text-primary" />
                    ) : day.status === "Holiday" ? (
                      <X className="h-3 w-3 text-destructive" />
                    ) : (
                      <Clock className="h-3 w-3 text-warning" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{day.day}</p>
                    <p className="text-xs text-muted-foreground capitalize">{day.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Periods & Timings */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="font-semibold">
                  Periods & Timings
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Set up daily schedule and periods
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {periods.map((period) => (
                <div key={period.id} className="flex items-start space-x-3 p-2 bg-primary/5 rounded-lg">
                  <div className="h-6 w-6 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{period.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {period.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holidays */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <CardTitle variant="h3" className="font-semibold">
                  Holidays & Events
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Academic holidays and special events
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {holidays.map((holiday) => (
                <div key={holiday.id} className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{holiday.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {holiday.date} • {holiday.type} Holiday
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Timetable</h2>
          <button
            className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors"
          >
            View Full Week
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Time / Day
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Monday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Tuesday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Wednesday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Thursday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Friday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Saturday
                  </th>
                </tr>
              </thead>
              <tbody>
                {periods.slice(0, 8).map((period, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-4 py-3 text-sm font-mono">
                      {period.time}
                    </td>
                    {/* Monday */}
                    <td className="px-4 py-3">
                      {timetable.find(
                        (entry) => entry.day === "Monday" && entry.period === index + 1
                      ) ? (
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <div className="font-medium text-primary">
                            {timetable.find(
                              (entry) => entry.day === "Monday" && entry.period === index + 1
                            )?.subject}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {timetable.find(
                              (entry) => entry.day === "Monday" && entry.period === index + 1
                            )?.teacher}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">Free</div>
                      )}
                    </td>
                    {/* Tuesday */}
                    <td className="px-4 py-3">
                      {timetable.find(
                        (entry) => entry.day === "Tuesday" && entry.period === index + 1
                      ) ? (
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <div className="font-medium text-primary">
                            {timetable.find(
                              (entry) => entry.day === "Tuesday" && entry.period === index + 1
                            )?.subject}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {timetable.find(
                              (entry) => entry.day === "Tuesday" && entry.period === index + 1
                            )?.teacher}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">Free</div>
                      )}
                    </td>
                    {/* Wednesday */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground italic">Free</div>
                    </td>
                    {/* Thursday */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground italic">Free</div>
                    </td>
                    {/* Friday */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground italic">Free</div>
                    </td>
                    {/* Saturday */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground italic">Free</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Academic Calendar</h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-3">Upcoming Exams</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Mid Term Exams</p>
                    <p className="text-xs text-muted-foreground">
                      Jan 15-22, 2025 • Classes 1-12
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Annual Exams</p>
                    <p className="text-xs text-muted-foreground">
                      Mar 10-25, 2025 • Classes 1-12
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-3">School Events</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Sports Day</p>
                    <p className="text-xs text-muted-foreground">
                      Feb 15, 2025 • All Classes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Annual Day</p>
                    <p className="text-xs text-muted-foreground">
                      Mar 30, 2025 • All Classes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Science Exhibition</p>
                    <p className="text-xs text-muted-foreground">
                      Apr 20, 2025 • Classes 6-12
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icons since Lucide doesn't have all icons we need
function X({ className = "" }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Zap({ className = "" }) {
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
      <polygon points="13 2 3 14 12 14 3 22 13 10 23 22" />
    </svg>
  );
}

function Activity({ className = "" }) {
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
      <path d="M2 12h2l4 6-4 6 2 2l4-6 4 6 2 2l4-6" />
    </svg>
  );
}