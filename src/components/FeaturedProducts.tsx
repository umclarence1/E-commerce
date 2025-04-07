
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addToCart } from "./ShoppingCart";

// Mock product data with improved realistic images
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    category: "Clothing",
    color: "Black",
    size: "M",
    isNew: true
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
    category: "Clothing",
    color: "Blue",
    size: "32",
    isNew: true
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
    category: "Accessories",
    color: "Brown",
    size: "One Size",
    isNew: false
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
    category: "Electronics",
    color: "Black",
    size: "One Size",
    isNew: false
  },
  {
    id: 5,
    name: "Minimalist Watch",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    category: "Accessories",
    color: "Silver",
    size: "One Size",
    isNew: true
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
    category: "Footwear",
    color: "White",
    size: "42",
    isNew: false
  }
];

// Create a local store for wishlist
const wishlistStore = {
  items: [] as number[],
  listeners: [] as Function[],
  
  addItem(productId: number) {
    if (!this.items.includes(productId)) {
      this.items.push(productId);
      this.notifyListeners();
    }
  },
  
  removeItem(productId: number) {
    this.items = this.items.filter(id => id !== productId);
    this.notifyListeners();
  },
  
  isInWishlist(productId: number) {
    return this.items.includes(productId);
  },
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.items));
  },
  
  subscribe(listener: Function) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
};

const FeaturedProducts = () => {
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  // Subscribe to wishlist changes
  useState(() => {
    const unsubscribe = wishlistStore.subscribe((items: number[]) => {
      setWishlist([...items]);
    });
    
    return unsubscribe;
  });
  
  const addProductToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const toggleWishlist = (productId: number, productName: string) => {
    if (wishlistStore.isInWishlist(productId)) {
      wishlistStore.removeItem(productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } else {
      wishlistStore.addItem(productId);
      toast({
        title: "Added to wishlist",
        description: `${productName} has been added to your wishlist.`,
      });
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                      New Arrival
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      size="icon" 
                      onClick={() => addProductToCart(product)}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className={`${wishlistStore.isInWishlist(product.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-black hover:bg-white/90'}`}
                    >
                      <Heart className={`h-4 w-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <h3 className="font-medium mt-1">{product.name}</h3>
                  <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-full sm:basis-1/2">
                  <Card className="overflow-hidden group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                          New Arrival
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                      <h3 className="font-medium mt-1">{product.name}</h3>
                      <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addProductToCart(product)}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                        <Button 
                          size="sm"
                          variant={wishlistStore.isInWishlist(product.id) ? "default" : "ghost"}
                          onClick={() => toggleWishlist(product.id, product.name)}
                          className={wishlistStore.isInWishlist(product.id) ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                          <Heart className={`h-4 w-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
