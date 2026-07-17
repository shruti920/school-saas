import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Library Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage library inventory, book issues, returns, and library settings
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Total Books</h3>
              <p className="text-sm">8,450 volumes</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Available Books</h3>
              <p className="text-sm">6,230 books</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Currently Issued</h3>
              <p className="text-sm">2,220 books</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Recent Transactions</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Book Issued: "Mathematics for Grade 5"</p>
                  <p className="text-xs text-muted-foreground">Today • 10:15 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Book Returned: "Science Experiments"</p>
                  <p className="text-xs text-muted-foreground">Today • 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">New Books Added: 15 titles</p>
                  <p className="text-xs text-muted-foreground">Yesterday • 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}