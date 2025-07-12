"use client"

import * as React from "react"
import type { ToastProps, ToastActionElement } from "@radix-ui/react-toast"
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Toast } from "@radix-ui/react-toast"

const ToastProvider = Toast.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Toast.Viewport>,
  React.ComponentPropsWithoutRef<typeof Toast.Viewport>
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = Toast.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-500 text-white",
        info: "border-blue-500 bg-blue-500 text-white",
        warning: "border-yellow-500 bg-yellow-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface ToastPropsWithVariant extends ToastProps, VariantProps<typeof toastVariants> {}

const ToastComponent = React.forwardRef<React.ElementRef<typeof Toast.Root>, ToastPropsWithVariant>(
  ({ className, variant, ...props }, ref) => {
    const Icon = React.useMemo(() => {
      switch (variant) {
        case "success":
          return CheckCircle
        case "destructive":
          return XCircle
        case "info":
          return Info
        case "warning":
          return AlertTriangle
        default:
          return null
      }
    }, [variant])

    return (
      <Toast.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        {Icon && <Icon className="h-5 w-5 mr-2" />}
        {props.children}
      </Toast.Root>
    )
  },
)
ToastComponent.displayName = Toast.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof Toast.Action>,
  React.ComponentPropsWithoutRef<typeof Toast.Action>
>(({ className, ...props }, ref) => (
  <Toast.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:border-white/20 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = Toast.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof Toast.Close>,
  React.ComponentPropsWithoutRef<typeof Toast.Close>
>(({ className, ...props }, ref) => (
  <Toast.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </Toast.Close>
))
ToastClose.displayName = Toast.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof Toast.Title>,
  React.ComponentPropsWithoutRef<typeof Toast.Title>
>(({ className, ...props }, ref) => (
  <Toast.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = Toast.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof Toast.Description>,
  React.ComponentPropsWithoutRef<typeof Toast.Description>
>(({ className, ...props }, ref) => (
  <Toast.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = Toast.Description.displayName

type ToasterProps = React.ComponentPropsWithoutRef<typeof ToastViewport>

export {
  ToastComponent as Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  type ToastProps,
  type ToastActionElement,
}
