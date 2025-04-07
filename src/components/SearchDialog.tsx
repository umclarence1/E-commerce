
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { addToCart } from "./ShoppingCart";

// Search database (mock data)
const searchDatabase = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    category: "Clothing",
    color: "Black"
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
    category: "Clothing",
    color: "Blue"
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
    category: "Accessories",
    color: "Brown"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
    category: "Electronics",
    color: "Black"
  },
  {
    id: 5,
    name: "Minimalist Watch",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    category: "Accessories",
    color: "Silver"
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
    category: "Footwear",
    color: "White"
  },
  {
    id: 7,
    name: "Women's Summer Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000",
    category: "Women's Fashion",
    color: "Floral"
  },
  {
    id: 8,
    name: "Men's Casual Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
    category: "Men's Fashion",
    color: "Navy"
  }
];

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(searchDatabase);
  const { toast } = useToast();

  // Filter results based on search query
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

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (addToCart(product)) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleAddToWishlist = (productId: number, productName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${productName} has been added to your wishlist.`,
    });
  };

  const viewProductDetails = (product: any) => {
    toast({
      title: "Viewing product",
      description: `Now viewing ${product.name}`,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="mb-4">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Search for products, categories, or colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-auto">
            {searchResults.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center border rounded-md overflow-hidden hover:bg-accent cursor-pointer p-2"
                    onClick={() => viewProductDetails(product)}
                  >
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                      <div className="font-semibold mt-1">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => handleAddToWishlist(product.id, product.name, e)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
