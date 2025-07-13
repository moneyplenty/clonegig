# Kelvin Creekman Fan Club Website

A modern, full-stack fan club website built with Next.js, featuring membership tiers, merchandise store, meet & greet sessions, and admin management.

## Features

### 🎵 Core Features
- **Membership Tiers**: Fan, Premium, and VIP with different access levels
- **Mandatory Payment**: Users must purchase a membership before account creation
- **Merchandise Store**: Full e-commerce functionality with Stripe integration
- **Meet & Greet Sessions**: Video calls with admin management via Daily.co
- **Content Management**: Exclusive content based on membership tiers
- **Admin Dashboard**: Complete management interface

### 🛠 Technical Features
- **Next.js 14**: App Router with Server Components
- **TypeScript**: Full type safety
- **Supabase**: Authentication and database
- **Prisma**: Database ORM
- **Stripe**: Payment processing (test mode)
- **Daily.co**: Video calling infrastructure
- **Resend**: Email notifications
- **Tailwind CSS**: Modern styling
- **shadcn/ui**: Component library

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Supabase account
- Stripe account (test mode)
- Daily.co account
- Resend account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd kelvin-fan-club
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in all the required environment variables.

4. **Set up the database**
   \`\`\`bash
   npx prisma db push
   npx prisma generate
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Required Variables
- `POSTGRES_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key (test)
- `STRIPE_SECRET_KEY`: Stripe secret key (test)
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `RESEND_API_KEY`: Resend API key
- `DAILY_API_KEY`: Daily.co API key
- `NEXT_PUBLIC_DAILY_DOMAIN`: Daily.co domain

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Database Setup**
   - Use Vercel Postgres or external PostgreSQL
   - Run migrations: `npx prisma db push`

3. **Stripe Webhooks**
   - Set up webhook endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Add webhook secret to environment variables

4. **Domain Configuration**
   - Configure custom domain in Vercel
   - Update NEXTAUTH_URL environment variable

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── auth/             # Auth components
│   ├── store/            # Store components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── prisma/               # Database schema
└── public/               # Static assets
\`\`\`

## Key Features Explained

### Mandatory Payment Before Signup
- Users must select and pay for a membership tier before creating an account
- Payment is processed through Stripe Checkout
- Account is created only after successful payment verification
- All payments are in test mode for development

### Admin Meet & Greet Management
- Admins can view all meet & greet bookings
- Create Daily.co video rooms for sessions
- Send signals/notifications to users via email
- Join video calls directly from admin dashboard
- Support for WhatsApp and FaceTime private sessions

### Membership Tiers
- **Fan ($9.99/month)**: Basic access to exclusive content
- **Premium ($19.99/month)**: Meet & greet access + additional perks
- **VIP ($49.99/month)**: Private sessions + premium benefits

### Store Integration
- Full e-commerce functionality
- Stripe Checkout integration
- Order management
- Shipping address collection
- Email confirmations

## Security Features

- Server-side authentication with Supabase
- Role-based access control
- Protected API routes
- Stripe webhook signature verification
- Input validation with Zod
- CSRF protection

## Testing

### Stripe Test Mode
The application is configured for Stripe test mode. Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

### Test Users
Create test users through the signup flow with different membership tiers to test functionality.

## Support

For support or questions about this project, please contact the development team.

## License

This project is proprietary and confidential. All rights reserved.
