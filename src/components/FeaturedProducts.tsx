
import { useState, useEffect } from "react";
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
import { wishlistStore } from "./WishlistDialog";

// Mock product data for Ghana-specific items
const products = [
  {
    id: 1,
    name: "Ankara Print T-Shirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?q=80&w=1000",
    category: "Clothing",
    color: "Multicolor",
    size: "M",
    isNew: true
  },
  {
    id: 2,
    name: "Kente Pocket Square",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?q=80&w=1000",
    category: "Accessories",
    color: "Traditional",
    size: "One Size",
    isNew: true
  },
  {
    id: 3,
    name: "Handcrafted Leather Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
    category: "Accessories",
    color: "Brown",
    size: "One Size",
    isNew: false
  },
  {
    id: 4,
    name: "African Print Face Mask",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1598887142487-3c854d2171c7?q=80&w=1000",
    category: "Accessories",
    color: "Mixed",
    size: "One Size",
    isNew: false
  },
  {
    id: 5,
    name: "Bamboo Sunglasses",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281ef11?q=80&w=1000",
    category: "Accessories",
    color: "Wood Brown",
    size: "One Size",
    isNew: true
  },
  {
    id: 6,
    name: "African Print Sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000",
    category: "Footwear",
    color: "Pattern",
    size: "42",
    isNew: false
  }
];

const FeaturedProducts = () => {
  const { toast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  
  // Subscribe to wishlist changes
  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items: any[]) => {
      setWishlistIds(items.map(item => item.id));
    });
    
    return unsubscribe;
  }, []);
  
  const addProductToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const toggleWishlist = (product: any) => {
    const productId = product.id;
    const productName = product.name;
    
    if (wishlistStore.isInWishlist(productId)) {
      wishlistStore.removeItem(productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } else {
      wishlistStore.addItem(product);
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
                      onClick={() => toggleWishlist(product)}
                      className={`${wishlistStore.isInWishlist(product.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-black hover:bg-white/90'}`}
                    >
                      <Heart className={`h-4 w-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <h3 className="font-medium mt-1">{product.name}</h3>
                  <div className="mt-2 font-semibold">GH₵ {product.price.toFixed(2)}</div>
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
                      <div className="mt-2 font-semibold">GH₵ {product.price.toFixed(2)}</div>
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
                          onClick={() => toggleWishlist(product)}
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
