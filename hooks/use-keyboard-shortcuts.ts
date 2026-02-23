import { useEffect } from "react"

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  action: () => void
  description?: string
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatch = shortcut.ctrlKey === undefined || event.ctrlKey === shortcut.ctrlKey
        const shiftMatch = shortcut.shiftKey === undefined || event.shiftKey === shortcut.shiftKey
        const altMatch = shortcut.altKey === undefined || event.altKey === shortcut.altKey
        const metaMatch = shortcut.metaKey === undefined || event.metaKey === shortcut.metaKey

        if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault()
          }
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [shortcuts, enabled])
}

// Raccourcis prédéfinis pour le builder
export const BUILDER_SHORTCUTS = {
  UNDO: { key: "z", ctrlKey: true, description: "Annuler" },
  REDO: { key: "y", ctrlKey: true, description: "Refaire" },
  REDO_ALT: { key: "z", ctrlKey: true, shiftKey: true, description: "Refaire (alt)" },
  SAVE: { key: "s", ctrlKey: true, description: "Sauvegarder" },
  DELETE: { key: "Delete", description: "Supprimer la sélection" },
  DUPLICATE: { key: "d", ctrlKey: true, description: "Dupliquer" },
  ESCAPE: { key: "Escape", description: "Désélectionner" },
  COPY: { key: "c", ctrlKey: true, description: "Copier" },
  PASTE: { key: "v", ctrlKey: true, description: "Coller" },
} as const
