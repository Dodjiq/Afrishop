"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  StorefrontIcon,
  LayoutIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  GearIcon,
  CreditCardIcon,
  SignOutIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"

const mainNavItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutIcon,
  },
  {
    title: "Mes boutiques",
    href: "/shops",
    icon: StorefrontIcon,
  },
  {
    title: "Produits",
    href: "/products",
    icon: ShoppingBagIcon,
  },
  {
    title: "Statistiques",
    href: "/analytics",
    icon: ChartBarIcon,
  },
]

const bottomNavItems = [
  {
    title: "Abonnement",
    href: "/subscription",
    icon: CreditCardIcon,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: GearIcon,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      // Sign out from Supabase
      await supabase.auth.signOut()

      // Clear any local storage
      localStorage.removeItem("afrishop_shops")

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      alert("Erreur lors de la déconnexion")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/20 md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <StorefrontIcon size={24} weight="duotone" className="text-primary" />
          <span>AfriShop</span>
        </Link>
      </div>

      {/* Quick Create Button */}
      <div className="p-4">
        <Button asChild className="w-full gap-2" size="lg">
          <Link href="/create">
            <PlusCircleIcon size={20} weight="bold" />
            Nouvelle boutique
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon size={20} weight={isActive ? "fill" : "regular"} />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Bottom Navigation */}
      <nav className="space-y-1 p-4">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon size={20} weight={isActive ? "fill" : "regular"} />
              {item.title}
            </Link>
          )
        })}

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Déconnexion...
            </>
          ) : (
            <>
              <SignOutIcon size={20} />
              Déconnexion
            </>
          )}
        </button>
      </nav>
    </aside>
  )
}
