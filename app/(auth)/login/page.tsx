import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { StorefrontIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Connexion | AfriShop",
  description: "Connectez-vous à votre compte AfriShop",
}

export default function LoginPage() {
  return (
    <div className="relative container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      {/* Backgrounds combinés */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Gradient radial orange */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100px,rgba(255,140,0,0.06),transparent)]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <Link
          href="/"
          className="mx-auto mb-8 flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <StorefrontIcon size={28} weight="duotone" className="text-primary" />
          <span className="text-foreground">AfriShop</span>
        </Link>

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Bon retour !</h1>
          <p className="text-sm text-foreground/90 font-medium py-2.5">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Créer un compte
          </Link>
        </p>

        <div className="flex flex-col items-center justify-center space-y-1 text-center">
          <p className="text-xs text-muted-foreground">
            En vous connectant, vous acceptez nos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 text-xs text-muted-foreground">
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Conditions d'utilisation
            </Link>
            <span>et notre</span>
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
