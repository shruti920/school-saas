import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed } from "lucide-react";

export default function HostelPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle variant="h2">Hostel Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage hostel facilities, room allotments, and student accommodations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Hostel Blocks</h3>
              <p className="text-sm">4 blocks (2 boys, 2 girls)</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Total Rooms</h3>
              <p className="text-sm">120 rooms</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Current Occupancy</h3>
              <p className="text-sm">85%</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Room Allotment Status</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bed className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Boys Hostel A - 3rd Floor</p>
                  <p className="text-xs text-muted-foreground">95% Occupied</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bed className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Girls Hostel B - 2nd Floor</p>
                  <p className="text-xs text-muted-foreground">78% Occupied</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bed className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Girls Hostel C - Ground Floor</p>
                  <p className="text-xs text-muted-foreground">92% Occupied</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}