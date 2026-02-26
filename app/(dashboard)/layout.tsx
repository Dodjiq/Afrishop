import { LayoutDashboardModerne } from "@/components/layout/LayoutDashboardModerne"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutDashboardModerne>{children}</LayoutDashboardModerne>
}
