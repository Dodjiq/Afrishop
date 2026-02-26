import { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

export const metadata: Metadata = {
  title: "Tableau de bord | AfriShop",
  description: "Gérez vos boutiques Shopify",
}

export default function DashboardPage() {
  return <DashboardContent />
}
