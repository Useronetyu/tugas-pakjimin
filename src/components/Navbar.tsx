import { Coffee, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavbarProps {
  onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foam/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-xl group-hover:bg-primary/90 transition-colors">
              <Coffee className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-lg md:text-xl font-semibold text-foreground">
              Cappuccino Cloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Menu
            </a>
            <a href="#featured" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Best Sellers
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              About
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Auth Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthClick}
              className="hidden md:flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              {user ? 'Logout' : 'Login'}
            </Button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-soft"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-card">
                <SheetHeader>
                  <SheetTitle className="font-display">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <a
                    href="#menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    Menu
                  </a>
                  <a
                    href="#featured"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    Best Sellers
                  </a>
                  <a
                    href="#about"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    About
                  </a>
                  <hr className="border-border" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleAuthClick();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user ? 'Logout' : 'Login'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
