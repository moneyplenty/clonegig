import { Card, CardContent } from "@/components/ui/card"

export function StoreBanner() {
  return (
    <Card className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
      <CardContent className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Official Merchandise</h2>
        <p className="text-lg">Support your favorite artist by grabbing some exclusive gear!</p>
      </CardContent>
    </Card>
  )
}
