"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { EnvelopeIcon, CheckCircleIcon } from "@phosphor-icons/react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validation basique
      if (!email) {
        setError("Veuillez entrer votre adresse email")
        setIsLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Veuillez entrer une adresse email valide")
        setIsLoading(false)
        return
      }

      // Simuler l'envoi d'email (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // TODO: Implémenter l'envoi d'email de réinitialisation
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // })

      setIsSuccess(true)
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircleIcon size={32} weight="fill" className="text-green-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Email envoyé !</h3>
        <p className="text-muted-foreground mb-6">
          Nous avons envoyé un lien de réinitialisation à{" "}
          <span className="font-semibold text-foreground">{email}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Vous n'avez pas reçu l'email ?{" "}
          <button
            onClick={() => {
              setIsSuccess(false)
              setEmail("")
            }}
            className="text-primary hover:underline font-medium"
          >
            Renvoyer
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <Label htmlFor="email">Adresse email</Label>
        <div className="relative">
          <EnvelopeIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
            required
          />
        </div>
      </Field>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer le lien de réinitialisation"
        )}
      </Button>
    </form>
  )
}
