import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  Banknote,
  Cog,
  GraduationCap,
  Building,
  Bus,
  Bed,
  BookOpen,
  Bell,
  LogOut,
} from "lucide-react";

export default function SchoolAdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/school-admin",
      icon: Home,
      isActive: pathname === "/school-admin",
    },
    {
      title: "Student Management",
      href: "/school-admin/students",
      icon: Users,
      isActive: pathname.startsWith("/school-admin/students"),
    },
    {
      title: "Academic Management",
      href: "/school-admin/academic",
      icon: GraduationCap,
      isActive: pathname.startsWith("/school-admin/academic"),
    },
    {
      title: "Fee Management",
      href: "/school-admin/fees",
      icon: Banknote,
      isActive: pathname.startsWith("/school-admin/fees"),
    },
    {
      title: "Staff Management",
      href: "/school-admin/staff",
      icon: Users,
      isActive: pathname.startsWith("/school-admin/staff"),
    },
    {
      title: "Transport",
      href: "/school-admin/transport",
      icon: Bus,
      isActive: pathname.startsWith("/school-admin/transport"),
    },
    {
      title: "Hostel",
      href: "/school-admin/hostel",
      icon: Bed,
      isActive: pathname.startsWith("/school-admin/hostel"),
    },
    {
      title: "Library",
      href: "/school-admin/library",
      icon: BookOpen,
      isActive: pathname.startsWith("/school-admin/library"),
    },
    {
      title: "Calendar & Timetable",
      href: "/school-admin/calendar-timetable",
      icon: Calendar,
      isActive: pathname.startsWith("/school-admin/calendar-timetable"),
    },
    {
      title: "Notifications",
      href: "/school-admin/notifications",
      icon: Bell,
      isActive: pathname.startsWith("/school-admin/notifications"),
    },
    {
      title: "Settings",
      href: "/school-admin/settings",
      icon: Cog,
      isActive: pathname.startsWith("/school-admin/settings"),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-border flex-shrink-0 z-20">
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">School Admin</h3>
            <p className="text-xs text-muted-foreground">Dashboard Overview</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center w-full gap-3 p-3 rounded-lg transition-colors ${
                item.isActive
                  ? "bg-primary/20 border-l-4 border-primary"
                  : "hover:bg-secondary/5"
              }`}
            >
              <item.icon
                className={`h-4 w-4 ${
                  item.isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  item.isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-border">
          <Link
            href="/login"
            className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}