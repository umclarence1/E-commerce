import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  ChevronRight,
  Truck,
  RefreshCw,
  ShieldCheck,
  Minus,
  Plus
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
  name: "Silk Blend Evening Dress",
  price: 459.99,
  description: "Exquisitely crafted from premium silk blend fabric, this evening dress embodies timeless elegance. The flowing silhouette drapes beautifully, while meticulous attention to detail ensures a flawless fit. Perfect for galas, formal dinners, or any occasion that demands sophistication.",
  images: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000"
  ],
  rating: 4.9,
  reviews: 248,
  colors: ["Champagne", "Midnight", "Rose", "Ivory"],
  sizes: ["XS", "S", "M", "L", "XL"],
  inStock: true
};

const ProductDetail = ({ product = defaultProduct }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to bag",
      description: `${product.name} - ${selectedColor}, Size ${selectedSize} x${quantity}`,
    });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been saved to your wishlist.`,
    });
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const features = [
    { icon: Truck, title: "Complimentary Shipping", description: "Free express shipping on orders over $200" },
    { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy for your peace of mind" },
    { icon: ShieldCheck, title: "Secure Shopping", description: "SSL encryption protects your information" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary/20 group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Sale Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-amber-500 text-black text-sm font-medium rounded-full">
                  New Season
                </span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    mainImage === image
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-transparent hover:border-amber-500/50'
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
              <ChevronRight className="h-4 w-4" />
              <a href="/products" className="hover:text-amber-500 transition-colors">Women</a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Dresses</span>
            </nav>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">{product.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-semibold">${product.price.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground line-through">$599.99</span>
              <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-sm font-medium rounded">
                23% OFF
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Color</h3>
                <span className="text-sm text-muted-foreground">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedColor === color
                        ? 'bg-amber-500 text-black'
                        : 'glass hover:bg-amber-500/10 hover:text-amber-500'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <button className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`w-14 h-14 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-amber-500 text-black'
                        : 'glass hover:bg-amber-500/10 hover:text-amber-500'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center glass rounded-full">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-3 hover:text-amber-500 transition-colors disabled:opacity-50"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:text-amber-500 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 btn-luxury rounded-full py-7 text-base font-medium"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span className="relative z-10">Add to Bag</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`w-14 h-14 rounded-full border-border transition-all duration-300 ${
                  isWishlisted ? 'bg-amber-500 border-amber-500 text-black' : 'hover:border-amber-500 hover:text-amber-500'
                }`}
                onClick={handleAddToWishlist}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-border hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid gap-4 pt-8 border-t border-border">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
