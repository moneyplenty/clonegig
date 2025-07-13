-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'premium', 'vip')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('video', 'audio', 'blog', 'gallery', 'text')),
  category TEXT,
  image TEXT,
  content_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount_total INTEGER,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meet_and_greet_sessions table
CREATE TABLE IF NOT EXISTS meet_and_greet_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 30, -- minutes
  price DECIMAL(10,2) DEFAULT 0,
  max_participants INTEGER DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  session_type TEXT DEFAULT 'private' CHECK (session_type IN ('private', 'group')),
  room_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meet_and_greet_bookings table
CREATE TABLE IF NOT EXISTS meet_and_greet_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES meet_and_greet_sessions(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  amount_paid INTEGER,
  booking_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_bookings table
CREATE TABLE IF NOT EXISTS event_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  amount_paid INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meet_and_greet_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meet_and_greet_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Content policies
CREATE POLICY "Anyone can view published content" ON content
  FOR SELECT USING (status = 'published');

CREATE POLICY "Premium users can view premium content" ON content
  FOR SELECT USING (
    status = 'published' AND (
      is_premium = false OR
      EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND membership_tier IN ('premium', 'vip')
      )
    )
  );

CREATE POLICY "Admins can manage content" ON content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Order items policies
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

-- Meet and greet sessions policies
CREATE POLICY "Anyone can view sessions" ON meet_and_greet_sessions
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage sessions" ON meet_and_greet_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Meet and greet bookings policies
CREATE POLICY "Users can view their own bookings" ON meet_and_greet_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON meet_and_greet_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings" ON meet_and_greet_bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Event bookings policies
CREATE POLICY "Users can view their own event bookings" ON event_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own event bookings" ON event_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all event bookings" ON event_bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meet_and_greet_sessions_updated_at BEFORE UPDATE ON meet_and_greet_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meet_and_greet_bookings_updated_at BEFORE UPDATE ON meet_and_greet_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_bookings_updated_at BEFORE UPDATE ON event_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO products (name, description, price, image, category, stock_quantity, is_featured) VALUES
('Kelvin Creekman T-Shirt', 'Official band t-shirt with electric design', 25.99, '/placeholder.svg?height=300&width=300', 'Apparel', 50, true),
('Electric Dreams Vinyl', 'Limited edition vinyl record', 34.99, '/placeholder.svg?height=300&width=300', 'Music', 25, true),
('Band Logo Hoodie', 'Comfortable hoodie with embroidered logo', 45.99, '/placeholder.svg?height=300&width=300', 'Apparel', 30, false),
('Concert Poster Set', 'Collection of vintage concert posters', 19.99, '/placeholder.svg?height=300&width=300', 'Collectibles', 15, false),
('Guitar Pick Set', 'Official guitar picks used by Kelvin', 12.99, '/placeholder.svg?height=300&width=300', 'Accessories', 100, true),
('Signed Photo', 'Autographed 8x10 photo', 29.99, '/placeholder.svg?height=300&width=300', 'Collectibles', 10, false);

INSERT INTO events (title, description, date, location, image, ticket_price, is_premium, max_attendees) VALUES
('Electric Dreams Tour - NYC', 'Live concert at Madison Square Garden', '2024-02-15 20:00:00+00', 'Madison Square Garden, New York', '/placeholder.svg?height=400&width=600', 75.00, false, 20000),
('Acoustic Session - LA', 'Intimate acoustic performance', '2024-02-20 19:00:00+00', 'The Troubadour, Los Angeles', '/placeholder.svg?height=400&width=600', 45.00, true, 500),
('Meet & Greet - Chicago', 'Exclusive meet and greet session', '2024-02-25 18:00:00+00', 'House of Blues, Chicago', '/placeholder.svg?height=400&width=600', 150.00, true, 50);

INSERT INTO content (title, description, type, category, image, is_premium, status, author_id) VALUES
('Behind the Scenes: Electric Dreams', 'Exclusive behind-the-scenes footage from the album recording', 'video', 'Exclusive', '/placeholder.svg?height=200&width=300', true, 'published', NULL),
('Top 5 Guitar Riffs', 'Kelvin shares his favorite guitar riffs and influences', 'blog', 'Public', '/placeholder.svg?height=200&width=300', false, 'published', NULL),
('Fan Art Showcase', 'Amazing fan art from the community', 'gallery', 'Public', '/placeholder.svg?height=200&width=300', false, 'published', NULL),
('Unreleased Demo: Frozen Fire', 'Exclusive unreleased demo track', 'audio', 'Exclusive', '/placeholder.svg?height=200&width=300', true, 'published', NULL);
