
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import Newsletter from "@/components/Newsletter";
import ProductDetail from "@/components/ProductDetail";
import ShoppingCart from "@/components/ShoppingCart";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, User, Heart, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  { id: "all", name: "All Products" },
  { id: "womens", name: "Women's Fashion" },
  { id: "mens", name: "Men's Fashion" },
  { id: "accessories", name: "Accessories" },
  { id: "footwear", name: "Footwear" }
];

const Index = () => {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast({
      title: `Category Changed`,
      description: `Now showing ${category === "all" ? "all products" : categories.find(c => c.id === category)?.name}`,
    });
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Browse Our Collection</h2>
            <Button onClick={toggleProductDetail} className="w-full md:w-auto">
              {showProductDetail ? "Hide Details" : "View Product Details"}
            </Button>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeCategory} 
            onValueChange={handleCategoryChange}
            className="w-full mb-8"
          >
            <TabsList className={`w-full ${isMobile ? 'grid grid-cols-2 gap-1' : 'flex'} mb-6 overflow-x-auto`}>
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className={`${isMobile ? 'py-2 px-1 text-sm mb-1' : ''}`}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {category.id === "all" && (
                  <div className="text-center text-slate-600 dark:text-slate-400 mb-4">
                    Showing all products across categories
                  </div>
                )}
                {category.id !== "all" && (
                  <div className="text-center text-slate-600 dark:text-slate-400 mb-4">
                    Showing {category.name} collection
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
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

      <footer className="bg-slate-900 text-white py-10">
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
              <div className="flex flex-wrap gap-4">
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
