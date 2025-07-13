import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import type { Event } from "@/types"

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-bold">{event.title}</CardTitle>
        <CardDescription className="text-kelvin-card-foreground/80">
          <div className="flex items-center gap-2 mt-2">
            <Icons.calendar className="w-5 h-5 text-electric-400" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Icons.clock className="w-5 h-5 text-frost-400" />
            <span>
              {new Date(event.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Icons.mapPin className="w-5 h-5 text-purple-400" />
            <span>{event.location}</span>
          </div>
          {event.price > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <Icons.dollarSign className="w-5 h-5 text-green-500" />
              <span>${event.price.toFixed(2)}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-kelvin-card-foreground/90 leading-relaxed">{event.description}</p>
        {event.isMeetGreet && (
          <div className="mt-4 flex items-center gap-2 text-electric-400 font-semibold">
            <Icons.video className="w-5 h-5" />
            This is a virtual Meet & Greet session!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
