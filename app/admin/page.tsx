import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { SidebarComponentFunction } from "@/components/ui/sidebar" // Renamed to avoid conflict

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Content",
    href: "/admin/content",
  },
  {
    title: "Events",
    href: "/admin/events",
  },
  {
    title: "Store",
    href: "/admin/store",
  },
]

export default function AdminPage() {
  return (
    <AdminProtection>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Overview of your platform's key metrics.</p>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarComponentFunction items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </AdminProtection>
  )
}
