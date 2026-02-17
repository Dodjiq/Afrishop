"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { LockIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++

    if (strength <= 2) return { strength, label: "Faible", color: "bg-red-500" }
    if (strength <= 3) return { strength, label: "Moyen", color: "bg-orange-500" }
    if (strength <= 4) return { strength, label: "Bon", color: "bg-yellow-500" }
    return { strength, label: "Excellent", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validation
      if (password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères")
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas")
        setIsLoading(false)
        return
      }

      if (passwordStrength.strength < 3) {
        setError("Veuillez choisir un mot de passe plus sécurisé")
        setIsLoading(false)
        return
      }

      // Simuler la réinitialisation (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // TODO: Implémenter la réinitialisation du mot de passe
      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token: searchParams.get("token"), password }),
      // })

      // Rediriger vers la page de connexion
      router.push("/login?reset=success")
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <Label htmlFor="password">Nouveau mot de passe</Label>
        <div className="relative">
          <LockIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            disabled={isLoading}
            required
          />
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full bg-muted transition-colors",
                    i < passwordStrength.strength && passwordStrength.color
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Force du mot de passe :{" "}
              <span
                className={cn(
                  "font-semibold",
                  passwordStrength.strength <= 2 && "text-red-500",
                  passwordStrength.strength === 3 && "text-orange-500",
                  passwordStrength.strength === 4 && "text-yellow-500",
                  passwordStrength.strength === 5 && "text-green-500"
                )}
              >
                {passwordStrength.label}
              </span>
            </p>
          </div>
        )}

        {/* Password Requirements */}
        <div className="mt-3 space-y-1">
          <PasswordRequirement
            met={password.length >= 8}
            text="Au moins 8 caractères"
          />
          <PasswordRequirement
            met={/[a-z]/.test(password) && /[A-Z]/.test(password)}
            text="Majuscules et minuscules"
          />
          <PasswordRequirement
            met={/[0-9]/.test(password)}
            text="Au moins un chiffre"
          />
          <PasswordRequirement
            met={/[^A-Za-z0-9]/.test(password)}
            text="Au moins un caractère spécial"
          />
        </div>
      </Field>

      <Field>
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <div className="relative">
          <LockIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10"
            disabled={isLoading}
            required
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <WarningCircleIcon size={14} weight="fill" />
            Les mots de passe ne correspondent pas
          </p>
        )}
      </Field>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || password !== confirmPassword || passwordStrength.strength < 3}
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Réinitialisation...
          </>
        ) : (
          "Réinitialiser le mot de passe"
        )}
      </Button>
    </form>
  )
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <CheckCircleIcon size={14} weight="fill" className="text-green-500" />
      ) : (
        <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30" />
      )}
      <span className={cn(met ? "text-green-600" : "text-muted-foreground")}>
        {text}
      </span>
    </div>
  )
}
