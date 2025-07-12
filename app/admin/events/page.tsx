import { Suspense } from "react"
import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminEventsPage() {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<AdminEventsSkeleton />}>
            <AdminEventManagement />
          </Suspense>
        </div>
      </div>
    </AdminProtection>
  )
}

function AdminEventsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
