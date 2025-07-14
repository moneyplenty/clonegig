# Creekman Official Website

This is the official website for Creekman, built with Next.js, Tailwind CSS, and Supabase.

## Features

-   **Authentication:** User login and signup powered by Supabase Auth.
-   **Content Management:** Exclusive content (videos, articles, audio) for different membership tiers.
-   **Event Management:** Browse and book upcoming events and meet-and-greets.
-   **Merchandise Store:** Shop for official Creekman merchandise with a shopping cart and Stripe integration.
-   **Admin Dashboard:** Tools for managing users, content, events, and store items.
-   **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/creekman-website.git
cd creekman-website
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Set up Supabase

1.  **Create a Supabase project:** Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Get your API keys:**
    -   `NEXT_PUBLIC_SUPABASE_URL`: Found in Project Settings -> API -> Project URL.
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in Project Settings -> API -> Project API keys (public anon key).
    -   `SUPABASE_SERVICE_ROLE_KEY`: Found in Project Settings -> API -> Project API keys (service_role key - **keep this secret!**).
3.  **Set up environment variables:** Create a `.env.local` file in the root of your project and add the following:

    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    DAILY_API_KEY="YOUR_DAILY_API_KEY" # For video calls
    RESEND_API_KEY="YOUR_RESEND_API_KEY" # For email confirmations
    STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY" # For Stripe payments
    STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET" # For Stripe webhooks
    NEXT_PUBLIC_APP_URL="http://localhost:3000" # Your app's URL (e.g., for Stripe redirects)
    \`\`\`

4.  **Run database setup script:**
    The `scripts/setup-database.sql` file contains the SQL schema and initial data for your Supabase project. You can run this script directly in your Supabase SQL Editor.

    \`\`\`sql
    -- scripts/setup-database.sql
    -- This script sets up the necessary tables and RLS policies for the Creekman website.

    -- Create profiles table
    CREATE TABLE public.profiles (
      id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
      updated_at timestamp with time zone,
      username text UNIQUE,
      avatar_url text,
      website text,
      membership_tier text DEFAULT 'free'::text, -- 'free', 'fan', 'super_fan'
      CONSTRAINT username_length CHECK (char_length(username) >= 3)
    );
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
    CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
    CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

    -- Create products table
    CREATE TABLE public.products (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      description text,
      price numeric NOT NULL,
      image_url text,
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
    CREATE POLICY "Admins can manage products." ON public.products FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create orders table
    CREATE TABLE public.orders (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      total_amount numeric NOT NULL,
      status text DEFAULT 'pending'::text, -- 'pending', 'completed', 'cancelled'
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own orders." ON public.orders FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can insert orders." ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Admins can manage all orders." ON public.orders FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create order_items table
    CREATE TABLE public.order_items (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id uuid REFERENCES public.orders ON DELETE CASCADE,
      product_id uuid REFERENCES public.products ON DELETE CASCADE,
      quantity integer NOT NULL,
      price numeric NOT NULL,
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their order items." ON public.order_items FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));
    CREATE POLICY "Users can insert order items." ON public.order_items FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));
    CREATE POLICY "Admins can manage all order items." ON public.order_items FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create content table
    CREATE TABLE public.content (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      type text NOT NULL, -- 'video', 'article', 'audio'
      url text NOT NULL,
      access_level text DEFAULT 'free'::text, -- 'free', 'fan', 'super_fan'
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Free content is viewable by everyone." ON public.content FOR SELECT USING (access_level = 'free');
    CREATE POLICY "Fan content is viewable by fans and super fans." ON public.content FOR SELECT USING (access_level = 'fan' AND auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier IN ('fan', 'super_fan', 'admin')));
    CREATE POLICY "Super fan content is viewable by super fans." ON public.content FOR SELECT USING (access_level = 'super_fan' AND auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier IN ('super_fan', 'admin')));
    CREATE POLICY "Admins can manage content." ON public.content FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create events table
    CREATE TABLE public.events (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      description text,
      date timestamp with time zone NOT NULL,
      location text,
      price numeric DEFAULT 0,
      max_attendees integer,
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Events are viewable by everyone." ON public.events FOR SELECT USING (true);
    CREATE POLICY "Admins can manage events." ON public.events FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create event_bookings table
    CREATE TABLE public.event_bookings (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id uuid REFERENCES public.events ON DELETE CASCADE,
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      status text DEFAULT 'pending'::text, -- 'pending', 'confirmed', 'cancelled'
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own event bookings." ON public.event_bookings FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can insert event bookings." ON public.event_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Admins can manage all event bookings." ON public.event_bookings FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create meet_and_greets table
    CREATE TABLE public.meet_and_greets (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      date timestamp with time zone NOT NULL,
      daily_room_url text,
      max_participants integer,
      access_level text DEFAULT 'fan'::text, -- 'fan', 'super_fan'
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.meet_and_greets ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Fan meet and greets are viewable by fans and super fans." ON public.meet_and_greets FOR SELECT USING (access_level = 'fan' AND auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier IN ('fan', 'super_fan', 'admin')));
    CREATE POLICY "Super fan meet and greets are viewable by super fans." ON public.meet_and_greets FOR SELECT USING (access_level = 'super_fan' AND auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier IN ('super_fan', 'admin')));
    CREATE POLICY "Admins can manage meet and greets." ON public.meet_and_greets FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create meet_and_greet_bookings table
    CREATE TABLE public.meet_and_greet_bookings (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      meet_and_greet_id uuid REFERENCES public.meet_and_greets ON DELETE CASCADE,
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      status text DEFAULT 'pending'::text, -- 'pending', 'confirmed', 'cancelled'
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.meet_and_greet_bookings ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own meet and greet bookings." ON public.meet_and_greet_bookings FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can insert meet and greet bookings." ON public.meet_and_greet_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Admins can manage all meet and greet bookings." ON public.meet_and_greet_bookings FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create testimonials table
    CREATE TABLE public.testimonials (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      content text NOT NULL,
      rating integer CHECK (rating >= 1 AND rating <= 5),
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Testimonials are viewable by everyone." ON public.testimonials FOR SELECT USING (true);
    CREATE POLICY "Users can insert their own testimonials." ON public.testimonials FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own testimonials." ON public.testimonials FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Admins can manage all testimonials." ON public.testimonials FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create Stripe customers table
    CREATE TABLE public.stripe_customers (
      id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
      stripe_customer_id text UNIQUE NOT NULL,
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own stripe customer ID." ON public.stripe_customers FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Users can insert their own stripe customer ID." ON public.stripe_customers FOR INSERT WITH CHECK (auth.uid() = id);
    CREATE POLICY "Admins can manage all stripe customers." ON public.stripe_customers FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Create Stripe subscriptions table
    CREATE TABLE public.stripe_subscriptions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      stripe_subscription_id text UNIQUE NOT NULL,
      stripe_price_id text NOT NULL,
      status text NOT NULL, -- 'active', 'canceled', 'past_due', 'unpaid'
      current_period_start timestamp with time zone NOT NULL,
      current_period_end timestamp with time zone NOT NULL,
      created_at timestamp with time zone DEFAULT now()
    );
    ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own stripe subscriptions." ON public.stripe_subscriptions FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Admins can manage all stripe subscriptions." ON public.stripe_subscriptions FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE membership_tier = 'admin'));

    -- Set up function to create a public profile for new users
    CREATE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.profiles (id, username, avatar_url)
      VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'avatar_url');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Create trigger for new user sign-ups
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Initial Data (Optional)
    INSERT INTO public.products (name, description, price, image_url) VALUES
    ('Creekman T-Shirt', 'High-quality cotton t-shirt with Creekman logo.', 25.00, '/placeholder.svg?height=400&width=400'),
    ('Creekman Hoodie', 'Warm and comfortable hoodie for all seasons.', 55.00, '/placeholder.svg?height=400&width=400'),
    ('Creekman Mug', 'Ceramic mug perfect for your morning coffee.', 15.00, '/placeholder.svg?height=400&width=400');

    INSERT INTO public.events (name, description, date, location, price, max_attendees) VALUES
    ('Live Acoustic Night', 'An intimate evening of acoustic music.', '2025-08-15 19:00:00+00', 'The Grand Hall', 30.00, 100),
    ('Fan Meetup & Q&A', 'Meet Creekman and ask your burning questions.', '2025-09-01 14:00:00+00', 'Community Center', 0.00, 50);

    INSERT INTO public.content (title, description, type, url, access_level) VALUES
    ('Behind the Scenes: Album Recording', 'Exclusive footage from the making of the new album.', 'video', '/hero-video-1.mp4', 'super_fan'),
    ('My Creative Process', 'An in-depth article about songwriting and inspiration.', 'article', 'https://example.com/article-creative-process', 'fan'),
    ('Unreleased Demo Tracks', 'Listen to early versions of your favorite songs.', 'audio', 'https://example.com/audio-demos', 'super_fan'),
    ('Welcome to Creekman', 'A free introductory video for all fans.', 'video', '/hero-video-2.mp4', 'free');

    INSERT INTO public.testimonials (user_id, content, rating) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Creekman''s music changed my life!', 5),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Attending the live show was an unforgettable experience.', 5),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'The merchandise is top-notch quality.', 4);

    -- Dummy users for testimonials (replace with actual user IDs if needed)
    -- These UUIDs are placeholders and should ideally correspond to actual auth.users.id entries.
    -- For testing purposes, you might manually insert these into auth.users or let Supabase Auth create them.
    INSERT INTO auth.users (id, email, encrypted_password, confirmed_at, instance_id, aud, role, created_at, updated_at) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'testuser1@example.com', 'dummy_password_hash', now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', now(), now()),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'testuser2@example.com', 'dummy_password_hash', now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', now(), now()),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'testuser3@example.com', 'dummy_password_hash', now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', now(), now());

    -- Update profiles for dummy users
    UPDATE public.profiles SET username = 'testuser1', membership_tier = 'fan' WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    UPDATE public.profiles SET username = 'testuser2', membership_tier = 'super_fan' WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12';
    UPDATE public.profiles SET username = 'testuser3', membership_tier = 'free' WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13';
    \`\`\`

### 5. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
