"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, Video, Crown, Star, Zap } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface Session {
  id: string
  title: string
  date: Date
  time: string
  duration: number
  participants: number
  maxParticipants: number
  status: "upcoming" | "live" | "completed"
  tierRequired: "frost" | "blizzard" | "avalanche"
  hostName: string
  hostAvatar?: string
  roomUrl?: string
}

interface UpcomingSessionsProps {
  onJoinSession?: (sessionId: string) => void
}

export function UpcomingSessions({ onJoinSession }: UpcomingSessionsProps) {
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

    setTimeout(() => {
      setSessions(mockSessions)
      setLoading(false)
    }, 1000)
  }, [])

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
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-electric-400">
          <Video className="h-5 w-5" />
          Upcoming Sessions
        </CardTitle>
        <CardDescription>Join live meet & greet sessions with Kelvin Creekman</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming sessions scheduled</p>
              <p className="text-sm">Check back later for new sessions!</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border transition-all ${
                  session.status === "live"
                    ? "border-red-500/50 bg-red-500/5 shadow-lg shadow-red-500/20"
                    : "border-electric-700/30 bg-background/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-electric-500/50">
                      <AvatarImage src={session.hostAvatar || "/placeholder.svg"} alt={session.hostName} />
                      <AvatarFallback className="bg-electric-500/20 text-electric-400">
                        {session.hostName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">Hosted by {session.hostName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(session.status)}
                    {getTierBadge(session.tierRequired)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {session.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {session.time} ({session.duration}min)
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {session.participants}/{session.maxParticipants}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {session.status === "live" ? "Live Now" : `Starts in ${formatTimeUntil(session.date)}`}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {user?.user_metadata?.role === "admin" && (
                      <Crown className="h-4 w-4 text-gold-400" title="Admin Host" />
                    )}
                    {session.participants >= session.maxParticipants && (
                      <Badge variant="destructive" className="text-xs">
                        Full
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => handleJoinSession(session.id)}
                    disabled={
                      !user ||
                      !canJoinSession(session) ||
                      (session.participants >= session.maxParticipants && session.status !== "live") ||
                      session.status === "completed"
                    }
                    className={
                      session.status === "live"
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-electric hover:animate-electric-pulse"
                    }
                    size="sm"
                  >
                    {session.status === "live" ? (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Join Live
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        {canJoinSession(session) ? "Join Session" : "Upgrade Required"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
