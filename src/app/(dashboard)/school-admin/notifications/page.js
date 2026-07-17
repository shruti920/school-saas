import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Notifications & Announcements</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage school-wide notifications, announcements, and communication templates
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Notifications</h3>
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Send New Notification
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg border-l-4 border-primary">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Parent-Teacher Meeting Schedule</p>
                  <p className="text-xs text-muted-foreground">Sent to all parents • Today • 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg border-l-4 border-primary">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Fee Payment Reminder - January Installment</p>
                  <p className="text-xs text-muted-foreground">Sent to parents • Yesterday • 3:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg border-l-4 border-primary">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Holiday Schedule: Republic Day</p>
                  <p className="text-xs text-muted-foreground">Sent to staff & students • 2 days ago • 11:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Notification Templates</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Fee Reminder Template</p>
                  <p className="text-xs text-muted-foreground">Used 45 times this month</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Attendance Alert Template</p>
                  <p className="text-xs text-muted-foreground">Used 23 times this month</p>
                </div>
              </div>
              <div className="flex items-start space-x-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Event Invitation Template</p>
                  <p className="text-xs text-muted-foreground">Used 12 times this month</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}