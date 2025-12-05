import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Trash2,
  Sparkles
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const initialCartItems = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 289.99,
    color: "Champagne",
    size: "M",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400",
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 459.99,
    color: "Charcoal",
    size: "L",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400",
  }
];

let globalCartItems = [...initialCartItems];
let globalCartListeners: Function[] = [];

export const updateGlobalCart = (items: typeof initialCartItems) => {
  globalCartItems = [...items];
  globalCartListeners.forEach(listener => listener(globalCartItems));
};

export const addToCart = (product: any) => {
  const existingItemIndex = globalCartItems.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    const updatedItems = [...globalCartItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + 1
    };
    updateGlobalCart(updatedItems);
  } else {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color || "Default",
      size: product.size || "One Size",
      quantity: 1,
      image: product.image
    };
    updateGlobalCart([...globalCartItems, newItem]);
  }

  return true;
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(globalCartItems);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleCartChange = (items: typeof initialCartItems) => {
      setCartItems([...items]);
    };

    globalCartListeners.push(handleCartChange);

    return () => {
      globalCartListeners = globalCartListeners.filter(listener => listener !== handleCartChange);
    };
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    updateGlobalCart(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    updateGlobalCart(updatedItems);

    toast({
      title: "Item removed",
      description: "The item has been removed from your bag.",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    updateGlobalCart([]);

    toast({
      title: "Bag cleared",
      description: "All items have been removed.",
    });
  };

  const checkout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
    });

    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 200 ? 0 : 15.99;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-black rounded-full w-5 h-5 text-xs font-medium flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-border">
        <SheetHeader className="border-b border-border pb-6">
          <SheetTitle className="flex items-center font-serif text-xl">
            <ShoppingBag className="mr-3 h-5 w-5 text-amber-500" />
            Shopping Bag
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground font-sans">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto py-6">
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                    <div className="w-24 h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium font-serif">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.color} · Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center glass rounded-full">
                          <button
                            className="p-2 hover:text-amber-500 transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            className="p-2 hover:text-amber-500 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-6">
              {/* Free Shipping Progress */}
              {subtotal < 200 && (
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Add ${(200 - subtotal).toFixed(2)} for free shipping
                    </span>
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-amber-500' : ''}>
                    {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={checkout}
                  className="w-full btn-luxury rounded-full py-6 text-base font-medium"
                >
                  <span className="relative z-10 flex items-center">
                    Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Clear Bag
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-12">
            <div className="glass rounded-full p-8">
              <ShoppingBag className="h-12 w-12 text-amber-500/50" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-medium">Your bag is empty</h3>
              <p className="text-muted-foreground max-w-xs">
                Discover our curated collection and add your favorites to the bag.
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="btn-luxury rounded-full px-8 py-6"
            >
              <span className="relative z-10">Continue Shopping</span>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
