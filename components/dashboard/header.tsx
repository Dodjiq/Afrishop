"use client"

import { useRouter } from "next/navigation"
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
import { BellIcon, UserIcon, GearIcon, SignOutIcon } from "@phosphor-icons/react"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // TODO: Implement Supabase auth logout
      // await supabase.auth.signOut()

      // Clear any local storage or session data
      localStorage.clear()
      sessionStorage.clear()

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Left side - could add breadcrumbs here */}
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Plan Starter
        </Badge>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserIcon size={20} weight="fill" />
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
            <DropdownMenuItem>
              <UserIcon />
              Mon profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GearIcon />
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <SignOutIcon />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
