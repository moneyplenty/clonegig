import {
  type LightbulbIcon as LucideProps,
  Moon,
  SunMedium,
  Laptop,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronRight,
  Package,
  Calendar,
  FileText,
  Users,
  Star,
  Zap,
  Crown,
  MessageCircle,
  ExternalLink,
  MapPin,
  DollarSign,
  Pencil,
  Trash,
  CheckCircle,
  Info,
  AlertTriangle,
  PlayCircle,
  Headphones,
  BookOpen,
  Truck,
  Shield,
  Gift,
  Sparkles,
  Clock,
  Video,
  Phone,
  PanelLeft,
  Minus,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  cart: ShoppingCart,
  user: User,
  menu: Menu,
  close: X,
  chevronRight: ChevronRight,
  package: Package,
  calendar: Calendar,
  fileText: FileText,
  users: Users,
  star: Star,
  zap: Zap,
  crown: Crown,
  messageCircle: MessageCircle,
  externalLink: ExternalLink,
  mapPin: MapPin,
  dollarSign: DollarSign,
  pencil: Pencil,
  trash: Trash,
  checkCircle: CheckCircle,
  info: Info,
  alertTriangle: AlertTriangle,
  playCircle: PlayCircle,
  headphones: Headphones,
  bookOpen: BookOpen,
  truck: Truck,
  shield: Shield,
  gift: Gift,
  sparkles: Sparkles,
  clock: Clock,
  video: Video,
  phone: Phone,
  panelLeft: PanelLeft,
  minus: Minus,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
}
