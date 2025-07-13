import { type LightbulbIcon as LucideProps, Music } from "lucide-react"

export const Icons = {
  logo: Music,
  menu: (props: LucideProps) => (
    <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 5h18M3 12h18M3 19h18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}
