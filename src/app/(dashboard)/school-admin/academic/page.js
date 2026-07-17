"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassManagement from "../../../../features/school-admin/components/academic/ClassManagement";
import SubjectManagement from "../../../../features/school-admin/components/academic/SubjectManagement";
import AcademicOverview from "../../../../features/school-admin/components/academic/AcademicOverview";

export default function AcademicPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Academic Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 ${activeTab === "overview" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted/100"} rounded-lg transition-colors`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-4 py-2 ${activeTab === "classes" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted/100"} rounded-lg transition-colors`}
          >
            Classes & Sections
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-4 py-2 ${activeTab === "subjects" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted/100"} rounded-lg transition-colors`}
          >
            Subjects
          </button>
        </div>
      </div>

      {activeTab === "overview" && <AcademicOverview />}
      {activeTab === "classes" && <ClassManagement />}
      {activeTab === "subjects" && <SubjectManagement />}
    </div>
  );
}