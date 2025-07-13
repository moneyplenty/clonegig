"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalPrice: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage on mount
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
          toast({
            title: "Out of Stock",
            description: `Cannot add more ${product.name}. Maximum stock reached.`,
            variant: "destructive",
          })
          return prevItems
        }
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === productId) {
            if (quantity > item.stock) {
              toast({
                title: "Quantity Limit",
                description: `Cannot add more than ${item.stock} of ${item.name}.`,
                variant: "destructive",
              })
              return { ...item, quantity: item.stock }
            }
            return { ...item, quantity: quantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
      return updatedItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    toast({
      title: "Cart Cleared",
      description: "Your shopping cart is now empty.",
    })
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
