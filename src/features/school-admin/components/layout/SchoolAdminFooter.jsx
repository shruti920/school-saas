export default function SchoolAdminFooter() {
  return (
    <footer className="lg:hidden h-14 bg-sidebar border-t border-border flex items-center justify-between px-4 text-sm text-sidebar-foreground">
      <span>School Management SaaS © {new Date().getFullYear()}</span>
      <span>
        <a href="#" className="hover:text-primary">
          Privacy Policy
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:text-primary">
          Terms of Service
        </a>
      </span>
    </footer>
  );
}