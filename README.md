# Kelvin Creekman Fan Club Website

This is the official fan club website for the rock and metal musician, Kelvin Creekman.

## Features

*   **Authentication**: Secure user authentication using Supabase, with different roles (guest, fan, premium, admin).
*   **Content Access Control**: Exclusive content (videos, audio, blogs) accessible based on user membership tiers.
*   **Merchandise Store**: An e-commerce store powered by Stripe for purchasing Kelvin Creekman merchandise.
*   **Events Management**: View and manage upcoming events, including concerts and meet-and-greets.
*   **Meet & Greet Video Calls**: Integration with Daily.co for live video calls during meet-and-greet sessions.
*   **Admin Dashboard**: A protected `/admin` route for managing products, events, and content.
*   **Email Notifications**: Confirmation emails for event bookings and meet-and-greets using Resend.
*   **Responsive Design**: Optimized for various screen sizes using Tailwind CSS and Shadcn UI.
*   **Dynamic Routes**: For individual blog posts, product pages, and event details.

## Technologies Used

*   **Next.js 14 (App Router)**: React framework for building the web application.
*   **React**: Frontend library for UI.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Shadcn UI**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **Supabase**: Backend-as-a-Service for authentication and database.
*   **Prisma**: Next-generation ORM for Node.js and TypeScript.
*   **Stripe**: For payment processing in the merchandise store.
*   **Daily.co**: For real-time video and audio communication (meet-and-greets).
*   **Resend**: For sending transactional emails.
*   **Lucide React**: For icons.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd kelvin-creekman-fan-club
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pnpm install
# or
npm install
# or
yarn install
\`\`\`

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY" # Used for server-side operations

# Prisma (for Supabase PostgreSQL)
POSTGRES_PRISMA_URL="YOUR_POSTGRES_PRISMA_URL"
# If using direct connection for Prisma (e.g., for migrations)
# POSTGRES_URL_NON_POOLING="YOUR_POSTGRES_URL_NON_POOLING"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET" # Get this from Stripe CLI or Dashboard

# Daily.co
DAILY_API_KEY="YOUR_DAILY_API_KEY"
DAILY_DOMAIN="YOUR_DAILY_DOMAIN"
NEXT_PUBLIC_DAILY_DOMAIN="YOUR_DAILY_DOMAIN"

# Resend
RESEND_API_KEY="YOUR_RESEND_API_KEY"
\`\`\`

### 4. Setup Supabase

*   Create a new project on [Supabase](https://supabase.com/).
*   Copy your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your project settings (API section).
*   Generate a new `Service Role Key` (under Project Settings -> API Keys) and set it as `SUPABASE_SERVICE_ROLE_KEY`.
*   Configure your PostgreSQL database connection string for `POSTGRES_PRISMA_URL`.

### 5. Database Migrations (Prisma)

Run Prisma migrations to set up your database schema:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

### 6. Seed Database (Optional)

You can create a `prisma/seed.ts` file and run `npx prisma db seed` to populate your database with sample data.

### 7. Run the Development Server

\`\`\`bash
pnpm dev
# or
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project can be easily deployed to Vercel. Ensure your environment variables are configured in your Vercel project settings.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
\`\`\`
