import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, ShoppingBag, Heart, ArrowRight, X } from "lucide-react";
import { addToCart } from "./ShoppingCart";
import { wishlistStore } from "./WishlistDialog";

const searchDatabase = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 289.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400",
    category: "Womens",
    color: "Champagne"
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400",
    category: "Mens",
    color: "Charcoal"
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
    id: 4,
    name: "Heritage Timepiece",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    category: "Accessories",
    color: "Rose Gold"
  },
  {
    id: 5,
    name: "Cashmere Blend Coat",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=400",
    category: "Womens",
    color: "Camel"
  },
  {
    id: 6,
    name: "Italian Leather Loafers",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=400",
    category: "Footwear",
    color: "Burgundy"
  }
];

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(searchDatabase);
  const { toast } = useToast();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(searchDatabase);
      return;
    }

    const filtered = searchDatabase.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (addToCart(product)) {
      toast({
        title: "Added to bag",
        description: `${product.name} has been added to your bag.`,
      });
    }
  };

  const handleAddToWishlist = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();

    if (wishlistStore.isInWishlist(product.id)) {
      wishlistStore.removeItem(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed.`,
      });
    } else {
      wishlistStore.addItem(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been saved.`,
      });
    }
  };

  const viewProductDetails = (product: any) => {
    toast({
      title: "Viewing product",
      description: `Now viewing ${product.name}`,
    });

    setOpen(false);
  };

  const popularSearches = ["Silk", "Leather", "Cashmere", "Evening", "Italian"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col bg-background border-border p-0">
        {/* Search Header */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="w-full h-14 pl-12 pr-12 bg-secondary/50 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-muted-foreground"
              placeholder="Search for products, categories, or colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 glass rounded-full text-xs hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-auto p-6">
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass rounded-full p-6 inline-block mb-4">
                <Search className="h-8 w-8 text-amber-500/50" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground text-sm">
                Try searching for "{popularSearches[0]}" or "{popularSearches[1]}"
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="group flex items-center gap-4 p-3 glass rounded-xl cursor-pointer hover:bg-amber-500/5 transition-all duration-300"
                    onClick={() => viewProductDetails(product)}
                  >
                    <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-amber-500 uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h4 className="font-serif font-medium truncate group-hover:text-amber-500 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{product.color}</p>
                      <p className="font-semibold mt-1">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 glass rounded-full hover:bg-amber-500/20 hover:text-amber-500 transition-colors"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-2 rounded-full transition-colors ${
                          wishlistStore.isInWishlist(product.id)
                            ? 'bg-amber-500 text-black'
                            : 'glass hover:bg-amber-500/20 hover:text-amber-500'
                        }`}
                        onClick={(e) => handleAddToWishlist(product, e)}
                      >
                        <Heart className={`h-4 w-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-secondary/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-background rounded text-[10px]">Enter</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-background rounded text-[10px]">Esc</kbd>
                to close
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-background rounded text-[10px]">Ctrl</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-[10px]">K</kbd>
              to search
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
