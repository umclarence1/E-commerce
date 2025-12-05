import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    {
      title: "Timeless",
      subtitle: "Elegance",
      description: "Discover curated collections that transcend seasons",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000",
      accent: "New Season 2025"
    },
    {
      title: "Refined",
      subtitle: "Luxury",
      description: "Where craftsmanship meets contemporary design",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000",
      accent: "Exclusive Collection"
    },
    {
      title: "Modern",
      subtitle: "Heritage",
      description: "Tradition reimagined for the discerning individual",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000",
      accent: "Limited Edition"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "50K+", label: "Happy Clients" },
    { value: "200+", label: "Premium Brands" },
    { value: "15+", label: "Years of Excellence" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-luxury ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Accent Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full"
              style={{ animationDelay: '0.2s' }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500 tracking-wider uppercase">
                {slides[currentSlide].accent}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-none">
                {slides[currentSlide].title}
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-none">
                <span className="text-gradient-gold">{slides[currentSlide].subtitle}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/60 max-w-md font-light leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="btn-luxury group px-8 py-6 text-base font-medium rounded-full"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="px-8 py-6 text-base font-medium text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Story
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-white/10 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-semibold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Featured Product Card */}
          <div className={`hidden lg:block ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              {/* Decorative Ring */}
              <div className="absolute -inset-4 border border-amber-500/20 rounded-3xl animate-spin-slow" style={{ animationDuration: '30s' }} />

              {/* Main Card */}
              <div className="glass rounded-3xl p-8 space-y-6">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
                    alt="Featured Product"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-500 text-sm font-medium tracking-wider uppercase">Featured</p>
                        <h3 className="text-white text-xl font-serif mt-1">Autumn Collection</h3>
                      </div>
                      <div className="glass-gold rounded-full p-3 cursor-pointer hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-between text-center">
                  <div>
                    <p className="text-2xl font-serif text-white">124</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">New Items</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-serif text-white">48</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Brands</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-serif text-white">5</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Categories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? "w-12 h-2 bg-amber-500"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 tracking-widest uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <div className="scroll-indicator mt-12" />
      </div>

      {/* Side Text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
          <span className="text-xs text-white/50 tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Debutify 2025
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
