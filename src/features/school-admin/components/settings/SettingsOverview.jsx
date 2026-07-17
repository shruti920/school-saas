import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { Building, Users, Calendar, Banknote, Bus, Bed, BookOpen, Bell } from "lucide-react";

export default function SettingsOverview() {
  const settings = [
    {
      title: "School Information",
      icon: Building,
      description: "Manage school profile, contact information, and academic details",
      href: "/(dashboard)/school-admin/settings/profile",
    },
    {
      title: "User Management",
      icon: Users,
      description: "Manage staff, teachers, and administrative users",
      href: "/(dashboard)/school-admin/settings/users",
    },
    {
      title: "Academic Calendar",
      icon: Calendar,
      description: "Set up academic terms, holidays, and important dates",
      href: "/(dashboard)/school-admin/settings/calendar",
    },
    {
      title: "Fee Structure",
      icon: Banknote,
      description": "Configure fee categories, amounts, and payment schedules",
      href: "/(dashboard)/school-admin/settings/fees",
    },
    {
      title: "Transport Management",
      icon: Bus,
      description: "Manage bus routes, vehicles, and student transport assignments",
      href: "/(dashboard)/school-admin/settings/transport",
    },
    {
      title: "Hostel Management",
      icon: Bed,
      description: "Manage hostel facilities, rooms, and student allotments",
      href: "/(dashboard)/school-admin/settings/hostel",
    },
    {
      title: "Library Settings",
      icon: BookOpen,
      description: "Configure library categories, lending policies, and fines",
      href: "/(dashboard)/school-admin/settings/library",
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Set up notification templates and communication preferences",
      href: "/(dashboard)/school-admin/settings/notifications",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {settings.map((setting, index) => (
          <Card key={index} className="hover:bg-muted transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <setting.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Title variant="h3" className="font-semibold">
                    {setting.title}
                  </Title>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
              </div>
              <a
                href={setting.href}
                className="text-sm font-medium text-primary hover:underline"
              >
                Manage Settings
              </a>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}