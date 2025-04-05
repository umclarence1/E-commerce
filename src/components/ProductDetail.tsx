
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  ChevronRight, 
  Truck, 
  RefreshCw, 
  ShieldCheck,
  MinusCircle,
  PlusCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product?: {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    rating: number;
    reviews: number;
    colors: string[];
    sizes: string[];
    inStock: boolean;
  }
}

const defaultProduct = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  description: "Crafted from high-quality 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. The breathable fabric ensures all-day comfort, while the modern fit complements any style. Perfect for casual outings or relaxed days at home.",
  images: [
    "https://i.imgur.com/JFHjdNr.jpeg",
    "https://i.imgur.com/kGu7c6H.jpeg",
    "https://i.imgur.com/2zcsO9y.jpeg",
    "https://i.imgur.com/6oGHzG8.jpeg"
  ],
  rating: 4.8,
  reviews: 124,
  colors: ["Black", "White", "Navy", "Gray"],
  sizes: ["XS", "S", "M", "L", "XL"],
  inStock: true
};

const ProductDetail = ({ product = defaultProduct }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedColor}, Size ${selectedSize} x${quantity}`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-700">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border cursor-pointer transition-all ${mainImage === image ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200 dark:border-slate-700'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight className="h-3 w-3" />
              <a href="/products" className="hover:text-primary">Products</a>
              <ChevronRight className="h-3 w-3" />
              <span>T-Shirts</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">({product.reviews} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {product.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`px-4 py-2 rounded-md border ${selectedColor === color ? 'border-primary bg-primary/10' : 'border-slate-200 dark:border-slate-700'}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`w-12 h-12 flex items-center justify-center rounded-md border ${selectedSize === size ? 'border-primary bg-primary/10' : 'border-slate-200 dark:border-slate-700'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4 mb-8">
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Free standard shipping on orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <RefreshCw className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Easy Returns</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Return within 30 days for a full refund</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure Shopping</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your data is protected with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
