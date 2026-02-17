"use client"

import Link from "next/link"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
      {/* Grid Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05), transparent 70%)",
        }}
      />

      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="flex items-center gap-2 transition-transform group-hover:scale-105">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold">AfriShop</span>
          </div>
        </Link>

        {/* Form Card */}
        <div className="bg-card border rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Nouveau mot de passe</h1>
            <p className="text-foreground/90 font-medium py-2.5">
              Choisissez un nouveau mot de passe sécurisé pour votre compte.
            </p>
          </div>

          <ResetPasswordForm />
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Vous vous souvenez de votre mot de passe ?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
