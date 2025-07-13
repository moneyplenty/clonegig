import {
  SunIcon,
  MoonIcon,
  LaptopIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
  DotFilledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons"
import { GitlabIcon as GitHub, Twitter, type ProportionsIcon as IconProps } from "lucide-react"

export const Icons = {
  gitHub: (props: IconProps) => <GitHub {...props} />,
  twitter: (props: IconProps) => <Twitter {...props} />,
  sun: SunIcon,
  moon: MoonIcon,
  laptop: LaptopIcon,
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  dotsHorizontal: DotsHorizontalIcon,
  search: MagnifyingGlassIcon,
  close: Cross2Icon,
  dotFilled: DotFilledIcon,
  warning: ExclamationTriangleIcon,
  // You can add other icons here as needed, e.g.,
  // logo: (props: IconProps) => <YourCustomLogoIcon {...props} />,
}
