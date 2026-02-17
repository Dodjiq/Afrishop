"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircleIcon } from "@phosphor-icons/react"

export function SuccessMessage() {
  const searchParams = useSearchParams()
  const reset = searchParams.get("reset")

  if (reset !== "success") return null

  return (
    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
      <CheckCircleIcon size={20} weight="fill" className="text-green-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-green-600">
          Mot de passe réinitialisé avec succès !
        </p>
        <p className="text-xs text-green-600/80 mt-1">
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
      </div>
    </div>
  )
}
