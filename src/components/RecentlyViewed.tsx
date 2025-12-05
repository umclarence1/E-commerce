import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "./ShoppingCart";
import { wishlistStore } from "./WishlistDialog";
import QuickViewModal from "./QuickViewModal";

const allProducts = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 289.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400",
    category: "Womens",
    color: "Champagne",
    description: "Elegant silk evening gown perfect for special occasions"
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400",
    category: "Mens",
    color: "Charcoal",
    description: "Classic tailored blazer crafted from premium Italian wool"
  },
  {
    id: 3,
    name: "Artisan Leather Tote",
    price: 379.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400",
    category: "Accessories",
    color: "Cognac",
    description: "Handcrafted leather tote with artisan detailing"
  },
  {
    id: 4,
    name: "Cashmere Wrap Coat",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=400",
    category: "Womens",
    color: "Camel",
    description: "Luxurious cashmere wrap coat for elegant warmth"
  },
  {
    id: 5,
    name: "Heritage Timepiece",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    category: "Accessories",
    color: "Rose Gold",
    description: "Swiss-made timepiece with heritage craftsmanship"
  },
  {
    id: 6,
    name: "Italian Leather Loafers",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=400",
    category: "Footwear",
    color: "Burgundy",
    description: "Classic Italian leather loafers with timeless design"
  }
];

// Store for recently viewed items
export const recentlyViewedStore = {
  items: [] as number[],
  listeners: [] as Function[],
  maxItems: 6,

  addItem(productId: number) {
    // Remove if already exists
    this.items = this.items.filter(id => id !== productId);
    // Add to beginning
    this.items.unshift(productId);
    // Keep only max items
    if (this.items.length > this.maxItems) {
      this.items = this.items.slice(0, this.maxItems);
    }
    this.notifyListeners();
  },

  getItems() {
    return this.items;
  },

  getProducts() {
    return this.items
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean);
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

// Simulate some recently viewed items for demo
if (recentlyViewedStore.items.length === 0) {
  [3, 1, 5, 2].forEach(id => recentlyViewedStore.addItem(id));
}

const RecentlyViewed = () => {
  const [viewedItems, setViewedItems] = useState<number[]>(recentlyViewedStore.items);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = recentlyViewedStore.subscribe((items: number[]) => {
      setViewedItems([...items]);
    });
    return unsubscribe;
  }, []);

  const products = viewedItems
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  if (products.length === 0) return null;

  const handleAddToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to bag",
        description: `${product.name} has been added to your bag.`,
      });
    }
  };

  const handleAddToWishlist = (product: any) => {
    if (wishlistStore.addItem(product)) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} saved to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already saved.`,
      });
    }
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('recently-viewed-scroll');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium">Recently Viewed</h2>
              <p className="text-sm text-muted-foreground">Pick up where you left off</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full glass hover:bg-amber-500/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full glass hover:bg-amber-500/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          id="recently-viewed-scroll"
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product: any) => (
            <div
              key={product.id}
              className="group flex-shrink-0 w-[280px] snap-start"
            >
              <div className="glass rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 btn-luxury rounded-full h-10"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        <span className="relative z-10">Add to Bag</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-10 w-10 glass"
                        onClick={() => handleQuickView(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
                      wishlistStore.isInWishlist(product.id)
                        ? 'bg-amber-500 text-black'
                        : 'glass opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-amber-500 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-serif font-medium mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.color}</p>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setQuickViewProduct(null);
          }}
        />
      )}
    </section>
  );
};

export default RecentlyViewed;
