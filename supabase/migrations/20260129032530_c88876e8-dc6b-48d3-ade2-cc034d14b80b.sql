-- Create products table for coffee menu
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'coffee',
  is_bestseller BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table for tracking purchases
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  customer_name TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  total_price DECIMAL(10, 2) NOT NULL,
  items_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS on both tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products: publicly readable (customers can browse)
CREATE POLICY "Products are publicly readable"
ON public.products FOR SELECT
USING (true);

-- Products: only authenticated users can manage (for admin)
CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
ON public.products FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete products"
ON public.products FOR DELETE
TO authenticated
USING (true);

-- Orders: publicly insertable (customers checkout without auth requirement)
CREATE POLICY "Anyone can create orders"
ON public.orders FOR INSERT
WITH CHECK (true);

-- Orders: authenticated users can read all orders (admin)
CREATE POLICY "Authenticated users can read orders"
ON public.orders FOR SELECT
TO authenticated
USING (true);

-- Orders: authenticated users can update orders
CREATE POLICY "Authenticated users can update orders"
ON public.orders FOR UPDATE
TO authenticated
USING (true);

-- Insert sample products
INSERT INTO public.products (name, price, description, image_url, category, is_bestseller) VALUES
('Cappuccino', 35000, 'Rich espresso with steamed milk and a thick layer of velvety foam', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', 'coffee', true),
('Caramel Latte', 42000, 'Smooth espresso blended with caramel syrup and creamy milk', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'coffee', true),
('Mocha', 45000, 'Perfect blend of espresso, chocolate, and steamed milk', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400', 'coffee', true),
('Americano', 28000, 'Bold espresso shots with hot water for a smooth, rich flavor', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', 'coffee', false),
('Espresso', 25000, 'Pure, intense coffee shot with rich crema', 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', 'coffee', false),
('Vanilla Latte', 40000, 'Creamy latte infused with sweet vanilla flavor', 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', 'coffee', false),
('Cold Brew', 38000, 'Smooth, refreshing cold-brewed coffee served over ice', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'cold', false),
('Iced Caramel Macchiato', 45000, 'Layers of vanilla, milk, espresso and caramel over ice', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400', 'cold', false);