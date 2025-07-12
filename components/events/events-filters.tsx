"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function EventsFilters() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [eventType, setEventType] = useState({
    live: false,
    online: false,
    meetup: false,
  })
  const [accessLevel, setAccessLevel] = useState("all")

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleEventTypeChange = (type: keyof typeof eventType, checked: boolean) => {
    setEventType((prev) => ({ ...prev, [type]: checked }))
  }

  const handleApplyFilters = () => {
    // In a real application, you would apply these filters to your event data
    console.log("Applied Filters:", { date, priceRange, eventType, accessLevel })
    // You might pass these filters up to a parent component or use a global state management
  }

  const handleClearFilters = () => {
    setDate(undefined)
    setPriceRange([0, 100])
    setEventType({ live: false, online: false, meetup: false })
    setAccessLevel("all")
    console.log("Cleared Filters")
  }

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 w-full md:w-1/4 shrink-0">
      <CardHeader>
        <CardTitle className="text-electric-200">Filter Events</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 space-y-6">
        {/* Date Filter */}
        <div>
          <Label htmlFor="date-filter" className="mb-2 block text-electric-200">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/50 border-electric-700 text-electric-100",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background border-electric-700">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label htmlFor="price-range" className="mb-4 block text-electric-200">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            id="price-range"
            min={0}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="[&_[data-radix-slider-track]]:bg-electric-800 [&_[data-radix-slider-range]]:bg-electric-500"
            thumbClassName="bg-electric-400 border-electric-200"
          />
        </div>

        {/* Event Type Filter */}
        <div>
          <h3 className="font-semibold mb-2">Event Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="live"
                checked={eventType.live}
                onCheckedChange={(checked) => handleEventTypeChange("live", !!checked)}
                className="border-electric-700 data-[state=checked]:bg-electric-500 data-[state=checked]:text-electric-100"
              />
              <Label
                htmlFor="live"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-electric-200"
              >
                Live Concerts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online"
                checked={eventType.online}
                onCheckedChange={(checked) => handleEventTypeChange("online", !!checked)}
                className="border-electric-700 data-[state=checked]:bg-electric-500 data-[state=checked]:text-electric-100"
              />
              <Label
                htmlFor="online"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-electric-200"
              >
                Online Streams
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="meetup"
                checked={eventType.meetup}
                onCheckedChange={(checked) => handleEventTypeChange("meetup", !!checked)}
                className="border-electric-700 data-[state=checked]:bg-electric-500 data-[state=checked]:text-electric-100"
              />
              <Label
                htmlFor="meetup"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-electric-200"
              >
                Meetups & Signings
              </Label>
            </div>
          </div>
        </div>

        {/* Access Level Filter */}
        <div>
          <h3 className="font-semibold mb-2">Access Level</h3>
          <RadioGroup defaultValue="all" className="space-y-2" value={accessLevel} onValueChange={setAccessLevel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="access-all" className="border-electric-700" />
              <Label htmlFor="access-all" className="text-sm font-medium leading-none text-electric-200">
                All Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="premium" id="access-premium" className="border-electric-700" />
              <Label htmlFor="access-premium" className="text-sm font-medium leading-none text-electric-200">
                Premium Only
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleApplyFilters} className="flex-1 bg-gradient-electric hover:animate-electric-pulse">
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1 border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
