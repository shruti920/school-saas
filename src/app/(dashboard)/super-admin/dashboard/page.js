import SuperAdminDashboardLayout from "@/features/super-admin/components/layout/SuperAdminDashboardLayout";

export default function SuperAdminDashboardPage() {
  return (
    <SuperAdminDashboardLayout>
      <div className="space-y-6">
        {/* Section A: Welcome */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-emerald-100 rounded flex items-center justify-center text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1-2-2-2zm0 2a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm0 4a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm0 4a.5.5 0 01-.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">Good Morning,</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Marcelona</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Today • Last Login: 2 hours ago</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">School Count</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">124</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Schools</h3>
            <p className="text-2xl font-bold text-emerald-600">124</p>
            <p className="text-xs text-green-500">+12% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Students</h3>
            <p className="text-2xl font-bold text-blue-600">12,450</p>
            <p className="text-xs text-green-500">+8% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Teachers</h3>
            <p className="text-2xl font-bold text-purple-600">890</p>
            <p className="text-xs text-green-500">+5% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Staff</h3>
            <p className="text-2xl font-bold text-indigo-600">450</p>
            <p className="text-xs text-green-500">+3% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-green-600">$2.4M</p>
            <p className="text-xs text-green-500">+15% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Collection %</h3>
            <p className="text-2xl font-bold text-amber-600">94%</p>
            <p className="text-xs text-green-500">+2% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Growth %</h3>
            <p className="text-2xl font-bold text-rose-600">18%</p>
            <p className="text-xs text-green-500">+3% vs last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
            <h3 className="font-medium mb-2">Health Score</h3>
            <p className="text-2xl font-bold text-indigo-600">92%</p>
            <p className="text-xs text-green-500">+1% vs last month</p>
          </div>
        </div>

        {/* Section C: India Map Placeholder */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="font-semibold mb-4">School Locations Map</h3>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg dark:bg-gray-700">
            <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
              Interactive India Map with School Pins<br/>
              <span className="text-xs">(Coming Soon - Interactive Map Feature)</span>
            </div>
          </div>
        </div>

        {/* Sections D & E: Revenue and Student Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h3 className="font-semibold mb-4">Revenue Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Monthly Revenue</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Fee Collection</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">94% collected</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg" style={{ width: '94%' }}></div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Outstanding Fees</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">$180K outstanding</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h3 className="font-semibold mb-4">Student Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Admissions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">+15% YoY</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Graduations</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">85% rate</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Dropouts</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">5% rate</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg" style={{ width: '5%' }}></div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Growth %</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">+12% YoY</span>
              </div>
              <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section F: School Rankings */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="font-semibold mb-4">School Rankings</h3>
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Top 10 Schools by Health Score</span>
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {/* Sample ranking items */}
              <div className="flex items-start space-x-3 p-2 bg-gray-50 rounded dark:bg-gray-700">
                <span className="flex-shrink-0 text-primary-600 dark:text-primary-400">1.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Delhi Public School</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Health Score: 98%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-gray-50 rounded dark:bg-gray-700">
                <span className="flex-shrink-0 text-primary-600 dark:text-primary-400">2.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Mumbai International School</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Health Score: 96%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-gray-50 rounded dark:bg-gray-700">
                <span className="flex-shrink-0 text-primary-600 dark:text-primary-400">3.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Bangalore Public School</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Health Score: 94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections G & H: Recent Activities and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h3 className="font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:bg-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">New school added: Chennai Vidya Mandir</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:bg-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center text-green-600 dark:bg-green-900/50 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 11-18 0" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Admin created: admin@mumbaischool.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Report generated: Monthly Performance</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-red-100 rounded flex items-center justify-center text-red-600 dark:bg-red-900/50 dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Low fee collection alert: Delhi Public School</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Collection rate dropped to 82%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Teacher shortage warning: Mumbai International School</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Student-teacher ratio: 35:1</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">System maintenance scheduled</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tonight 2AM-4AM UTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section I: Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 dark:bg-blue-600 dark:hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
              Add School
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 dark:bg-green-600 dark:hover:bg-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
              Generate Report
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 dark:bg-purple-600 dark:hover:bg-purple-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
              Invite Admin
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 dark:bg-indigo-600 dark:hover:bg-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </SuperAdminDashboardLayout>
  );
}