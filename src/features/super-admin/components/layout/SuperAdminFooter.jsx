import * as React from "react";
import { cn } from "@/lib/utils";

export default function SuperAdminFooter() {
  return (
    <footer className="h-14 border-t border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-sm text-center text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-center h-full">
        &copy; {new Date().getFullYear()} School ERP. All rights reserved.
      </div>
    </footer>
  );
}