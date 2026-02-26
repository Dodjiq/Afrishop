"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  CaretDownIcon,
  CaretRightIcon,
  PaletteIcon,
  ListIcon,
  SparkleIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface ItemNavigation {
  titre: string
  icone: React.ComponentType<any>
  href?: string
  badge?: "nouveau" | "beta"
  sousItems?: ItemNavigation[]
}

const itemsNavigationPrincipaux: ItemNavigation[] = [
  {
    titre: "Tableau de bord",
    icone: LayoutIcon,
    href: "/dashboard",
  },
  {
    titre: "Boutiques",
    icone: StorefrontIcon,
    sousItems: [
      { titre: "Mes boutiques", icone: ListIcon, href: "/shops" },
      { titre: "Créer", icone: PlusCircleIcon, href: "/create" },
    ],
  },
  {
    titre: "Produits",
    icone: ShoppingBagIcon,
    href: "/products",
  },
  {
    titre: "Builder",
    icone: PaletteIcon,
    href: "/builder",
    badge: "nouveau",
  },
  {
    titre: "Statistiques",
    icone: ChartBarIcon,
    href: "/analytics",
  },
]

const itemsNavigationBas: ItemNavigation[] = [
  {
    titre: "Abonnement",
    icone: CreditCardIcon,
    href: "/subscription",
  },
  {
    titre: "Paramètres",
    icone: GearIcon,
    href: "/settings",
  },
]

interface ItemNavigationProps {
  item: ItemNavigation
  collapsed: boolean
  ouvert: boolean
  onBasculer: () => void
  niveau?: number
}

function ItemNavigationComponent({
  item,
  collapsed,
  ouvert,
  onBasculer,
  niveau = 0,
}: ItemNavigationProps) {
  const pathname = usePathname()
  const Icone = item.icone
  const aDesEnfants = item.sousItems && item.sousItems.length > 0
  const estActif = pathname === item.href ||
    (aDesEnfants && item.sousItems?.some(enfant => pathname === enfant.href))

  if (aDesEnfants) {
    return (
      <div>
        <button
          onClick={onBasculer}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            estActif
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icone size={20} weight={estActif ? "fill" : "regular"} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.titre}</span>
              {ouvert ? (
                <CaretDownIcon size={16} weight="bold" />
              ) : (
                <CaretRightIcon size={16} weight="bold" />
              )}
            </>
          )}
        </button>

        {/* Sous-menu */}
        {ouvert && !collapsed && item.sousItems && (
          <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-3">
            {item.sousItems.map((sousItem) => {
              const SousIcone = sousItem.icone
              const estActifEnfant = pathname === sousItem.href
              return (
                <Link
                  key={sousItem.href}
                  href={sousItem.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    estActifEnfant
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <SousIcone size={18} weight={estActifEnfant ? "fill" : "regular"} />
                  <span>{sousItem.titre}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative",
        estActif
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icone size={20} weight={estActif ? "fill" : "regular"} />
      {!collapsed && (
        <>
          <span className="flex-1">{item.titre}</span>
          {item.badge && (
            <Badge
              variant={item.badge === "nouveau" ? "default" : "secondary"}
              className="h-5 px-1.5 text-[10px] font-bold uppercase"
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  )
}

interface SidebarModerneProps {
  className?: string
}

export function SidebarModerne({ className }: SidebarModerneProps) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [itemsOuverts, setItemsOuverts] = useState<string[]>(["Boutiques"])
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClient()

  const basculerSousMenu = (titre: string) => {
    setItemsOuverts((prev) =>
      prev.includes(titre) ? prev.filter((t) => t !== titre) : [...prev, titre]
    )
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await supabase.auth.signOut()
      localStorage.removeItem("afrishop_shops")
      router.push("/login")
    } catch (error) {
      console.error("Erreur déconnexion:", error)
      alert("Erreur lors de la déconnexion")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <aside
      className={cn(
        "hidden flex-col border-r bg-card transition-all duration-300 md:flex",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-6 transition-all",
          collapsed && "justify-center px-3"
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 font-bold text-xl transition-all",
            collapsed && "gap-0"
          )}
        >
          <StorefrontIcon
            size={28}
            weight="duotone"
            className="text-primary shrink-0"
          />
          {!collapsed && (
            <span className="animate-fade-in">
              Afri<span className="text-primary">Shop</span>
            </span>
          )}
        </Link>
      </div>

      {/* Bouton Créer */}
      {!collapsed && (
        <div className="p-4 animate-fade-in">
          <Button asChild className="w-full gap-2 shadow-md" size="lg">
            <Link href="/create">
              <SparkleIcon size={20} weight="fill" />
              Nouvelle boutique
            </Link>
          </Button>
        </div>
      )}

      <Separator />

      {/* Navigation principale */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {itemsNavigationPrincipaux.map((item) => (
          <ItemNavigationComponent
            key={item.titre}
            item={item}
            collapsed={collapsed}
            ouvert={itemsOuverts.includes(item.titre)}
            onBasculer={() => basculerSousMenu(item.titre)}
          />
        ))}
      </nav>

      <Separator />

      {/* Navigation bas */}
      <nav className="space-y-1 p-4">
        {itemsNavigationBas.map((item) => (
          <ItemNavigationComponent
            key={item.titre}
            item={item}
            collapsed={collapsed}
            ouvert={itemsOuverts.includes(item.titre)}
            onBasculer={() => basculerSousMenu(item.titre)}
          />
        ))}

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoggingOut ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {!collapsed && <span>Déconnexion...</span>}
            </>
          ) : (
            <>
              <SignOutIcon size={20} />
              {!collapsed && <span>Déconnexion</span>}
            </>
          )}
        </button>
      </nav>

      {/* Bouton collapse toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          <CaretRightIcon
            size={16}
            weight="bold"
            className={cn(
              "transition-transform",
              !collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
    </aside>
  )
}
