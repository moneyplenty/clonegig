"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash, Package, DollarSign } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
  category: string
  isActive: boolean
}

export function AdminStoreManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Kelvin Creekman T-Shirt",
      price: 25.0,
      description: "Show your support with this official Kelvin Creekman t-shirt.",
      image: "/merch/kelvin-tshirt.webp",
      stock: 50,
      category: "Apparel",
      isActive: true
    },
    {
      id: "2",
      name: "Electric Dreams Beanie",
      price: 20.0,
      description: "Stay warm with the 'Electric Dreams' album beanie.",
      image: "/merch/beanie.jpg",
      stock: 30,
      category: "Apparel",
      isActive: true
    },
    {
      id: "3",
      name: "Kelvin Creekman Mug (Black)",
      price: 15.0,
      description: "Enjoy your coffee in this sleek black Kelvin Creekman mug.",
      image: "/merch/mug-black.webp",
      stock: 75,
      category: "Accessories",
      isActive: true
    }
  ])
  
  const [form, setForm] = useState<Omit<Product, "id"> & { id?: string }>({
    name: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
    category: "",
    isActive: true
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const { checked } = e.target as HTMLInputElement
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : 
               type === "number" ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && form.id) {
      setProducts(prev => prev.map(product => 
        product.id === form.id ? { ...form, id: product.id } as Product : product
      ))
      toast({ title: "Product Updated", description: `${form.name} has been updated.` })
    } else {
      const newProduct: Product = { ...form, id: String(Date.now()) } as Product
      setProducts(prev => [...prev, newProduct])
      toast({ title: "Product Added", description: `${form.name} has been added.` })
    }
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setForm(product)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id))
    toast({ title: "Product Deleted", description: "Product has been removed." })
  }

  const resetForm = () => {
    setForm({
      name: "",
      price: 0,
      description: "",
      image: "",
      stock: 0,
      category: "",
      isActive: true
    })
    setIsEditing(false)
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0)

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock < 20).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  step="0.01"
                  value={form.price} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={form.stock} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={form.category} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={form.image} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={form.isActive}
                  onCheckedChange={(checked) => 
                    setForm(prev => ({ ...prev, isActive: checked as boolean }))
                  }
                />
                <Label htmlFor="isActive">Active Product</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {isEditing ? "Update Product" : "Add Product"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.stock < 20 ? "text-red-600 font-bold" : ""}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
