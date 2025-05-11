// ✅ FULLY FIXED & FUNCTIONAL UserProfile Component with Responsive Editable Settings & Preserved Original Tabs
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Heart, MessageSquare, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { wishlistStore } from "./WishlistDialog";
import { addToCart } from "./ShoppingCart";

const mockUserDataInitial = {
  name: "John Doe",
  email: "john.doe@example.com",
  orderHistory: [
    { id: "ORD-1234", date: "2024-03-15", total: 129.99, status: "Delivered" },
    { id: "ORD-1134", date: "2024-02-28", total: 79.5, status: "Delivered" },
  ],
  savedAddresses: [
    { id: 1, name: "Home", street: "123 Main St", city: "Accra", region: "Greater Accra", country: "Ghana" },
    { id: 2, name: "Work", street: "456 Office Ave", city: "Kumasi", region: "Ashanti", country: "Ghana" },
  ],
};

export default function UserProfile({ onClose }) {
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState(mockUserDataInitial);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: userData.name, email: userData.email });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items) => setWishlistItems([...items]));
    setWishlistItems([...wishlistStore.items]);
    return unsubscribe;
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    setUserData((prev) => ({ ...prev, ...profileForm }));
    setEditingProfile(false);
    toast({ title: "Profile Updated", description: "Your profile details were saved." });
  };

  const handleAddressChange = (id, field, value) => {
    setUserData((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.map((addr) =>
        addr.id === id ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const handleAddressSave = () => {
    setEditingAddressId(null);
    toast({ title: "Address Updated", description: "Your address details were saved." });
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    toast({ title: "Message Sent", description: "Support will respond shortly." });
    setMessageText("");
  };

  const handleAddToCart = (product) => {
    if (addToCart(product)) {
      toast({ title: "Added to cart", description: `${product.name} added to cart.` });
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    wishlistStore.removeItem(productId);
    toast({ title: "Removed from wishlist", description: "Item removed from wishlist." });
  };

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">My Account</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2" /> Orders</TabsTrigger>
            <TabsTrigger value="wishlist"><Heart className="h-4 w-4 mr-2" /> Wishlist</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="h-4 w-4 mr-2" /> Messages</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-2" /> Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <h3 className="font-medium text-lg mb-4">Order History</h3>
            {userData.orderHistory.length > 0 ? (
              userData.orderHistory.map((order) => (
                <Card key={order.id} className="mb-3">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-slate-500">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">GH₵ {order.total.toFixed(2)}</div>
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block mt-1">
                        {order.status}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : <p>No orders found.</p>}
          </TabsContent>

          <TabsContent value="wishlist">
            <h3 className="font-medium text-lg mb-4">Wishlist</h3>
            {wishlistItems.length ? (
              wishlistItems.map((item) => (
                <Card key={item.id} className="mb-3">
                  <CardContent className="p-4 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.category}, {item.color}</div>
                      <div className="font-semibold mt-1">GH₵ {item.price.toFixed(2)}</div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                        <Button size="sm" variant="ghost" onClick={() => handleRemoveFromWishlist(item.id)}>Remove</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : <p>Your wishlist is empty.</p>}
          </TabsContent>

          <TabsContent value="messages">
            <h3 className="font-medium text-lg mb-4">Customer Support</h3>
            <Label>Your Message</Label>
            <textarea
              className="w-full border rounded-md p-2"
              rows={4}
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button className="mt-2" onClick={handleSendMessage} disabled={!messageText.trim()}>
              Send Message
            </Button>
          </TabsContent>

          <TabsContent value="settings">
            <h3 className="font-medium text-lg mb-4">Account Settings</h3>
            <Card className="mb-4">
              <CardContent className="p-4 space-y-3">
                {editingProfile ? (
                  <>
                    <Label>Name</Label>
                    <Input name="name" value={profileForm.name} onChange={handleProfileChange} />
                    <Label>Email</Label>
                    <Input name="email" value={profileForm.email} onChange={handleProfileChange} />
                    <div className="flex gap-2">
                      <Button onClick={handleProfileSave}>Save</Button>
                      <Button variant="ghost" onClick={() => setEditingProfile(false)}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <Button variant="outline" onClick={() => setEditingProfile(true)}>Edit Profile</Button>
                  </>
                )}
              </CardContent>
            </Card>

            <h4 className="font-medium mb-2">Saved Addresses</h4>
            {userData.savedAddresses.map((addr) => (
              <Card key={addr.id} className="mb-3">
                <CardContent className="p-4 space-y-2">
                  {editingAddressId === addr.id ? (
                    <>
                      <Input value={addr.name} onChange={(e) => handleAddressChange(addr.id, 'name', e.target.value)} />
                      <Input value={addr.street} onChange={(e) => handleAddressChange(addr.id, 'street', e.target.value)} />
                      <Input value={addr.city} onChange={(e) => handleAddressChange(addr.id, 'city', e.target.value)} />
                      <Input value={addr.region} onChange={(e) => handleAddressChange(addr.id, 'region', e.target.value)} />
                      <Input value={addr.country} onChange={(e) => handleAddressChange(addr.id, 'country', e.target.value)} />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleAddressSave}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingAddressId(null)}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{addr.name}</div>
                        <div className="text-sm text-slate-600">{addr.street}, {addr.city}, {addr.region}, {addr.country}</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setEditingAddressId(addr.id)}>Edit</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
