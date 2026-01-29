import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  category: string | null;
  is_bestseller: boolean | null;
}

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

export function ProductCard({ product, isFeatured = false }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '',
    });
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 ${
        isFeatured ? 'ring-2 ring-accent ring-offset-2' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_bestseller && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
            <Star className="h-3 w-3 fill-current" />
            Best Seller
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full capitalize whitespace-nowrap">
            {product.category}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 shadow-soft"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
