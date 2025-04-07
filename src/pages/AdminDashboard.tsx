
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Users, ShoppingBag, MessageSquare, BarChart3 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock database for products, users, messages, and orders
const mockDatabase = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "2023-10-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "2023-11-22" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", dateJoined: "2024-01-05" },
  ],
  messages: [
    { id: 1, name: "David Brown", email: "david@example.com", message: "I'm having issues with my order #1234. Can you please help?", date: "2024-03-25", read: false },
    { id: 2, name: "Sarah Lee", email: "sarah@example.com", message: "When will you restock the black leather bag?", date: "2024-03-24", read: true },
    { id: 3, name: "Michael Wong", email: "michael@example.com", message: "Is there a discount code for first-time buyers?", date: "2024-03-23", read: true },
  ],
  orders: [
    { id: "ORD-1234", customer: "John Doe", date: "2024-03-20", amount: 129.99, status: "Delivered" },
    { id: "ORD-1235", customer: "Jane Smith", date: "2024-03-22", amount: 89.50, status: "Processing" },
    { id: "ORD-1236", customer: "Robert Johnson", date: "2024-03-25", amount: 210.75, status: "Shipped" },
  ],
  metrics: {
    totalSales: 12580,
    totalUsers: 583,
    totalProducts: 124,
    totalOrders: 298,
  }
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState(mockDatabase.messages);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const { toast } = useToast();

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map(message => 
      message.id === messageId ? { ...message, read: true } : message
    ));
    toast({
      title: "Message marked as read",
      description: "The message has been marked as read.",
    });
  };

  const handleReply = (messageId: number) => {
    if (replyTo === messageId) {
      setReplyTo(null);
    } else {
      setReplyTo(messageId);
      setReplyMessage("");
    }
  };

  const sendReply = (email: string) => {
    // In a real application, this would send an email
    toast({
      title: "Reply sent",
      description: `Your reply has been sent to ${email}.`,
    });
    setReplyTo(null);
    setReplyMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <header className="bg-white dark:bg-slate-800 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">DeButify Admin</h1>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Return to Site
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Dashboard</h2>
            <nav className="space-y-2">
              <Button 
                variant={activeTab === "overview" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button 
                variant={activeTab === "products" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("products")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Products
              </Button>
              <Button 
                variant={activeTab === "orders" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("orders")}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button 
                variant={activeTab === "customers" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("customers")}
              >
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Button>
              <Button 
                variant={activeTab === "messages" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {messages.filter(m => !m.read).length}
                  </span>
                )}
              </Button>
            </nav>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Sales
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">GH₵ {mockDatabase.metrics.totalSales.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mockDatabase.metrics.totalUsers}</div>
                      <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mockDatabase.metrics.totalProducts}</div>
                      <p className="text-xs text-muted-foreground mt-1">+5 new this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mockDatabase.metrics.totalOrders}</div>
                      <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 font-medium text-sm p-4 bg-slate-50 dark:bg-slate-800 border-b">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  {mockDatabase.orders.map(order => (
                    <div key={order.id} className="grid grid-cols-4 text-sm p-4 border-b last:border-0">
                      <div>{order.id}</div>
                      <div>{order.customer}</div>
                      <div>GH₵ {order.amount.toFixed(2)}</div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Shipped" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "messages" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Customer Messages</h2>
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map(message => (
                      <div key={message.id} className={`p-4 rounded-lg border ${message.read ? 'bg-white dark:bg-slate-800' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{message.name}</div>
                          <div className="text-sm text-slate-500">{message.date}</div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">{message.email}</div>
                        <p className="my-2">{message.message}</p>
                        <div className="flex space-x-2 mt-3">
                          {!message.read && (
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(message.id)}>
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="default" size="sm" onClick={() => handleReply(message.id)}>
                            {replyTo === message.id ? "Cancel Reply" : "Reply"}
                          </Button>
                        </div>
                        
                        {replyTo === message.id && (
                          <div className="mt-4">
                            <Textarea 
                              placeholder="Type your reply here..." 
                              className="mb-2" 
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                            />
                            <Button 
                              disabled={!replyMessage.trim()} 
                              onClick={() => sendReply(message.email)}
                            >
                              Send Reply
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
                      <h3 className="mt-4 text-lg font-medium">No messages</h3>
                      <p className="text-slate-500 mt-1">You don't have any customer messages.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === "customers" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Customers</h2>
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 font-medium text-sm p-4 bg-slate-50 dark:bg-slate-800 border-b">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Date Joined</div>
                  </div>
                  {mockDatabase.users.map(user => (
                    <div key={user.id} className="grid grid-cols-3 text-sm p-4 border-b last:border-0">
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>{user.dateJoined}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "products" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Products Management</h2>
                <p className="text-slate-500 mb-6">
                  This section will allow you to add, edit, and remove products from your store.
                </p>
                <Button>Add New Product</Button>
              </div>
            )}
            
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Orders</h2>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 font-medium text-sm p-4 bg-slate-50 dark:bg-slate-800 border-b">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  {mockDatabase.orders.map(order => (
                    <div key={order.id} className="grid grid-cols-4 text-sm p-4 border-b last:border-0">
                      <div>{order.id}</div>
                      <div>{order.customer}</div>
                      <div>GH₵ {order.amount.toFixed(2)}</div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Shipped" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
