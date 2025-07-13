# SaaS Starter

This is a Next.js SaaS starter template with Supabase and Stripe integration.

## Features

-   **Next.js App Router**: Modern React framework for building full-stack applications.
-   **Supabase**: Open-source Firebase alternative for authentication and database.
-   **Stripe**: For handling payments and subscriptions.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **Shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
-   **Dark Mode**: Toggle between light and dark themes.
-   **Responsive Design**: Optimized for various screen sizes.
-   **Admin Dashboard**: Basic admin pages for managing users, content, events, and store.
-   **User Dashboard**: Personalized dashboard for logged-in users.
-   **Events Management**: Create, view, and manage events.
-   **Merchandise Store**: Simple e-commerce functionality with Stripe checkout.
-   **Meet & Greet**: Integration with Daily.co for video calls.

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
-   `components/`: Reusable React components, including Shadcn/ui components.
-   `lib/`: Utility functions and Supabase client configurations.
-   `hooks/`: Custom React hooks.
-   `config/`: Site-wide configuration.
-   `public/`: Static assets.
-   `scripts/`: Database setup scripts.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
