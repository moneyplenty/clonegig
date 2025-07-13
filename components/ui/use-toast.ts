"use client"

import * as React from "react"

import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastsMap = Map<
  string,
  {
    toast: ToastProps
    timeout: ReturnType<typeof setTimeout> | null
  }
>

type State = {
  toasts: ToastProps[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToastsMap = (toastsMap: ToastsMap, toast: ToastProps, timeout: ReturnType<typeof setTimeout> | null) => {
  toastsMap.set(toast.id, { toast, timeout })
  return toastsMap
}

const removeToastFromMap = (toastsMap: ToastsMap, id: string) => {
  const entry = toastsMap.get(id)
  if (entry?.timeout) {
    clearTimeout(entry.timeout)
  }
  toastsMap.delete(id)
  return toastsMap
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST":
      const { toastId } = action
      // ! Side effect ! - This will be executed in a separate render cycle.
      toastTimeouts.forEach((timeout) => clearTimeout(timeout))
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      }
  }
}

type Action =
  | {
      type: "ADD_TOAST"
      toast: ToastProps
    }
  | {
      type: "UPDATE_TOAST"
      toast: ToastProps
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: string
    }
  | {
      type: "REMOVE_TOAST"
      toastId?: string
    }

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

type Toast = Omit<ToastProps, "id"> & {
  id?: string
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const addToast = React.useCallback((toast: Toast) => {
    const id = toast.id || Math.random().toString(36).substring(2, 9)

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...toast,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dispatch({ type: "DISMISS_TOAST", toastId: id })
          }
        },
      },
    })
  }, [])

  const removeToast = React.useCallback((id?: string) => {
    dispatch({ type: "REMOVE_TOAST", toastId: id })
  }, [])

  return {
    ...state,
    toast: addToast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

const toast = (props: Toast) => {
  const id = props.id || Math.random().toString(36).substring(2, 9)
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dispatch({ type: "DISMISS_TOAST", toastId: id })
        }
      },
    },
  })
}

export { useToast, toast }
