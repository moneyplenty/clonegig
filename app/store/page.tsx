import type { Metadata } from "next"
import { StoreHeader } from "@/components/store/store-header"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreBanner } from "@/components/store/store-banner"

export const metadata: Metadata = {
  title: "Merchandise Store | Kelvin Creekman Fan Club",
  description: "Official Kelvin Creekman merchandise and exclusive fan club items",
}

// Mock products using the uploaded images
const products = [
  {
    id: "1",
    name: "Kelvin Creekman Beanie",
    description: "Premium knit beanie with embroidered Kelvin Creekman logo",
    price: 24.99,
    image: "/merch/beanie.jpg",
    category: "apparel",
    inStock: true,
    isExclusive: false,
    sizes: ["One Size"],
    colors: ["Black"],
  },
  {
    id: "2",
    name: "Sacred Geometry Mug - Black",
    description: "15oz ceramic mug featuring the iconic sacred geometry design",
    price: 18.99,
    image: "/merch/mug-black.webp",
    category: "accessories",
    inStock: true,
    isExclusive: false,
    sizes: ["15oz"],
    colors: ["Black"],
  },
  {
    id: "3",
    name: "Sacred Geometry Pin",
    description: "High-quality enamel pin with sacred geometry design",
    price: 12.99,
    image: "/merch/pin.webp",
    category: "accessories",
    inStock: true,
    isExclusive: true,
    sizes: ["2 inch"],
    colors: ["Black/White"],
  },
  {
    id: "4",
    name: "Kelvin Creekman Notepad",
    description: "Premium notepad for jotting down your thoughts and lyrics",
    price: 8.99,
    image: "/merch/notepad.webp",
    category: "accessories",
    inStock: true,
    isExclusive: false,
    sizes: ["A5"],
    colors: ["White"],
  },
  {
    id: "5",
    name: "Sacred Geometry Mug - White",
    description: "15oz ceramic mug with sacred geometry design on white background",
    price: 18.99,
    image: "/merch/mug-white.webp",
    category: "accessories",
    inStock: true,
    isExclusive: false,
    sizes: ["15oz"],
    colors: ["White"],
  },
  {
    id: "6",
    name: "Kelvin Portrait T-Shirt",
    description: "Exclusive t-shirt featuring Kelvin Creekman portrait design",
    price: 29.99,
    image: "/merch/kelvin-tshirt.webp",
    category: "apparel",
    inStock: true,
    isExclusive: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
  },
]

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 space-y-8">
        <StoreHeader />
        <StoreBanner />
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
