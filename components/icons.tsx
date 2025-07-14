import {
  type LightbulbIcon as LucideProps,
  Moon,
  SunMedium,
  Github,
  Twitter,
  Laptop,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  twitter: Twitter,
  logo: ({ ...props }: LucideProps) => (
    <img 
      src="/creekman-logo.png" 
      alt="Creekman Logo" 
      className="h-6 w-6" 
      {...props} 
    />
  ),
}