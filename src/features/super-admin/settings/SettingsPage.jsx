"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "super-admin-settings";

const defaultProfile = {
  fullName: "Administrator",
  email: "admin@schoolexample.com",
  phone: "+1 (555) 123-4567",
};

const defaultNotificationSettings = {
  emailAlerts: true,
  smsAlerts: false,
  weeklyDigest: true,
  systemUpdates: true,
};

const defaultOrganization = {
  organizationName: "School ERP Network",
  contactEmail: "info@schoolexample.com",
  contactPhone: "+1 (555) 123-4567",
  address: "123 Education Avenue, Learning City, LC 12345",
  website: "https://www.schoolexample.com",
};

const defaultPreferences = {
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12-hour",
};

const readStoredSettings = () => {
  if (typeof window === "undefined") {
    return {
      profileData: defaultProfile,
      notificationSettings: defaultNotificationSettings,
      organizationData: defaultOrganization,
      preferencesData: defaultPreferences,
    };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      profileData: defaultProfile,
      notificationSettings: defaultNotificationSettings,
      organizationData: defaultOrganization,
      preferencesData: defaultPreferences,
    };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      profileData: { ...defaultProfile, ...parsed.profileData },
      notificationSettings: { ...defaultNotificationSettings, ...parsed.notificationSettings },
      organizationData: { ...defaultOrganization, ...parsed.organizationData },
      preferencesData: { ...defaultPreferences, ...parsed.preferencesData },
    };
  } catch (error) {
    console.error("Unable to restore saved settings", error);
    return {
      profileData: defaultProfile,
      notificationSettings: defaultNotificationSettings,
      organizationData: defaultOrganization,
      preferencesData: defaultPreferences,
    };
  }
};

export default function SettingsPage() {
  const initialSettings = React.useMemo(() => readStoredSettings(), []);
  const [activeTab, setActiveTab] = React.useState("profile");
  const [profileData, setProfileData] = React.useState(initialSettings.profileData);
  const [notificationSettings, setNotificationSettings] = React.useState(initialSettings.notificationSettings);
  const [organizationData, setOrganizationData] = React.useState(initialSettings.organizationData);
  const [preferencesData, setPreferencesData] = React.useState(initialSettings.preferencesData);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState("");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData((current) => ({ ...current, [name]: value }));
  };

  const handleOrganizationChange = (event) => {
    const { name, value } = event.target;
    setOrganizationData((current) => ({ ...current, [name]: value }));
  };

  const handlePreferencesChange = (event) => {
    const { name, value } = event.target;
    setPreferencesData((current) => ({ ...current, [name]: value }));
  };

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;
    setNotificationSettings((current) => ({ ...current, [name]: checked }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage("");

    const payload = {
      profileData,
      notificationSettings,
      organizationData,
      preferencesData,
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }

    window.setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Settings saved and available on this device.");
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure the franchise and notification preferences for the super-admin workspace.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage ? <span className="text-sm text-green-600">{saveMessage}</span> : null}
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <nav className="space-y-2 lg:col-span-1">
          <button
            onClick={() => handleTabChange("profile")}
            className={cn(
              "w-full rounded-lg px-4 py-3 text-left text-sm font-medium",
              activeTab === "profile"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabChange("notifications")}
            className={cn(
              "w-full rounded-lg px-4 py-3 text-left text-sm font-medium",
              activeTab === "notifications"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            Notifications
          </button>
          <button
            onClick={() => handleTabChange("organization")}
            className={cn(
              "w-full rounded-lg px-4 py-3 text-left text-sm font-medium",
              activeTab === "organization"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            Organization
          </button>
          <button
            onClick={() => handleTabChange("preferences")}
            className={cn(
              "w-full rounded-lg px-4 py-3 text-left text-sm font-medium",
              activeTab === "preferences"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            Preferences
          </button>
        </nav>

        <div className="space-y-4 lg:col-span-2">
          {activeTab === "profile" && (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="emailAlerts"
                    checked={notificationSettings.emailAlerts}
                    onChange={handleToggleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Alerts</span>
                  <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Receive important updates via email.</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="smsAlerts"
                    checked={notificationSettings.smsAlerts}
                    onChange={handleToggleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Alerts</span>
                  <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Get urgent notifications via text message.</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="weeklyDigest"
                    checked={notificationSettings.weeklyDigest}
                    onChange={handleToggleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Digest</span>
                  <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Receive a summary every Monday.</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onChange={handleToggleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Updates</span>
                  <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Stay informed about new features and maintenance.</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "organization" && (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Organization Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={organizationData.organizationName}
                    onChange={handleOrganizationChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={organizationData.contactEmail}
                    onChange={handleOrganizationChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={organizationData.contactPhone}
                    onChange={handleOrganizationChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    value={organizationData.address}
                    onChange={handleOrganizationChange}
                    rows={3}
                    className="w-full resize-y rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={organizationData.website}
                    onChange={handleOrganizationChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">System Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Time Zone</label>
                  <select
                    name="timezone"
                    value={preferencesData.timezone}
                    onChange={handlePreferencesChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="UTC">UTC</option>
                    <option value="US/Eastern">US Eastern</option>
                    <option value="US/Pacific">US Pacific</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                    <option value="Australia/Sydney">Australia/Sydney</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Used for timestamps and scheduling.</p>
                </div>
                <div className="space-y-2">
                  <label className="mb-1 block text-sm font-medium">Date Format</label>
                  <div className="flex flex-wrap gap-3">
                    {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="dateFormat"
                          value={option}
                          checked={preferencesData.dateFormat === option}
                          onChange={handlePreferencesChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="mb-1 block text-sm font-medium">Time Format</label>
                  <div className="flex flex-wrap gap-3">
                    {['12-hour', '24-hour'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="timeFormat"
                          value={option}
                          checked={preferencesData.timeFormat === option}
                          onChange={handlePreferencesChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}