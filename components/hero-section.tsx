import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <Image
        src="/placeholder.svg"
        alt="Kelvin Creekman performing live"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-white px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
          Experience the Electrifying World of Kelvin Creekman
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Join the official fan club for exclusive content, merchandise, events, and direct access to Kelvin.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Join the Fan Club
            </Button>
          </Link>
          <Link href="/events">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              Upcoming Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
