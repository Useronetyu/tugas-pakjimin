import { Star } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  category: string | null;
  is_bestseller: boolean | null;
}

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  const featured = products.filter(p => p.is_bestseller).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent-foreground rounded-full mb-4">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span className="text-sm font-semibold">Customer Favorites</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Best Sellers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most loved coffee creations, carefully crafted to perfection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} isFeatured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
