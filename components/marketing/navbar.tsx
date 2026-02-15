"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StorefrontIcon } from "@phosphor-icons/react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <StorefrontIcon size={28} weight="duotone" className="text-primary" />
          <span className="text-foreground">
            AfriShop
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Tarifs
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Commencer gratuitement</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
