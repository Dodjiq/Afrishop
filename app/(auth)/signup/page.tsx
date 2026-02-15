"use client"

import { SignupWizard } from "@/components/onboarding/signup-wizard"
import Link from "next/link"
import { StorefrontIcon } from "@phosphor-icons/react"

export default function SignupPage() {
  return (
    <div className="relative container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      {/* Backgrounds combinés */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Gradient radial orange */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100px,rgba(255,140,0,0.06),transparent)]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-3xl px-4">
        <Link
          href="/"
          className="mx-auto mb-8 flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <StorefrontIcon size={28} weight="duotone" className="text-primary" />
          <span className="text-foreground">AfriShop</span>
        </Link>

        <SignupWizard />

        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
