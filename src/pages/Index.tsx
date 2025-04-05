
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import Newsletter from "@/components/Newsletter";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden mr-2"
                onClick={toggleMenu}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">DebutiStyle</h1>
            </div>
            
            <nav className={`md:flex md:items-center space-x-1 md:space-x-4 ${isMenuOpen ? 'absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50 flex flex-col space-y-2' : 'hidden md:flex'}`}>
              <a href="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">Home</a>
              <a href="/shop" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">Shop</a>
              <a href="/collections" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">Collections</a>
              <a href="/about" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">About</a>
              <a href="/contact" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">Contact</a>
            </nav>
            
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

      <footer className="bg-secondary py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">DebutiStyle</h2>
              <p className="text-muted-foreground">Your premium shopping destination for stylish and affordable products.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="/new-arrivals" className="text-muted-foreground hover:text-foreground">New Arrivals</a></li>
                <li><a href="/best-sellers" className="text-muted-foreground hover:text-foreground">Best Sellers</a></li>
                <li><a href="/sale" className="text-muted-foreground hover:text-foreground">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
                <li><a href="/shipping" className="text-muted-foreground hover:text-foreground">Shipping & Returns</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground hover:text-primary">Instagram</a>
                <a href="#" className="text-foreground hover:text-primary">Facebook</a>
                <a href="#" className="text-foreground hover:text-primary">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DebutiStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
