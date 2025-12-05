import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "./ShoppingCart";

const wishlistItems = [
  {
    id: 5,
    name: "Heritage Timepiece",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    category: "Accessories",
    color: "Rose Gold"
  },
  {
    id: 3,
    name: "Artisan Leather Tote",
    price: 379.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400",
    category: "Accessories",
    color: "Cognac"
  },
  {
    id: 7,
    name: "Silk Evening Gown",
    price: 289.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400",
    category: "Womens",
    color: "Champagne"
  }
];

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
        description: `${productName} has been removed.`,
      });
    }
  };

  const handleAddToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to bag",
        description: `${product.name} has been added to your bag.`,
      });
    }
  };

  const clearWishlist = () => {
    items.forEach(item => {
      wishlistStore.removeItem(item.id);
    });

    toast({
      title: "Wishlist cleared",
      description: "All items have been removed.",
    });
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Heart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-black rounded-full w-5 h-5 text-xs font-medium flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col bg-background border-border p-0">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <DialogTitle className="flex items-center font-serif text-xl">
            <Heart className="mr-3 h-5 w-5 text-amber-500" />
            My Wishlist
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground font-sans">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </DialogTitle>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {items.length > 0 ? (
            <div className="p-6 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="group flex gap-4 p-4 glass rounded-xl hover:bg-amber-500/5 transition-colors"
                >
                  <div className="w-24 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-amber-500 uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-serif font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.color}</p>
                    </div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <button
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 glass rounded-full hover:bg-amber-500/20 hover:text-amber-500 transition-colors"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 space-y-6">
              <div className="glass rounded-full p-8">
                <Heart className="h-12 w-12 text-amber-500/50" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-serif text-xl font-medium">Your wishlist is empty</h3>
                <p className="text-muted-foreground max-w-xs">
                  Save your favorite pieces here and never miss out on what you love.
                </p>
              </div>
              <Button
                onClick={() => setOpen(false)}
                className="btn-luxury rounded-full px-8 py-6"
              >
                <span className="relative z-10">Explore Collection</span>
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            {/* Total Value */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total wishlist value</span>
              <span className="text-xl font-serif font-semibold">${totalValue.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                onClick={clearWishlist}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
              <Button
                className="btn-luxury rounded-full"
                onClick={() => {
                  items.forEach(item => handleAddToCart(item));
                  toast({
                    title: "All items added",
                    description: "Your wishlist items have been added to bag.",
                  });
                }}
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Add All to Bag
                </span>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WishlistDialog;
