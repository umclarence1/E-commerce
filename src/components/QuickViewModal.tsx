import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star, Minus, Plus, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "./ShoppingCart";
import { wishlistStore } from "./WishlistDialog";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  color: string;
  size?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const defaultSizes = ["XS", "S", "M", "L", "XL"];
const defaultColors = ["Black", "White", "Navy", "Camel"];

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  if (!product) return null;

  const sizes = product.sizes || defaultSizes;
  const colors = product.colors || [product.color, ...defaultColors.filter(c => c !== product.color)];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor || product.color,
      quantity
    });
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your bag.`,
    });
    onClose();
  };

  const handleWishlist = () => {
    if (wishlistStore.isInWishlist(product.id)) {
      wishlistStore.removeItem(product.id);
      setIsWishlisted(false);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed.`,
      });
    } else {
      wishlistStore.addItem(product);
      setIsWishlisted(true);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been saved.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-auto p-0 bg-background border-border">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 glass rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-secondary/20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black text-xs font-medium rounded-full">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex-1 space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-500 uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif font-medium">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Discover timeless elegance with this premium piece, crafted with exceptional attention to detail and the finest materials."}
              </p>

              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Color</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedColor || product.color}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.slice(0, 5).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        (selectedColor || product.color) === color
                          ? "bg-amber-500 text-black"
                          : "glass hover:bg-amber-500/10"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-amber-500 text-black"
                          : "glass hover:bg-amber-500/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-sm font-medium block mb-3">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:text-amber-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:text-amber-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    In Stock
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              <Button
                onClick={handleAddToCart}
                className="flex-1 btn-luxury rounded-full py-6 text-base font-medium"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span className="relative z-10">Add to Bag</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-full border-border transition-all ${
                  isWishlisted || wishlistStore.isInWishlist(product.id)
                    ? "bg-amber-500 border-amber-500 text-black"
                    : "hover:border-amber-500 hover:text-amber-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted || wishlistStore.isInWishlist(product.id) ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              {[
                { label: "Free Shipping", sub: "Over $200" },
                { label: "Easy Returns", sub: "30 Days" },
                { label: "Secure", sub: "SSL Encrypted" },
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs font-medium">{badge.label}</p>
                  <p className="text-[10px] text-muted-foreground">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
