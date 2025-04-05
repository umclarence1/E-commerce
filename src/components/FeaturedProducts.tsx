
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

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "https://i.imgur.com/JFHjdNr.jpeg",
    category: "Clothing",
    isNew: true
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image: "https://i.imgur.com/kGu7c6H.jpeg",
    category: "Clothing",
    isNew: true
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://i.imgur.com/2zcsO9y.jpeg",
    category: "Accessories",
    isNew: false
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://i.imgur.com/6oGHzG8.jpeg",
    category: "Electronics",
    isNew: false
  },
  {
    id: 5,
    name: "Minimalist Watch",
    price: 89.99,
    image: "https://i.imgur.com/HqYqLnv.jpeg",
    category: "Accessories",
    isNew: true
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 119.99,
    image: "https://i.imgur.com/iEZCQfz.jpeg",
    category: "Footwear",
    isNew: false
  }
];

const FeaturedProducts = () => {
  const { toast } = useToast();
  
  const addToCart = (productId: number) => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };
  
  const addToWishlist = (productId: number) => {
    toast({
      title: "Added to wishlist",
      description: "This product has been added to your wishlist.",
    });
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
                      onClick={() => addToCart(product.id)}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      onClick={() => addToWishlist(product.id)}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Heart className="h-4 w-4" />
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
                          onClick={() => addToCart(product.id)}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => addToWishlist(product.id)}
                        >
                          <Heart className="h-4 w-4" />
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
