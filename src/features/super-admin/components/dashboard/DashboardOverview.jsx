import * as React from "react";
import { cn } from "@/lib/utils";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to the Super Admin Dashboard. This is your central hub for
          managing schools, viewing analytics, and configuring system settings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">
            Total Schools
          </h3>
          <p className="text-2xl font-bold text-emerald-600">124</p>
          <p className="text-xs text-green-500">+12% vs last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">
            Total Students
          </h3>
          <p className="text-2xl font-bold text-blue-600">12,450</p>
          <p className="text-xs text-green-500">+8% vs last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">
            Total Teachers
          </h3>
          <p className="text-2xl font-bold text-purple-600">890</p>
          <p className="text-xs text-green-500">+5% vs last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">
            Revenue
          </h3>
          <p className="text-2xl font-bold text-green-600">$2.4M</p>
          <p className="text-xs text-green-500">+15% vs last month</p>
        </div>
      </div>
    </div>
  );
}
