import { StoreHeader } from "@/components/store/store-header"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreBanner } from "@/components/store/store-banner"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Electric Storm T-Shirt",
    description: "Unleash the storm with this exclusive band tee.",
    price: 25.0,
    imageUrl: "/merch/kelvin-tshirt.webp",
  },
  {
    id: "2",
    name: "Frozen Fire Beanie",
    description: "Stay warm and stylish with the official band beanie.",
    price: 20.0,
    imageUrl: "/merch/beanie.jpg",
  },
  {
    id: "3",
    name: "Ice Legion Mug (Black)",
    description: "Start your day with a jolt of metal.",
    price: 15.0,
    imageUrl: "/merch/mug-black.webp",
  },
  {
    id: "4",
    name: "Ice Legion Mug (White)",
    description: "The classic mug, now in white.",
    price: 15.0,
    imageUrl: "/merch/mug-white.webp",
  },
  {
    id: "5",
    name: "Kelvin Creekman Pin Set",
    description: "Collect all 3 exclusive pins.",
    price: 12.0,
    imageUrl: "/merch/pin.webp",
  },
  {
    id: "6",
    name: "Signed Notepad",
    description: "Limited edition notepad, signed by Kelvin himself.",
    price: 30.0,
    imageUrl: "/merch/notepad.webp",
  },
]

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <StoreBanner />
      <StoreHeader />
      <ProductGrid products={mockProducts} />
    </div>
  )
}
