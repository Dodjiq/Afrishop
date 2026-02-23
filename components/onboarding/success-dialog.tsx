"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircleIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react"

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
}

export function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <div className="relative flex h-20 w-20 items-center justify-center">
              {/* Animated background circle */}
              <div className="absolute inset-0 animate-[scale-in_0.5s_ease-out] rounded-full bg-primary/10" />

              {/* Pulsing ring */}
              <div className="absolute inset-0 animate-[scale-in_0.8s_ease-out] rounded-full bg-primary/20" />

              {/* Icon */}
              <CheckCircleIcon
                size={48}
                weight="fill"
                className="relative z-10 animate-[scale-in_0.6s_ease-out] text-primary"
              />
            </div>
          </AlertDialogMedia>

          <AlertDialogTitle className="text-center text-2xl font-bold">
            Compte créé avec succès !
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center space-y-4 pt-2">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3 w-full">
                <EnvelopeSimpleIcon
                  size={20}
                  weight="duotone"
                  className="text-primary flex-shrink-0"
                />
                <p className="text-sm text-foreground font-medium">
                  Veuillez vérifier votre email pour confirmer votre inscription.
                </p>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  Un email de confirmation a été envoyé à votre adresse.
                </p>
                <p className="font-medium">
                  Pensez à vérifier vos spams si vous ne le recevez pas dans quelques minutes.
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Compris, j'ai hâte de commencer !
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
