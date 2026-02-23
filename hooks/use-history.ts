import { useState, useCallback, useRef } from "react"

interface HistoryState<T> {
  past: T[]
  present: T
  future: T[]
}

interface UseHistoryOptions {
  maxHistorySize?: number
}

export function useHistory<T>(
  initialState: T,
  options: UseHistoryOptions = {}
) {
  const { maxHistorySize = 50 } = options

  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  })

  // Ref pour éviter de sauvegarder l'état initial
  const isFirstRender = useRef(true)

  // Définir un nouveau state et l'ajouter à l'historique
  const setState = useCallback(
    (newState: T | ((prevState: T) => T)) => {
      setHistory((currentHistory) => {
        const resolvedState =
          typeof newState === "function"
            ? (newState as (prevState: T) => T)(currentHistory.present)
            : newState

        // Ne pas ajouter si l'état n'a pas changé
        if (JSON.stringify(resolvedState) === JSON.stringify(currentHistory.present)) {
          return currentHistory
        }

        const newPast = [...currentHistory.past, currentHistory.present]

        // Limiter la taille de l'historique
        if (newPast.length > maxHistorySize) {
          newPast.shift()
        }

        return {
          past: newPast,
          present: resolvedState,
          future: [], // Clear future when new state is set
        }
      })
    },
    [maxHistorySize]
  )

  // Annuler (Undo)
  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.past.length === 0) {
        return currentHistory
      }

      const newPast = [...currentHistory.past]
      const newPresent = newPast.pop()!
      const newFuture = [currentHistory.present, ...currentHistory.future]

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      }
    })
  }, [])

  // Refaire (Redo)
  const redo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.future.length === 0) {
        return currentHistory
      }

      const newFuture = [...currentHistory.future]
      const newPresent = newFuture.shift()!
      const newPast = [...currentHistory.past, currentHistory.present]

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      }
    })
  }, [])

  // Reset l'historique
  const reset = useCallback((newState?: T) => {
    setHistory({
      past: [],
      present: newState ?? history.present,
      future: [],
    })
  }, [history.present])

  // Aller à un index spécifique dans l'historique
  const goTo = useCallback((index: number) => {
    setHistory((currentHistory) => {
      const allStates = [
        ...currentHistory.past,
        currentHistory.present,
        ...currentHistory.future,
      ]

      if (index < 0 || index >= allStates.length) {
        return currentHistory
      }

      const newPresent = allStates[index]
      const newPast = allStates.slice(0, index)
      const newFuture = allStates.slice(index + 1)

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      }
    })
  }, [])

  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  return {
    state: history.present,
    setState,
    undo,
    redo,
    reset,
    goTo,
    canUndo,
    canRedo,
    historySize: history.past.length + 1 + history.future.length,
    currentIndex: history.past.length,
  }
}
