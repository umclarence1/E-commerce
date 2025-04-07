
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart as CartIcon, 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Trash2 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    color: "Black",
    size: "M",
    quantity: 1,
    image: "https://i.imgur.com/JFHjdNr.jpeg",
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    color: "Blue",
    size: "32",
    quantity: 1,
    image: "https://i.imgur.com/kGu7c6H.jpeg",
  }
];

// Create a global cart state
let globalCartItems = [...initialCartItems];
let globalCartListeners: Function[] = [];

// Function to update global cart
export const updateGlobalCart = (items: typeof initialCartItems) => {
  globalCartItems = [...items];
  globalCartListeners.forEach(listener => listener(globalCartItems));
};

// Function to add item to cart
export const addToCart = (product: any) => {
  const existingItemIndex = globalCartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // If item exists, increase quantity
    const updatedItems = [...globalCartItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + 1
    };
    updateGlobalCart(updatedItems);
  } else {
    // If item doesn't exist, add it with quantity 1
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

  // Subscribe to global cart changes
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
      description: "The item has been removed from your cart.",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    updateGlobalCart([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const checkout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would normally redirect to a checkout page.",
    });
    
    // Close the cart drawer after a short delay
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {item.color}, Size {item.size}
                      </div>
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-500 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button onClick={checkout}>
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6">
              <ShoppingBag className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="font-medium text-xl">Your cart is empty</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
