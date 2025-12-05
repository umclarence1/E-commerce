import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Eye, ArrowRight, Star } from "lucide-react";
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
import QuickViewModal from "./QuickViewModal";

const products = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 289.99,
    originalPrice: 359.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
    category: "womens",
    color: "Champagne",
    size: "M",
    isNew: true,
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
    category: "mens",
    color: "Charcoal",
    size: "L",
    isNew: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: "Artisan Leather Tote",
    price: 379.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
    category: "accessories",
    color: "Cognac",
    size: "One Size",
    isNew: false,
    rating: 5.0,
    reviews: 256
  },
  {
    id: 4,
    name: "Cashmere Blend Coat",
    price: 599.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800",
    category: "womens",
    color: "Camel",
    size: "S",
    isNew: false,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 5,
    name: "Heritage Timepiece",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
    category: "accessories",
    color: "Rose Gold",
    size: "One Size",
    isNew: true,
    rating: 4.9,
    reviews: 342
  },
  {
    id: 6,
    name: "Italian Leather Loafers",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800",
    category: "footwear",
    color: "Burgundy",
    size: "42",
    isNew: false,
    rating: 4.8,
    reviews: 198
  }
];

interface FeaturedProductsProps {
  activeCategory?: string;
  filteredProductIds?: number[];
}

const FeaturedProducts = ({ activeCategory = 'all', filteredProductIds }: FeaturedProductsProps) => {
  const { toast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  useEffect(() => {
    if (activeCategory === 'all' && !filteredProductIds) {
      setDisplayedProducts(products);
    } else if (filteredProductIds && filteredProductIds.length) {
      setDisplayedProducts(products.filter(product => filteredProductIds.includes(product.id)));
    } else {
      setDisplayedProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, filteredProductIds]);

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items: any[]) => {
      setWishlistIds(items.map(item => item.id));
    });
    return unsubscribe;
  }, []);

  const addProductToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to bag",
        description: `${product.name} has been added to your shopping bag.`,
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
        description: `${productName} has been saved to your wishlist.`,
      });
    }
  };

  if (displayedProducts.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="section-title mb-4">Featured Collection</h2>
            <div className="divider-gold mb-8" />
          </div>
          <div className="text-center py-20">
            <div className="glass rounded-full p-8 inline-block mb-6">
              <ShoppingBag className="h-16 w-16 text-amber-500/50" />
            </div>
            <h3 className="text-2xl font-serif mb-3">No products found</h3>
            <p className="text-muted-foreground">No products match the current filter criteria.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
              Curated Selection
            </p>
            <h2 className="section-title">
              Featured <span className="text-gradient-gold">Collection</span>
            </h2>
            <p className="section-subtitle mt-4 max-w-md">
              Handpicked pieces that define modern elegance and timeless style
            </p>
          </div>
          <Button
            variant="ghost"
            className="mt-6 md:mt-0 group text-foreground hover:text-amber-500 transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-card bg-card">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-amber-500 text-black text-xs font-medium tracking-wider uppercase rounded-full">
                        New
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/90 text-foreground text-xs font-medium rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        wishlistStore.isInWishlist(product.id)
                          ? 'bg-amber-500 text-black'
                          : 'glass hover:bg-amber-500/20'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => openQuickView(product)}
                      className="p-3 glass rounded-full hover:bg-amber-500/20 transition-all duration-300"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-500 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Button
                      onClick={() => addProductToCart(product)}
                      className="w-full btn-luxury rounded-full py-6 font-medium"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      <span className="relative z-10">Add to Bag</span>
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium group-hover:text-amber-500 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {product.color} · {product.size}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {displayedProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-4 basis-[85%]">
                  <div className="product-card bg-card">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.isNew && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black text-xs font-medium tracking-wider uppercase rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => addProductToCart(product)}
                          className="flex-1 btn-luxury rounded-full"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          <span className="relative z-10">Add to Bag</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleWishlist(product)}
                          className={`rounded-full border-border ${
                            wishlistStore.isInWishlist(product.id) ? 'bg-amber-500 border-amber-500 text-black' : ''
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${wishlistStore.isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static border-border hover:bg-amber-500/10 hover:border-amber-500" />
              <CarouselNext className="relative static border-border hover:bg-amber-500/10 hover:border-amber-500" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </section>
  );
};

export default FeaturedProducts;
