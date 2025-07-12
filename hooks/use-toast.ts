"use client"

import * as React from "react"

import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type State = {
  toasts: ToasterToast[]
}

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // ! Side effects !
      if (toastId) {
        // Assuming addTo is a function that needs to be defined
        const addTo = () => {
          // Implementation of addTo function
        }
        addTo()
      }
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toastId ? { ...t, open: false } : t)),
      }
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.toastId),
        }
      }
      return state

    default:
      return state
  }
}

const useToast = () => {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] })

  const toast = React.useCallback(
    (props: ToasterToast) =>
      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: { ...props, id: genId() },
      }),
    [dispatch],
  )

  const dismiss = React.useCallback(
    (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    [dispatch],
  )

  const remove = React.useCallback(
    (toastId?: string) => dispatch({ type: actionTypes.REMOVE_TOAST, toastId }),
    [dispatch],
  )

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      const timeoutId = setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_TOAST, toastId: toast.id })
      }, TOAST_REMOVE_DELAY)

      return () => clearTimeout(timeoutId)
    })
  }, [state.toasts, dispatch])

  return {
    toast,
    dismiss,
    remove,
    toasts: state.toasts,
  }
}

export { useToast }
