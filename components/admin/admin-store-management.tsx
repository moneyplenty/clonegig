"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  stock: number
  created_at: string
  updated_at: string
}

interface AdminStoreManagementProps {
  initialProducts: Product[]
}

export function AdminStoreManagement({ initialProducts }: AdminStoreManagementProps) {
  const supabase = createClient()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    image_url: "",
    stock: 0,
  })

  useEffect(() => {
    // If initialProducts are provided, use them. Otherwise, fetch.
    if (initialProducts.length === 0) {
      fetchProducts()
    }
  }, [initialProducts])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive",
      })
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number.parseFloat(value) : value }))
  }

  const handleAddEditProduct = async () => {
    if (!form.name || !form.price || !form.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Price, Stock).",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    let error = null
    const productData = {
      name: form.name,
      description: form.description,
      price: form.price,
      image_url: form.image_url,
      stock: form.stock,
      updated_at: new Date().toISOString(),
    }

    if (currentProduct) {
      // Update existing product
      const { error: updateError } = await supabase.from("products").update(productData).eq("id", currentProduct.id)
      error = updateError
    } else {
      // Add new product
      const { error: insertError } = await supabase.from("products").insert(productData)
      error = insertError
    }

    if (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: `Failed to save product: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Product ${currentProduct ? "updated" : "added"} successfully.`,
      })
      setIsDialogOpen(false)
      fetchProducts()
    }
    setLoading(false)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setLoading(true)
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      })
      fetchProducts()
    }
    setLoading(false)
  }

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      image_url: product.image_url || "",
      stock: product.stock,
    })
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setCurrentProduct(null)
    setForm({
      name: "",
      description: "",
      price: 0,
      image_url: "",
      stock: 0,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Store Management</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                step="1"
                value={form.stock}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image_url"
                name="image_url"
                value={form.image_url}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddEditProduct} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found. Add some above!</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{product.image_url || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
