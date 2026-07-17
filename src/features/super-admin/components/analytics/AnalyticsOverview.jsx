import * as React from "react";
import { cn } from "@/lib/utils";

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">$2.4M</p>
          <p className="text-xs text-green-500">+15% vs last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Students</h3>
          <p className="text-2xl font-bold text-blue-600">12,450</p>
          <p className="text-xs text-green-500">+8% vs last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Teacher Count</h3>
          <p className="text-2xl font-bold text-purple-600">890</p>
          <p className="text-xs text-green-500">+5% vs last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">System Uptime</h3>
          <p className="text-2xl font-bold text-amber-600">99.9%</p>
          <p className="text-xs text-green-500">+0.1% vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <RevenueChart className="mb-4" />
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Monthly revenue showing steady growth over the past 6 months
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Fee Collection Rate</h3>
            <FeeCollectionChart className="mb-4" />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Current collection rate: 94%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Student Growth</h3>
            <div className="h-32 w-full bg-gray-200 rounded-lg dark:bg-gray-700 relative overflow-hidden">
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0,35 Q20,5 40,20 T80,35 L80,40 L0,40 Z" fill="url(#grad3)" />
                  <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:rgba(155,89,182,0.8);" />
                      <stop offset="100%" style="stop-color:rgba(155,89,182,0.1);" />
                    </linearGradient>
                  </defs>
                  <polyline points="0,35 20,5 40,20 60,25 80,35" fill="none" stroke="#9b59b6" stroke-width="2" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Student enrollment showing strong growth trend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}