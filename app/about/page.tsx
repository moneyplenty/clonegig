import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <main className="container py-12 md:py-24">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About Creekman</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Discover the journey, vision, and passion behind Creekman.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
          <Image src="/placeholder.svg?height=400&width=600" alt="Creekman performing" fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
          <p className="text-muted-foreground">
            Creekman began as a solo project by [Artist's Name] in [Year], driven by a desire to create music that
            resonates deeply with listeners. Starting from humble beginnings, recording in a home studio, the sound
            evolved, blending [Genre 1], [Genre 2], and [Genre 3] influences into a unique and captivating style.
          </p>
          <p className="text-muted-foreground">
            Over the years, Creekman has grown into a beloved independent artist, known for heartfelt lyrics, intricate
            melodies, and a strong connection with fans. Every song tells a story, reflecting personal experiences,
            observations of the world, and a commitment to authenticity.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission & Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Authenticity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in creating music and content that is true to ourselves and our experiences, fostering a
                genuine connection with our audience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Building a strong, supportive community around our music is paramount. We value every fan and strive to
                create inclusive spaces.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Creativity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Innovation and artistic exploration are at the heart of what we do. We constantly push boundaries to
                deliver fresh and inspiring work.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Image
                src="/placeholder-user.jpg"
                alt="Artist Name"
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full object-cover"
              />
              <CardTitle>Creekman (Artist)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The visionary behind the music, responsible for songwriting, vocals, and primary instrumentation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Image
                src="/placeholder-user.jpg"
                alt="Manager Name"
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full object-cover"
              />
              <CardTitle>Jane Doe (Manager)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manages all operations, from tour planning to merchandise, ensuring everything runs smoothly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Image
                src="/placeholder-user.jpg"
                alt="Producer Name"
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full object-cover"
              />
              <CardTitle>John Smith (Producer)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Collaborates on sound design, mixing, and mastering, bringing the musical vision to life.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
