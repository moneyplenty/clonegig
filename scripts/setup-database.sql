-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'premium', 'vip')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image TEXT,
  ticket_price DECIMAL(10,2) DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table
CREATE TABLE IF NOT EXISTS public.content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('video', 'audio', 'blog', 'gallery', 'text')),
  category TEXT,
  image TEXT,
  content_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meet_and_greets table
CREATE TABLE IF NOT EXISTS public.meet_and_greets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 30, -- minutes
  price DECIMAL(10,2) NOT NULL,
  max_participants INTEGER DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  room_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_bookings table
CREATE TABLE IF NOT EXISTS public.event_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Create meet_and_greet_bookings table
CREATE TABLE IF NOT EXISTS public.meet_and_greet_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meet_and_greet_id UUID REFERENCES public.meet_and_greets(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, meet_and_greet_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Content policies
CREATE POLICY "Public content is viewable by everyone" ON public.content
  FOR SELECT USING (NOT is_premium);

CREATE POLICY "Premium content is viewable by premium users" ON public.content
  FOR SELECT USING (
    NOT is_premium OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.membership_tier IN ('premium', 'vip')
    )
  );

CREATE POLICY "Only admins can manage content" ON public.content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Meet and greets policies
CREATE POLICY "Meet and greets are viewable by everyone" ON public.meet_and_greets
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage meet and greets" ON public.meet_and_greets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Booking policies
CREATE POLICY "Users can view their own bookings" ON public.event_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.event_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own meet and greet bookings" ON public.meet_and_greet_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meet and greet bookings" ON public.meet_and_greet_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order policies
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meet_and_greets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meet_and_greet_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.events (title, description, date, location, image, ticket_price, is_premium) VALUES
('Kelvin Creekman Live in Concert', 'An electrifying live performance featuring all your favorite hits', '2024-12-15 20:00:00+00', 'The Electric Venue, New York, NY', '/placeholder.svg?height=200&width=300', 75.00, false),
('Acoustic Set & Storytelling', 'An intimate acoustic session with stories behind the songs', '2024-12-22 18:00:00+00', 'The Blue Note, Chicago, IL', '/placeholder.svg?height=200&width=300', 50.00, true),
('Album Release Party', 'Celebrate the release of the new album with exclusive previews', '2025-01-05 19:00:00+00', 'Online Stream', '/placeholder.svg?height=200&width=300', 20.00, false);

INSERT INTO public.products (name, description, price, image, category, stock_quantity, is_featured) VALUES
('Kelvin Creekman T-Shirt', 'Official band t-shirt with the iconic logo', 25.00, '/placeholder.svg?height=200&width=200', 'Apparel', 100, true),
('Electric Dreams Vinyl', 'Limited edition vinyl of the latest album', 50.00, '/placeholder.svg?height=200&width=200', 'Music', 50, true),
('Signature Guitar Pick Set', 'Set of 5 guitar picks with Kelvin''s signature', 10.00, '/placeholder.svg?height=200&width=200', 'Accessories', 200, false),
('Autographed Poster', 'Signed poster from the latest tour', 30.00, '/placeholder.svg?height=200&width=200', 'Collectibles', 25, false);

INSERT INTO public.content (title, description, type, category, image, is_premium) VALUES
('Behind the Scenes: Recording Electric Dreams', 'Go behind the scenes of the latest album recording process', 'video', 'Exclusive', '/placeholder.svg?height=200&width=300', true),
('Kelvin''s Top 5 Guitar Riffs', 'Kelvin shares his favorite guitar riffs and the stories behind them', 'blog', 'Public', '/placeholder.svg?height=200&width=300', false),
('Unreleased Demo: Frozen Fire', 'Listen to an exclusive unreleased demo track', 'audio', 'Exclusive', '/placeholder.svg?height=200&width=300', true),
('Fan Art Showcase: December 2024', 'A collection of amazing fan art from the community', 'gallery', 'Public', '/placeholder.svg?height=200&width=300', false);

INSERT INTO public.meet_and_greets (title, description, date, duration, price, max_participants, is_premium) VALUES
('VIP Meet & Greet Session', 'Exclusive one-on-one video call with Kelvin', '2024-12-20 15:00:00+00', 15, 150.00, 1, true),
('Group Fan Chat', 'Join a group video call with other fans and Kelvin', '2024-12-27 16:00:00+00', 30, 75.00, 5, false),
('New Year Special Meet & Greet', 'Ring in the new year with Kelvin in this special session', '2025-01-01 14:00:00+00', 20, 200.00, 1, true);
