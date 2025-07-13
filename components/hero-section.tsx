import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white overflow-hidden">
      <Image
        src="/placeholder.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-30"
      />
      <div className="relative z-10 max-w-3xl px-4 space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight">
          Welcome to the Ultimate Fan Experience
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Connect with your favorite artist, access exclusive content, and be part of a vibrant community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join the Fan Club
            </Button>
          </Link>
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 bg-transparent"
            >
              Explore Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
