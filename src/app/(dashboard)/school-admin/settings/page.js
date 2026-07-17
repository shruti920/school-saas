import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">School Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure school-wide settings, policies, and operational parameters
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">School Information</h3>
              <p className="text-sm text-muted-foreground">
                Manage school profile, contact details, and academic details
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Edit School Profile
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Academic Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure academic calendar, grading systems, and examination policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Manage Academic Settings
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Financial Settings</h3>
              <p className="text-sm text-muted-foreground">
                Set up fee structures, payment methods, and financial policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Configure Finance
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Transport Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage transport routes, vehicle details, and transport policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Transport Configuration
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Hostel Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure hostel facilities, room allocations, and hostel policies
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Hostel Management
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Library Settings</h3>
              <p className="text-sm text-muted-foreground">
                Set up library policies, fine structures, and book management rules
              </p>
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-hover hover:bg-primary/20 transition-colors">
                Library Configuration
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">System Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">Notification Preferences</p>
                  <p className="text-xs text-muted-foreground">
                    Configure how and when notifications are sent to stakeholders
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">User Roles & Permissions</p>
                  <p className="text-xs text-muted-foreground">
                    Define user roles and access permissions for different staff types
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold">Data Backup & Recovery</p>
                  <p className="text-xs text-muted-foreground">
                    Configure automated backups and data retention policies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}