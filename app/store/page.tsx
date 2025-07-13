import { StoreHeader } from "@/components/store/store-header"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreBanner } from "@/components/store/store-banner"

export default function StorePage() {
  const mockProducts = [
    {
      id: "1",
      name: "Kelvin Creekman T-Shirt",
      price: 25.0,
      image: "/merch/kelvin-tshirt.webp",
      description: "Show your support with this official Kelvin Creekman t-shirt.",
    },
    {
      id: "2",
      name: "Electric Dreams Beanie",
      price: 20.0,
      image: "/merch/beanie.jpg",
      description: "Stay warm with the 'Electric Dreams' album beanie.",
    },
    {
      id: "3",
      name: "Kelvin Creekman Mug (Black)",
      price: 15.0,
      image: "/merch/mug-black.webp",
      description: "Enjoy your coffee in this sleek black Kelvin Creekman mug.",
    },
    {
      id: "4",
      name: "Kelvin Creekman Mug (White)",
      price: 15.0,
      image: "/merch/mug-white.webp",
      description: "A classic white mug featuring the Kelvin Creekman logo.",
    },
    {
      id: "5",
      name: "Signature Guitar Pick Set",
      price: 10.0,
      image: "/placeholder.svg?height=200&width=200",
      description: "A set of guitar picks with Kelvin's signature.",
    },
    {
      id: "6",
      name: "Limited Edition Vinyl",
      price: 50.0,
      image: "/placeholder.svg?height=200&width=200",
      description: "Collector's edition vinyl of 'Electric Dreams'.",
    },
    {
      id: "7",
      name: "Autographed Poster",
      price: 30.0,
      image: "/placeholder.svg?height=200&width=200",
      description: "A signed poster from Kelvin Creekman himself.",
    },
    {
      id: "8",
      name: "Notepad",
      price: 12.0,
      image: "/merch/notepad.webp",
      description: "Take notes or write lyrics with this Kelvin Creekman branded notepad.",
    },
    {
      id: "9",
      name: "Pin Set",
      price: 18.0,
      image: "/merch/pin.webp",
      description: "Collect all the Kelvin Creekman enamel pins.",
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <StoreBanner />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <StoreHeader />
        <ProductGrid products={mockProducts} />
      </main>
    </div>
  )
}
