import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    title: 'Buy 1 Get 1 Free!',
    subtitle: 'Special Promo Today',
    description: 'Enjoy our signature cappuccino with a friend. Valid for all drinks.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',
  },
  {
    title: 'Fresh Roasted Daily',
    subtitle: 'Premium Beans',
    description: 'Experience the rich aroma of freshly roasted coffee beans.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200',
  },
  {
    title: 'New Cold Brew',
    subtitle: 'Summer Special',
    description: 'Smooth, refreshing, and perfect for hot days.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/70 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              {index === currentSlide && (
                <>
                  <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full mb-4 animate-fade-in">
                    {slide.subtitle}
                  </span>
                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-cream/80 text-lg md:text-xl mb-8 max-w-lg">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-elevated"
                      onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Order Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className=" text-black hover:bg-cream/10 px-8"
                    >
                      View Menu
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-cream/20 backdrop-blur-sm rounded-full text-cream hover:bg-cream/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-cream/20 backdrop-blur-sm rounded-full text-cream hover:bg-cream/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-cream/40 hover:bg-cream/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
