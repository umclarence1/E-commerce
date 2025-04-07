
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, User, Heart, MessageSquare, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { wishlistStore } from "./WishlistDialog";
import { addToCart } from "./ShoppingCart";

// Mock user data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  orderHistory: [
    { id: "ORD-1234", date: "2024-03-15", total: 129.99, status: "Delivered" },
    { id: "ORD-1134", date: "2024-02-28", total: 79.50, status: "Delivered" },
  ],
  savedAddresses: [
    { id: 1, name: "Home", street: "123 Main St", city: "Accra", region: "Greater Accra", country: "Ghana" },
    { id: 2, name: "Work", street: "456 Office Ave", city: "Kumasi", region: "Ashanti", country: "Ghana" },
  ]
};

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [messageText, setMessageText] = useState("");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const { toast } = useToast();

  // Subscribe to wishlist changes
  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items: any[]) => {
      setWishlistItems([...items]);
    });
    
    // Initial load
    setWishlistItems([...wishlistStore.items]);
    
    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    toast({
      title: "Message Sent",
      description: "Your message has been sent to our support team.",
    });
    
    setMessageText("");
  };
  
  const handleAddToCart = (product: any) => {
    if (addToCart(product)) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const handleRemoveFromWishlist = (productId: number) => {
    wishlistStore.removeItem(productId);
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  };

  return (
    <Dialog defaultOpen onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">My Account</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-0">
            <h3 className="font-medium text-lg mb-4">Order History</h3>
            {mockUserData.orderHistory.length > 0 ? (
              <div className="space-y-4">
                {mockUserData.orderHistory.map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-slate-500">{order.date}</div>
                        </div>
                        <div>
                          <div className="font-bold">GH₵ {order.total.toFixed(2)}</div>
                          <div className={`text-xs px-2 py-1 rounded-full text-center ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : order.status === "Shipped" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                <p className="text-slate-500 mt-1">Once you make a purchase, your orders will appear here.</p>
                <Button className="mt-4" onClick={onClose}>Start Shopping</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-0">
            <h3 className="font-medium text-lg mb-4">Wishlist</h3>
            {wishlistItems.length > 0 ? (
              <div className="space-y-4">
                {wishlistItems.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-slate-500 mb-1">
                            {item.category}, {item.color}
                          </p>
                          <p className="font-medium">GH₵ {item.price.toFixed(2)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                <p className="text-slate-500 mt-1">
                  Items added to your wishlist will appear here. To add items, click the heart icon on a product.
                </p>
                <Button className="mt-4" onClick={onClose}>Browse Products</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="messages" className="mt-0">
            <h3 className="font-medium text-lg mb-4">Customer Support</h3>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.
              </p>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea 
                  rows={4} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                ></textarea>
                <Button 
                  className="mt-2" 
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Email: support@debutify.com<br />
                  Phone: +233 123 456 7890<br />
                  Hours: Monday - Friday, 9AM - 5PM GMT
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Account Information</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Name</span>
                        <span>{mockUserData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Email</span>
                        <span>{mockUserData.email}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Saved Addresses</h3>
                <div className="space-y-4">
                  {mockUserData.savedAddresses.map(address => (
                    <Card key={address.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{address.name}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {address.street}<br />
                              {address.city}, {address.region}<br />
                              {address.country}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
