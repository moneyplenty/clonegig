import { StoreHeader } from "@/components/store/store-header"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreBanner } from "@/components/store/store-banner"

export default function StorePage() {
  const products = [
    {
      id: 1,
      name: "Kelvin Creekman T-Shirt",
      price: 25.0,
      image: "/merch/kelvin-tshirt.webp",
      description: "Official band t-shirt, 100% cotton.",
    },
    {
      id: 2,
      name: "Icy Electrifying Beanie",
      price: 18.0,
      image: "/merch/beanie.jpg",
      description: "Stay warm with this electrifying beanie.",
    },
    {
      id: 3,
      name: "Kelvin Creekman Mug (Black)",
      price: 12.0,
      image: "/merch/mug-black.webp",
      description: "Start your day with Kelvin's energy.",
    },
    {
      id: 4,
      name: "Kelvin Creekman Mug (White)",
      price: 12.0,
      image: "/merch/mug-white.webp",
      description: "Classic mug for your favorite beverage.",
    },
    {
      id: 5,
      name: "Electrifying Pin Set",
      price: 10.0,
      image: "/merch/pin.webp",
      description: "Collect all electrifying pins.",
    },
    {
      id: 6,
      name: "Kelvin Creekman Notepad",
      price: 8.0,
      image: "/merch/notepad.webp",
      description: "Jot down your electrifying ideas.",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <StoreBanner />
      <StoreHeader />
      <ProductGrid products={products} />
    </div>
  )
}
