import Link from "next/link";
import { Home } from "lucide-react";

export default function SchoolAdminBreadcrumb({ children, href }) {
  return (
    <nav className="hidden lg:flex items-center space-x-2 px-4 py-2 text-sm text-sidebar-foreground" aria-label="breadcrumb">
      <Link href="/" className="hover:text-primary">
        <Home className="h-4 w-4" />
      </Link>
      <span className="text-muted-foreground">/</span>
      {href ? (
        <>
          <Link href={href} className="hover:text-primary">
            School Admin
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary">{children}</span>
        </>
      ) : (
        <span className="text-primary">{children}</span>
      )}
    </nav>
  );
}