"use client"

import * as React from "react"
import type { ToastProps } from "@radix-ui/react-toast"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toaster"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "success group border-green-500 bg-green-500 text-white",
        info: "info group border-blue-500 bg-blue-500 text-white",
        warning: "warning group border-orange-500 bg-orange-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface CustomToastProps extends ToastProps, VariantProps<typeof toastVariants> {
  icon?: React.ReactNode
}

const CustomToast = React.forwardRef<React.ElementRef<typeof Toast>, CustomToastProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    const getIcon = () => {
      if (icon) return icon
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5" />
        case "destructive":
          return <XCircle className="h-5 w-5" />
        case "info":
          return <Info className="h-5 w-5" />
        case "warning":
          return <AlertTriangle className="h-5 w-5" />
        default:
          return null
      }
    }

    return (
      <Toast ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        {getIcon() && <div className="mr-3">{getIcon()}</div>}
        <div className="grid gap-1">{children}</div>
      </Toast>
    )
  },
)
CustomToast.displayName = "CustomToast"

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  CustomToast as ToastComponent, // Renamed to avoid conflict with shadcn's Toast
  toastVariants,
}
