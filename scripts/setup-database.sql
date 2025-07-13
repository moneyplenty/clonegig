-- Enable uuid-ossp for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  email text UNIQUE,
  avatar_url text,
  role text DEFAULT 'user', -- 'user', 'admin'
  membership_tier text DEFAULT 'free', -- 'free', 'premium', 'vip'
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Set up Row Level Security (RLS) for profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create products table for merchandise
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text,
  stock integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Seed some initial products
INSERT INTO public.products (name, description, price, image_url, stock)
VALUES
  ('Kelvin Creekman T-Shirt', 'Official band t-shirt, black with red logo.', 25.00, '/merch/kelvin-tshirt.webp', 100),
  ('Kelvin Creekman Beanie', 'Warm beanie with embroidered logo.', 18.00, '/merch/beanie.jpg', 50),
  ('Kelvin Creekman Mug (Black)', 'Ceramic mug with band logo, black.', 12.00, '/merch/mug-black.webp', 75),
  ('Kelvin Creekman Mug (White)', 'Ceramic mug with band logo, white.', 12.00, '/merch/mug-white.webp', 75),
  ('Kelvin Creekman Pin Set', 'Set of 3 enamel pins with band motifs.', 15.00, '/merch/pin.webp', 60),
  ('Kelvin Creekman Notepad', 'Branded notepad for your notes.', 8.00, '/merch/notepad.webp', 120)
ON CONFLICT (name) DO NOTHING;

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending' NOT NULL, -- 'pending', 'completed', 'cancelled'
  shipping_address jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  price_at_purchase numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  date timestamp with time zone NOT NULL,
  location text,
  ticket_price numeric(10, 2),
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Seed some initial events
INSERT INTO public.events (name, description, date, location, ticket_price, image_url)
VALUES
  ('Virtual Acoustic Session', 'An intimate online acoustic performance and Q&A.', '2025-08-15 19:00:00+00', 'Online (Zoom)', 10.00, '/placeholder.svg'),
  ('Live Concert: City Hall', 'Kelvin Creekman live in concert at City Hall.', '2025-09-22 20:00:00+00', 'New York, NY', 45.00, '/placeholder.svg'),
  ('Fan Meetup: Los Angeles', 'Casual fan gathering and signing event.', '2025-10-05 14:00:00+00', 'The Roxy, Los Angeles, CA', 0.00, '/placeholder.svg')
ON CONFLICT (name) DO NOTHING;

-- Create event_bookings table
CREATE TABLE IF NOT EXISTS public.event_bookings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  booking_date timestamp with time zone DEFAULT now(),
  total_price numeric(10, 2) NOT NULL,
  status text DEFAULT 'confirmed' NOT NULL -- 'confirmed', 'cancelled'
);

-- Create content table (for exclusive content)
CREATE TABLE IF NOT EXISTS public.content (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  type text NOT NULL, -- 'video', 'audio', 'blog', 'image'
  url text NOT NULL,
  access_level text DEFAULT 'premium' NOT NULL, -- 'free', 'premium', 'vip'
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Seed some initial content
INSERT INTO public.content (title, description, type, url, access_level)
VALUES
  ('Unreleased Demo: "Echoes"', 'Early demo version of a new song.', 'audio', 'https://example.com/echoes.mp3', 'premium'),
  ('Behind the Scenes: Music Video Shoot', 'Exclusive footage from the latest music video.', 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'vip'),
  ('My Songwriting Process', 'A deep dive into how I write my songs.', 'blog', 'https://example.com/blog/songwriting-process', 'premium'),
  ('Fan Art Showcase', 'A gallery of amazing fan-created artwork.', 'image', 'https://example.com/fan-art-gallery', 'free')
ON CONFLICT (title) DO NOTHING;

-- Create community_posts table
CREATE TABLE IF NOT EXISTS public.community_posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create community_comments table
CREATE TABLE IF NOT EXISTS public.community_comments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create meet_and_greet_bookings table
CREATE TABLE IF NOT EXISTS public.meet_and_greet_bookings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_time timestamp with time zone NOT NULL,
  session_type text NOT NULL, -- e.g., '1-on-1 Video Call', 'Group Q&A', 'WhatsApp Call', 'Facetime Call'
  status text DEFAULT 'pending' NOT NULL, -- 'pending', 'confirmed', 'cancelled', 'completed'
  room_url text, -- URL for the video call, populated upon confirmation
  price numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create signal_messages table for WebRTC signaling
CREATE TABLE IF NOT EXISTS public.signal_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id text NOT NULL,
  sender_id text NOT NULL,
  type text NOT NULL, -- 'offer', 'answer', 'candidate'
  payload jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Realtime for signal_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.signal_messages;
