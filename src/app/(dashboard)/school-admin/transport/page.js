import { Card, CardContent, CardHeader, Title } from "@/components/ui/card";

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <Title variant="h2">Transport Management</Title>
          <p className="text-sm text-muted-foreground">
            Manage school transportation including bus routes, vehicles, and student assignments
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Bus Routes</h3>
              <p className="text-sm">12 active routes</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Vehicles</h3>
              <p className="text-sm">15 buses in fleet</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Students Transported</h3>
              <p className="text-sm">450 students</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bus className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">New route added: Route 13 - North Campus</p>
                  <p className="text-xs text-muted-foreground">Today • 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bus className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Vehicle maintenance scheduled</p>
                  <p className="text-xs text-muted-foreground">Yesterday • 4:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}