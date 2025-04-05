
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import Newsletter from "@/components/Newsletter";
import { ShoppingCart, Heart, User, Search, Menu, X, Home, Package, Layers, MessageCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const { toast } = useToast();
  const navRef = useRef<HTMLDivElement>(null);
  
  const menuItems = [
    { icon: Home, label: "Home", angle: 0 },
    { icon: Package, label: "Products", angle: 72 },
    { icon: Layers, label: "Collections", angle: 144 },
    { icon: MessageCircle, label: "About", angle: 216 },
    { icon: HelpCircle, label: "Contact", angle: 288 }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">DebutiStyle</h1>
            </div>
            
            {/* Circular Navigation */}
            <div className="relative" ref={navRef}>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full z-50 relative ${isMenuOpen ? 'bg-primary text-white' : ''}`}
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {isMenuOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
              )}
              
              <div className={`absolute top-0 right-0 w-64 h-64 -mt-28 -mr-28 rounded-full transition-all duration-500 z-40 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const radian = (item.angle * Math.PI) / 180;
                  const x = Math.cos(radian) * 100;
                  const y = Math.sin(radian) * 100;
                  
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className={`absolute rounded-full transition-all duration-300 ${activeMenuItem === index ? 'bg-primary text-white scale-125' : 'bg-white/80 backdrop-blur-sm'}`}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        transitionDelay: `${index * 50}ms`
                      }}
                      onMouseEnter={() => setActiveMenuItem(index)}
                      onMouseLeave={() => setActiveMenuItem(null)}
                      onClick={() => {
                        toast({
                          title: `Navigating to ${item.label}`,
                          description: "This page is coming soon!",
                        });
                        setIsMenuOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {activeMenuItem === index && (
                        <span className="absolute whitespace-nowrap top-full mt-2 text-xs font-medium bg-white px-2 py-1 rounded shadow-md">
                          {item.label}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => toast({ title: "Search coming soon!" })}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast({ title: "User account coming soon!" })}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast({ title: "Wishlist coming soon!" })}>
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast({ title: "Cart coming soon!" })}>
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <ProductCategories />
        <Newsletter />
      </main>

      <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">DebutiStyle</h2>
              <p className="text-white/80">Your premium shopping destination for stylish and affordable products.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="/new-arrivals" className="text-white/70 hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="/best-sellers" className="text-white/70 hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="/sale" className="text-white/70 hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/shipping" className="text-white/70 hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} DebutiStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
