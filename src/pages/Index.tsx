
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import Newsletter from "@/components/Newsletter";
import ProductDetail from "@/components/ProductDetail";
import ShoppingCart from "@/components/ShoppingCart";
import { useToast } from "@/hooks/use-toast";
import { Search, User, Heart, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const { toast } = useToast();
  
  const toggleProductDetail = () => {
    setShowProductDetail(!showProductDetail);
    
    // Scroll to product detail if opening
    if (!showProductDetail) {
      setTimeout(() => {
        document.getElementById('product-detail')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">DebutiStyle</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="link" className="text-foreground">Home</Button>
              <Button variant="link" className="text-foreground">Shop</Button>
              <Button variant="link" className="text-foreground">Collections</Button>
              <Button variant="link" className="text-foreground">About</Button>
              <Button variant="link" className="text-foreground">Contact</Button>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Button variant="ghost" className="justify-start">Home</Button>
                    <Button variant="ghost" className="justify-start">Shop</Button>
                    <Button variant="ghost" className="justify-start">Collections</Button>
                    <Button variant="ghost" className="justify-start">About</Button>
                    <Button variant="ghost" className="justify-start">Contact</Button>
                  </div>
                </SheetContent>
              </Sheet>
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
              <ShoppingCart />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-8 container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Latest Products</h2>
            <Button onClick={toggleProductDetail}>
              {showProductDetail ? "Hide Details" : "View Product Details"}
            </Button>
          </div>
        </section>
        
        {showProductDetail && (
          <div id="product-detail">
            <ProductDetail />
          </div>
        )}
        
        <FeaturedProducts />
        <ProductCategories />
        <Newsletter />
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">DebutiStyle</h2>
              <p className="text-slate-300">Your premium shopping destination for stylish and affordable products.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} DebutiStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
