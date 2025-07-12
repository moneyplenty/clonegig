"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Video, Crown, Star, Zap } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { format } from "date-fns"

interface Session {
  id: string
  title?: string
  date: Date
  time: string
  duration?: number
  participants?: number
  maxParticipants?: number
  status?: "upcoming" | "live" | "completed"
  tierRequired?: "frost" | "blizzard" | "avalanche"
  hostName?: string
  hostAvatar?: string
  roomUrl?: string
  attendees?: number
  maxAttendees?: number
  isBooked?: boolean
}

interface UpcomingSessionsProps {
  onJoinSession?: (sessionId: string) => void
  sessions?: Session[]
  onBookSession?: (session: Session) => void
}

export function UpcomingSessions({ onJoinSession, sessions: externalSessions, onBookSession }: UpcomingSessionsProps) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Mock data - in production, fetch from your database
    const mockSessions: Session[] = [
      {
        id: "1",
        title: "Acoustic Session & Q&A",
        date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        time: "3:00 PM",
        duration: 45,
        participants: 8,
        maxParticipants: 15,
        status: "upcoming",
        tierRequired: "frost",
        hostName: "Kelvin Creekman",
        hostAvatar: "/kelvin-logo.png",
        roomUrl: "https://kelvin.daily.co/acoustic-session",
      },
      {
        id: "2",
        title: "Behind the Scenes Studio Tour",
        date: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        time: "2:30 PM",
        duration: 30,
        participants: 12,
        maxParticipants: 12,
        status: "live",
        tierRequired: "blizzard",
        hostName: "Kelvin Creekman",
        hostAvatar: "/kelvin-logo.png",
        roomUrl: "https://kelvin.daily.co/studio-tour",
      },
      {
        id: "3",
        title: "Exclusive Album Preview",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: "7:00 PM",
        duration: 60,
        participants: 3,
        maxParticipants: 8,
        status: "upcoming",
        tierRequired: "avalanche",
        hostName: "Kelvin Creekman",
        hostAvatar: "/kelvin-logo.png",
        roomUrl: "https://kelvin.daily.co/album-preview",
      },
    ]

    if (externalSessions) {
      setSessions(externalSessions)
      setLoading(false)
    } else {
      setTimeout(() => {
        setSessions(mockSessions)
        setLoading(false)
      }, 1000)
    }
  }, [externalSessions])

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "frost":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Star className="h-3 w-3 mr-1" />
            Frost Fan
          </Badge>
        )
      case "blizzard":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
            <Zap className="h-3 w-3 mr-1" />
            Blizzard VIP
          </Badge>
        )
      case "avalanche":
        return (
          <Badge className="bg-gold-500/20 text-gold-400 border-gold-500/50">
            <Crown className="h-3 w-3 mr-1" />
            Avalanche
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
            LIVE
          </Badge>
        )
      case "upcoming":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Completed</Badge>
      default:
        return null
    }
  }

  const canJoinSession = (session: Session) => {
    const userTier = user?.user_metadata?.tier || "guest"
    const tierHierarchy = { guest: 0, frost: 1, blizzard: 2, avalanche: 3 }
    return (
      tierHierarchy[userTier as keyof typeof tierHierarchy] >=
      tierHierarchy[session.tierRequired as keyof typeof tierHierarchy]
    )
  }

  const handleJoinSession = (sessionId: string) => {
    onJoinSession?.(sessionId)
  }

  const formatTimeUntil = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)

    if (minutes < 0) return "Started"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h ${minutes % 60}m`
    return `${Math.floor(hours / 24)}d ${hours % 24}h`
  }

  const sortedSessions = sessions.sort((a, b) => a.date.getTime() - b.date.getTime())

  if (loading) {
    return (
      <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-electric-400">
            <Video className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-electric-500/10 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
      <CardHeader>
        <CardTitle className="text-electric-200">Upcoming Meet & Greet Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSessions.length > 0 ? (
          <div className="grid gap-4">
            {sortedSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-md border border-electric-800 p-4 bg-electric-900/20"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-frost-400" />
                  <div>
                    <p className="font-semibold text-electric-100">
                      {format(session.date, "MMM dd, yyyy")} at {session.time}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" /> {session.attendees}/{session.maxAttendees} spots
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => onBookSession?.(session)}
                  disabled={session.isBooked || session.attendees >= session.maxAttendees}
                  className="bg-gradient-electric hover:animate-electric-pulse"
                >
                  {session.isBooked ? "Booked" : "Book Now"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No upcoming sessions at the moment. Check back soon!</p>
        )}
      </CardContent>
    </Card>
  )
}
