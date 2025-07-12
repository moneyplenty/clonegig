"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem("kelvin_creekman_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kelvin_creekman_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product: Product, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item,
        )
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    toast({
      title: "Item Removed",
      description: "Product removed from cart.",
      variant: "info",
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId)
      }
      return prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
