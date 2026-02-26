"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BellIcon,
  UserIcon,
  GearIcon,
  SignOutIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface TopbarModerneProps {
  className?: string
}

export function TopbarModerne({ className }: TopbarModerneProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [openRecherche, setOpenRecherche] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const supabase = createClient()

  // Raccourci clavier Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpenRecherche((open) => !open)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Gestion du thème
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const basculerTheme = () => {
    const nouveauTheme = theme === "light" ? "dark" : "light"
    setTheme(nouveauTheme)
    if (nouveauTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
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

  const naviguerVers = (path: string) => {
    router.push(path)
    setOpenRecherche(false)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6",
          className
        )}
      >
        {/* Barre de recherche */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <button
            onClick={() => setOpenRecherche(true)}
            className="flex h-10 w-full items-center gap-3 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MagnifyingGlassIcon size={18} />
            <span>Rechercher...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-2">
          {/* Toggle dark/light mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={basculerTheme}
            className="relative"
          >
            {theme === "light" ? (
              <MoonIcon size={20} weight="regular" />
            ) : (
              <SunIcon size={20} weight="fill" />
            )}
          </Button>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserIcon size={18} weight="fill" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">Jean Dupont</span>
                  <span className="text-xs text-muted-foreground">
                    jean@example.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <UserIcon size={16} className="mr-2" />
                Mon profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <GearIcon size={16} className="mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Déconnexion...
                  </>
                ) : (
                  <>
                    <SignOutIcon size={16} className="mr-2" />
                    Déconnexion
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Dialog de recherche Cmd+K */}
      <CommandDialog open={openRecherche} onOpenChange={setOpenRecherche}>
        <CommandInput placeholder="Rechercher des pages, boutiques, produits..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => naviguerVers("/dashboard")}>
              <MagnifyingGlassIcon size={16} className="mr-2" />
              Tableau de bord
            </CommandItem>
            <CommandItem onSelect={() => naviguerVers("/shops")}>
              <MagnifyingGlassIcon size={16} className="mr-2" />
              Mes boutiques
            </CommandItem>
            <CommandItem onSelect={() => naviguerVers("/create")}>
              <MagnifyingGlassIcon size={16} className="mr-2" />
              Créer une boutique
            </CommandItem>
            <CommandItem onSelect={() => naviguerVers("/products")}>
              <MagnifyingGlassIcon size={16} className="mr-2" />
              Produits
            </CommandItem>
            <CommandItem onSelect={() => naviguerVers("/analytics")}>
              <MagnifyingGlassIcon size={16} className="mr-2" />
              Statistiques
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions rapides">
            <CommandItem onSelect={() => naviguerVers("/create")}>
              <CheckCircleIcon size={16} className="mr-2" />
              Nouvelle boutique
            </CommandItem>
            <CommandItem onSelect={() => naviguerVers("/products/import")}>
              <CheckCircleIcon size={16} className="mr-2" />
              Importer des produits
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
