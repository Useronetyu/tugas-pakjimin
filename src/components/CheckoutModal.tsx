import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CreditCard, Truck, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart, CartItem } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  address: z.string().min(10, 'Please enter a complete address').max(500),
  paymentMethod: z.enum(['transfer', 'cod']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cod',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const generateWhatsAppMessage = (data: CheckoutForm, items: CartItem[], total: number) => {
    const itemsList = items
      .map((item) => `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `Halo, pesanan baru via Web:

${itemsList}

Total: ${formatPrice(total)}

Data Pemesan:
Nama: ${data.name}
Alamat: ${data.address}
Metode: ${data.paymentMethod === 'transfer' ? 'Transfer Bank' : 'COD (Cash on Delivery)'}`;

    return encodeURIComponent(message);
  };

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);

    try {
      // Step A: Save order to database
      const { error } = await supabase.from('orders').insert({
        customer_name: data.name,
        customer_address: data.address,
        payment_method: data.paymentMethod,
        total_price: totalPrice,
        items_json: items as unknown as import('@/integrations/supabase/types').Json,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Order saved successfully!');

      // Step B: Redirect to WhatsApp
      const whatsappMessage = generateWhatsAppMessage(data, items, totalPrice);
      const whatsappUrl = `https://wa.me/6288225691061?text=${whatsappMessage}`;

      // Clear cart and close modal
      clearCart();
      reset();
      onClose();

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-accent" />
            Checkout
          </DialogTitle>
          <DialogDescription>
            Complete your order details below
          </DialogDescription>
        </DialogHeader>

        {/* Order Summary */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          <div className="space-y-1 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <hr className="my-2 border-border" />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register('name')}
              className="bg-background"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address including city and postal code"
              rows={3}
              {...register('address')}
              className="bg-background resize-none"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setValue('paymentMethod', value as 'transfer' | 'cod')}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="transfer"
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background hover:border-muted-foreground'
                }`}
              >
                <RadioGroupItem value="transfer" id="transfer" />
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">Transfer</span>
              </Label>
              <Label
                htmlFor="cod"
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background hover:border-muted-foreground'
                }`}
              >
                <RadioGroupItem value="cod" id="cod" />
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-medium">COD</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg shadow-elevated"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Order via WhatsApp'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
