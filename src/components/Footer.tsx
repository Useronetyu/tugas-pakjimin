import { Coffee, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer id="about" className="bg-espresso text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent rounded-xl">
                <Coffee className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">
                Cappuccino Cloud
              </span>
            </div>
            <p className="text-cream/70 leading-relaxed">
              Crafting exceptional coffee experiences since 2020. Every cup tells a story of passion and perfection.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-cream/10 rounded-lg hover:bg-cream/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-cream/10 rounded-lg hover:bg-cream/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-cream/10 rounded-lg hover:bg-cream/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#menu" className="text-cream/70 hover:text-cream transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#featured" className="text-cream/70 hover:text-cream transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-cream/70">
                  Jl. Kopi Nikmat No. 42<br />Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-cream/70">+62 882-2569-1061</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-cream/70">hello@cappuccinocloud.id</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-cream/70">
                <span>Monday - Friday</span>
                <span>7:00 - 22:00</span>
              </li>
              <li className="flex justify-between text-cream/70">
                <span>Saturday</span>
                <span>8:00 - 23:00</span>
              </li>
              <li className="flex justify-between text-cream/70">
                <span>Sunday</span>
                <span>8:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-cream/10 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-cream/50 text-sm">
          <p>© 2024 Cappuccino Cloud. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
