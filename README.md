# Kelvin Creekman Fan Club Website

Welcome to the official fan club website for Kelvin Creekman, built with Next.js, React, and Tailwind CSS. This platform provides exclusive content, merchandise, event information, and a community space for fans.

## Features

-   **Exclusive Content:** Access behind-the-scenes videos, unreleased music, articles, and photo galleries.
-   **Merchandise Store:** Browse and purchase official Kelvin Creekman merchandise.
-   **Events & Meet-and-Greets:** Stay updated on upcoming events and book exclusive meet-and-greet sessions.
-   **Membership Tiers:** Different tiers (Frost, Blizzard, Avalanche) offering varying levels of access and benefits.
-   **Authentication:** Secure user authentication with Supabase.
-   **Admin Dashboard:** Manage content, products, and events (for authorized users).
-   **Responsive Design:** Optimized for various screen sizes and devices.
-   **Icy, Electrifying Theme:** A unique visual style inspired by rock and metal aesthetics.

## Technologies Used

-   **Next.js:** React framework for production.
-   **React:** JavaScript library for building user interfaces.
-   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
-   **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
-   **Supabase:** Backend-as-a-Service for authentication and database.
-   **Daily.co:** For real-time video calls (Meet & Greet sessions).
-   **Resend:** For transactional email sending (event confirmations).
-   **Lucide React:** A collection of beautiful open-source icons.

## Getting Started

### Prerequisites

-   Node.js (v18.x or higher)
-   npm or Yarn
-   Git

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-username/kelvin-creekman-fan-club.git
    cd kelvin-creekman-fan-club
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your environment variables. You will need to set up a Supabase project, Daily.co account, and Resend account.

    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET"

    DAILY_API_KEY="YOUR_DAILY_API_KEY"
    DAILY_DOMAIN="YOUR_DAILY_DOMAIN"
    NEXT_PUBLIC_DAILY_DOMAIN="YOUR_DAILY_DOMAIN"

    RESEND_API_KEY="YOUR_RESEND_API_KEY"

    # For database connection (e.g., if using Prisma with Supabase)
    DATABASE_URL="postgresql://..."
    \`\`\`

4.  **Run Database Migrations (if using Prisma):**
    If you're using Prisma, ensure your database schema is up-to-date.
    \`\`\`bash
    npx prisma migrate dev --name init
    \`\`\`

5.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
.
├── app/
│   ├── api/                  # API routes (e.g., for Daily.co, Resend)
│   ├── admin/                # Admin dashboard pages
│   ├── checkout/             # Checkout process pages
│   ├── community/            # Community page
│   ├── content/              # Exclusive content pages
│   ├── dashboard/            # User dashboard
│   ├── events/               # Event listing and details pages
│   ├── join/                 # Membership signup page
│   ├── login/                # Login page
│   ├── meet-and-greet/       # Meet & Greet pages
│   ├── store/                # Merchandise store pages
│   ├── signup/               # Signup page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── admin/                # Admin-specific components
│   ├── auth/                 # Authentication components
│   ├── events/               # Event-related components
│   ├── meet-and-greet/       # Meet & Greet components
│   ├── store/                # Store-related components
│   ├── ui/                   # shadcn/ui components
│   ├── main-nav.tsx          # Main navigation
│   ├── mobile-nav.tsx        # Mobile navigation
│   ├── mode-toggle.tsx       # Dark/Light mode toggle
│   ├── site-footer.tsx       # Global footer
│   ├── theme-provider.tsx    # Theme context provider
│   ├── featured-merchandise.tsx # Featured products on homepage
│   ├── hero-section.tsx      # Hero section for homepage
│   ├── membership-tiers.tsx  # Membership tiers display
│   ├── testimonials.tsx      # Testimonials section
│   └── upcoming-events.tsx   # Upcoming events section
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and Supabase client
├── public/                   # Static assets (images, fonts)
├── styles/                   # Additional global styles
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is open source and available under the [MIT License](LICENSE).
