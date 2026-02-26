import { useEffect, useRef, useState } from "react"

interface UseAutoSaveOptions<T> {
  data: T
  onSave: (data: T) => void | Promise<void>
  interval?: number // en millisecondes
  enabled?: boolean
  debounceDelay?: number // délai avant de sauvegarder après un changement
}

export function useAutoSave<T>({
  data,
  onSave,
  interval = 30000, // 30 secondes par défaut
  enabled = true,
  debounceDelay = 2000, // 2 secondes de délai
}: UseAutoSaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const dataRef = useRef(data)
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const intervalTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Mettre à jour la ref quand data change
  useEffect(() => {
    dataRef.current = data
  }, [data])

  // Fonction de sauvegarde
  const save = async () => {
    if (isSaving) return

    setIsSaving(true)
    setSaveError(null)

    try {
      await onSave(dataRef.current)
      setLastSaved(new Date())
    } catch (error: any) {
      setSaveError(error.message || "Erreur lors de la sauvegarde")
      console.error("Auto-save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Debounce: sauvegarder après un délai sans changement
  useEffect(() => {
    if (!enabled) return

    // Clear le timer précédent
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Définir un nouveau timer
    debounceTimerRef.current = setTimeout(() => {
      save()
    }, debounceDelay)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [data, enabled, debounceDelay])

  // Interval: sauvegarder régulièrement
  useEffect(() => {
    if (!enabled || interval <= 0) return

    intervalTimerRef.current = setInterval(() => {
      save()
    }, interval)

    return () => {
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current)
      }
    }
  }, [enabled, interval])

  // Sauvegarder avant de quitter la page
  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Tenter une sauvegarde synchrone (ne fonctionne pas toujours)
      save()

      // Afficher un message de confirmation si des changements non sauvegardés
      if (lastSaved && Date.now() - lastSaved.getTime() > debounceDelay) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [enabled, lastSaved, debounceDelay])

  // Sauvegarder manuellement
  const saveNow = () => {
    save()
  }

  return {
    isSaving,
    lastSaved,
    saveError,
    saveNow,
  }
}
