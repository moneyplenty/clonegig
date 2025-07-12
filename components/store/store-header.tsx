"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/store/cart-context"

export function StoreHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useCart()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent">
          Official Merchandise Store
        </h1>
        <p className="text-muted-foreground text-lg">Exclusive Kelvin Creekman merchandise and fan club items</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-fire-500/20 dark:border-ice-500/20 focus:border-fire-500 dark:focus:border-ice-500"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-fire-500/20 dark:border-ice-500/20 bg-transparent"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Products</DropdownMenuItem>
              <DropdownMenuItem>Apparel</DropdownMenuItem>
              <DropdownMenuItem>Accessories</DropdownMenuItem>
              <DropdownMenuItem>Exclusive Items</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Newest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="outline"
          className="relative border-fire-500/20 dark:border-ice-500/20 hover:bg-fire-50 dark:hover:bg-ice-950/20 bg-transparent"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-fire-500 dark:bg-ice-500 text-white text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}
