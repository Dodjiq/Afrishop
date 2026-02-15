"use client"

import Link from "next/link"
import { StorefrontIcon } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-[50px]">
      <div className="container max-w-7xl mx-auto px-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <StorefrontIcon size={24} weight="duotone" className="text-primary" />
              <span>AfriShop</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Plateforme de dropshipping pour entrepreneurs africains.
            </p>

            {/* Avatars Stack */}
            <div className="mt-2 flex flex-col gap-3">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground">
                  AM
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-orange-400 text-xs font-semibold text-white">
                  KT
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-orange-500 text-xs font-semibold text-white">
                  SD
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-orange-600 text-xs font-semibold text-white">
                  LB
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-orange-700 text-xs font-semibold text-white">
                  +122
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">127 utilisateurs</span> satisfaits
              </p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold">Produit</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground hover:text-foreground">
                  Démo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Entreprise</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AfriShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
