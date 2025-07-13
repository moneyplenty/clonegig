// This file is a duplicate of hooks/use-toast.ts and will be removed.
// The content is provided here for completeness, but the primary use-toast.ts
// is in the hooks directory.
"use client"

import { useState, useEffect, useCallback } from "react"
import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastsMap = Map<
  string,
  {
    toast: ToastProps
    timeout: ReturnType<typeof setTimeout>
  }
>

type State = {
  toasts: ToastProps[]
}

const listeners: ((state: State) => void)[] = []

let memoryState: State = { toasts: [] }

function dispatch(payload: Partial<State>) {
  memoryState = { ...memoryState, ...payload }
  listeners.forEach((listener) => listener(memoryState))
}

function createToast(toast: ToastProps) {
  const { id, duration } = toast
  const timeout = setTimeout(() => {
    removeToast(id!)
  }, duration || TOAST_REMOVE_DELAY)

  return {
    toast,
    timeout,
  }
}

function addToast(toast: ToastProps) {
  dispatch({
    toasts: [...memoryState.toasts, createToast(toast)].slice(-TOAST_LIMIT),
  })
}

function removeToast(id: string) {
  dispatch({
    toasts: memoryState.toasts.filter((toast) => toast.id !== id),
  })
}

export function useToast() {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast: useCallback((toast: ToastProps) => {
      addToast(toast)
    }, []),
  }
}
