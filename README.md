# Kelvin Creekman Fan Club Website

Welcome to the official fan club website for the rock and metal musician, Kelvin Creekman! This platform is built to bring fans closer to Kelvin, offering exclusive content, merchandise, event information, and a vibrant community.

## Features

*   **Exclusive Content**: Access private articles, videos, and music demos.
*   **Merchandise Store**: Purchase official Kelvin Creekman merchandise with secure Stripe payments.
*   **Events Calendar**: Stay updated on upcoming concerts, meet-and-greets, and virtual sessions.
*   **Community Forum**: Connect with other fans.
*   **Membership Tiers**: Different access levels (Guest, Fan, Premium) with exclusive perks.
*   **Admin Dashboard**: Manage content, products, and events.

## Technologies Used

*   **Next.js**: React framework for server-side rendering and static site generation.
*   **React**: Frontend library for building user interfaces.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Shadcn/ui**: Re-usable components.
*   **Supabase**: Backend-as-a-Service for authentication, database, and storage.
*   **Stripe**: For payment processing in the merchandise store.
*   **Daily.co**: For real-time video sessions (e.g., meet-and-greets).
*   **Resend**: For sending transactional emails (e.g., event confirmations).
*   **Prisma**: ORM for database interaction.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   pnpm (or npm/yarn)
*   A Supabase project
*   A Stripe account
*   A Daily.co account
*   A Resend account

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

# Database connection for Prisma (from Supabase Project Settings -> Database -> Connection string)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Generate this from Stripe Dashboard -> Developers -> Webhooks

DAILY_API_KEY="YOUR_DAILY_API_KEY"
DAILY_DOMAIN="YOUR_DAILY_DOMAIN"
NEXT_PUBLIC_DAILY_DOMAIN="YOUR_DAILY_DOMAIN"

RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="onboarding@resend.dev" # Or your verified sender email
\`\`\`

**Important**: Make sure `NEXT_PUBLIC_BASE_URL` is set in your Vercel project settings for deployments (e.g., `https://your-domain.vercel.app`). For local development, it will default to `http://localhost:3000`.

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone [repository-url]
    cd kelvin-creekman-fanclub
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    pnpm install
    \`\`\`
3.  **Setup Supabase Database (if not already done):**
    *   Create a new project in Supabase.
    *   Go to "SQL Editor" and run the necessary SQL scripts to create your tables (e.g., for users, products, events, content, orders). You'll find example schema in `prisma/schema.prisma` after migration.
4.  **Set up Prisma:**
    *   Make sure your `DATABASE_URL` and `DIRECT_URL` in `.env.local` are correctly configured with your Supabase database connection string.
    *   Generate Prisma client:
        \`\`\`bash
        npx prisma generate
