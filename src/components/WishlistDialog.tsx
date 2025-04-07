
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "./ShoppingCart";

// Mock wishlist database
const wishlistItems = [
  {
    id: 5,
    name: "Minimalist Watch",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    category: "Accessories",
    color: "Silver"
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
    category: "Accessories",
    color: "Brown"
  }
];

// Wishlist store for global wishlist state
export const wishlistStore = {
  items: [...wishlistItems],
  listeners: [] as Function[],
  
  addItem(product: any) {
    if (!this.items.find(item => item.id === product.id)) {
      this.items.push(product);
      this.notifyListeners();
      return true;
    }
    return false;
  },
  
  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.notifyListeners();
    return true;
  },
  
  isInWishlist(productId: number) {
    return this.items.some(item => item.id === productId);
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

const WishlistDialog = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(wishlistStore.items);
  const { toast } = useToast();

  // Subscribe to wishlist changes
  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((updatedItems: any[]) => {
      setItems([...updatedItems]);
    });
    
    return unsubscribe;
  }, []);

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    if (wishlistStore.removeItem(productId)) {
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    }
  };

  const handleAddToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const clearWishlist = () => {
    items.forEach(item => {
      wishlistStore.removeItem(item.id);
    });
    
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({items.length} items)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto py-4">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 border rounded-md">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-sm text-slate-500 mb-1">
                      {item.category}, {item.color}
                    </div>
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-500 hover:text-red-500"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={clearWishlist}>
                  Clear Wishlist
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 space-y-4">
              <div className="bg-slate-100 rounded-full p-6">
                <Heart className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="font-medium text-xl">Your wishlist is empty</h3>
              <p className="text-slate-500 text-center max-w-xs">
                Browse products and add your favorites to the wishlist!
              </p>
              <Button onClick={() => setOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistDialog;
