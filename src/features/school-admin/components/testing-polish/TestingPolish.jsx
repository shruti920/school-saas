import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Info, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TestingPolish() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showEmptyState, setShowEmptyState] = React.useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate random success/error for demo
      const rand = Math.random();
      if (rand > 0.7) {
        setError("Failed to load data: Network timeout");
        setData(null);
      } else if (rand > 0.3) {
        setData([
          { id: 1, name: "Sample Data 1", value: 100 },
          { id: 2, name: "Sample Data 2", value: 200 },
          { id: 3, name: "Sample Data 3", value: 150 },
        ]);
        setError(null);
      } else {
        setData([]);
        setError(null);
        setShowEmptyState(true);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Testing & Polish Showcase</h1>
      <p className="text-sm text-muted-foreground">
        Demonstration of responsive design, testing capabilities, empty states, loading skeletons, and error handling
      </p>

      {/* Responsive Design Demo */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Responsive Design Demo</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Desktop View</h3>
            <p className="text-xs text-muted-foreground">
              4 columns visible on large screens
            </p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Tablet View</h3>
            <p className="text-xs text-muted-foreground">
              2 columns visible on medium screens
            </p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Mobile View</h3>
            <p className="text-xs text-muted-foreground">
              1 column visible on small screens
            </p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Breakpoints</h3>
            <p className="text-xs text-muted-foreground">
              Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
            </p>
          </div>
        </div>
      </section>

      {/* Loading States & Skeletons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Loading States & Skeletons</h2>
        <div className="flex="space-y-4">
          div="space-x"

  buttonName="<!--     p x-4m-2 bx flex items-center justify-between mb-3">
          <button
            onClick={simulateLoading}
            disabled={loading}
            className={`px-4 py-2 ${loading ? "bg-muted/50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"} transition-colors`}
          >
            {loading ? "Loading..." : "Load Sample Data"}
          </button>
          <Button variant="outline" size="sm">
            Reset Demo
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-96 bg-muted/50 rounded-lg">
              <div className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-destructive/10 rounded-lg border-l-4 border-destructive">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-destructive/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-destructive">Error Loading Data</h3>
                <p className="text-sm text-destructive">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 px-3 py-1 bg-destructive text-destructive-foreground text-xs hover:bg-destructive/20"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ) : showEmptyState ? (
          <div className="text-center py-12">
            <div className="h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-muted-foreground">No Data Available</h3>
            <p className="text-sm text-muted-foreground mt-2">
              The data source returned no results. Try adjusting your filters or refreshing the data.
            </p>
            <div className="mt-6">
              <Button variant="outline">Try Again</Button>
              <Button ml-2>Reset Filters</Button>
            </div>
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm font-mono">{item.value}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-xs text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {data.length} records
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Export CSV</Button>
                <Button variant="outline" size="sm">Print</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Click "Load Sample Data" to see data display
            </p>
          </div>
        )}
      </section>

      {/* Validation & Error Handling Demo */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Validation & Error Handling</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Form Validation</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
                <p className="text-xs text-destructive mt-1">
                  Please enter a valid email address
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Password Strength
                </label>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-destructive/20 rounded-lg"></div>
                  <span className="text-xs text-destructive">Weak</span>
                </div>
                <p className="text-xs text-destructive mt-1">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <h3 className="font-semibold mb-2">Inline Validation</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full px-4 py-2 pl-12 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 XXXXXXXXXX"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +91
                  </div>
                </div>
                <p className="text-xs text-success mt-1">
                  Valid Indian mobile number format
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Date Range
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-xs text-success mt-1">
                  Valid date range selected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Indicators */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Performance Indicators</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-primary/10 rounded-lg border">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">2.3s</h3>
                <p className="text-xs text-muted-foreground">
                  Average Load Time
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">94%</h3>
                <p className="text-xs text-muted-foreground">
                  Core Web Vitals Score
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">Passed</h3>
                <p className="text-xs text-muted-foreground">
                  Accessibility Audit
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">Secure</h3>
                <p className="text-xs text-muted-foreground">
                  Security Scan Clear
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Component Showcase</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Alert Variants */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Alert Components</h3>
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Info className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary">Info Message</p>
                    <p className="text-xs text-muted-foreground">
                      This is an informational alert
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg border-l-4 border-destructive">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-destructive/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-destructive">Warning Message</p>
                    <p className="text-xs text-muted-foreground">
                      This is a warning alert
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-success/10 rounded-lg border-l-4 border-success">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-success/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-success">Success Message</p>
                    <p className="text-xs text-muted-foreground">
                      This is a success alert
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button Variants */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Button Variants</h3>
            <div className="grid gap-2">
              <Button variant="default" size="lg">
                Default Large
              </Button>
              <Button variant="default" size="sm">
                Default Small
              </Button>
              <Button variant="destructive" size="lg">
                Destructive Large
              </Button>
              <Button variant="destructive" size="sm">
                Destructive Small
              </Button>
              <Button variant="outline" size="lg">
                Outline Large
              </Button>
              <Button variant="outline" size="sm">
                Outline Small
              </Button>
              <Button variant="secondary" size="lg">
                Secondary Large
              </Button>
              <Button variant="secondary" size="sm">
                Secondary Small
              </Button>
            </div>
          </div>

          {/* Badge Variants */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Badge Components</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Checklist */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Testing Checklist</h2>
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Responsive Testing</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Mobile Responsiveness</p>
                  <p className="text-xs text-muted-foreground">
                    Tested on iPhone, Android, various screen sizes
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Tablet Responsiveness</p>
                  <p className="text-xs text-muted-foreground">
                    Tested on iPad, Surface, various orientations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Desktop Responsiveness</p>
                  <p className="text-xs text-muted-foreground">
                    Tested on various browsers and resolutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Accessibility Testing</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">WCAG Compliance</p>
                  <p className="text-xs text-muted-foreground">
                    Screen reader friendly, keyboard navigable
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Color Contrast</p>
                  <p className="text-xs text-muted-foreground">
                    AA compliant color ratios throughout
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold mb-2">Cross-browser Testing</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Browser Compatibility</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome, Firefox, Safari, Edge tested
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Mobile Browser Testing</p>
                  <p className="text-xs text-muted-foreground">
                    Safari iOS, Chrome Android tested
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Actions */}
      <div className="flex justify-end pt-6">
        <button
          className="px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-muted/100 mr-2"
        >
          Export Test Report
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Run Full Test Suite
        </button>
      </div>
    </div>
  );
}