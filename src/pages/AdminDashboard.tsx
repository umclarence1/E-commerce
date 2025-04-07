
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowUpRight, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  BarChart3, 
  LogOut, 
  Shield, 
  Settings,
  Bell,
  AlertTriangle
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { authStore, PERMISSIONS } from "@/utils/authUtils";
import AdminAnalytics from "@/components/AdminAnalytics";
import AdminUserManagement from "@/components/AdminUserManagement";

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
  },
  notifications: [
    { id: 1, title: "New Order", message: "Order #ORD-1237 has been placed", time: "10 minutes ago", read: false, type: "order" },
    { id: 2, title: "Low Stock Alert", message: "Kente Cloth Handmade is running low on stock", time: "1 hour ago", read: false, type: "inventory" },
    { id: 3, title: "New Message", message: "Kofi Mensah has sent you a message", time: "3 hours ago", read: true, type: "message" },
    { id: 4, title: "Payment Failed", message: "Payment for order #ORD-1235 has failed", time: "5 hours ago", read: true, type: "payment" },
  ]
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState(mockDatabase.messages);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [notifications, setNotifications] = useState(mockDatabase.notifications);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isAdmin()) {
      navigate("/login");
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel.",
    });
  };

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
    toast({
      title: "Reply sent",
      description: `Your reply has been sent to ${email}.`,
    });
    setReplyTo(null);
    setReplyMessage("");
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read.",
    });
  };
  
  const handleMarkNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Check permissions
  const canViewDashboard = authStore.hasPermission(PERMISSIONS.VIEW_DASHBOARD);
  const canManageProducts = authStore.hasPermission(PERMISSIONS.MANAGE_PRODUCTS);
  const canManageOrders = authStore.hasPermission(PERMISSIONS.MANAGE_ORDERS);
  const canManageUsers = authStore.hasPermission(PERMISSIONS.MANAGE_USERS);
  const canManageMessages = authStore.hasPermission(PERMISSIONS.MANAGE_MESSAGES);
  const canManageSettings = authStore.hasPermission(PERMISSIONS.MANAGE_SETTINGS);

  if (!canViewDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-600">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You don't have permission to access the admin dashboard.</p>
            <Button onClick={handleLogout} className="w-full">Return to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <header className="bg-white dark:bg-slate-800 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">DeButify Admin</h1>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="relative">
                          <Bell className="h-4 w-4" />
                          {unreadNotificationsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                              {unreadNotificationsCount}
                            </span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      Notifications
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs" 
                      onClick={markAllNotificationsAsRead}
                      disabled={unreadNotificationsCount === 0}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <DropdownMenuItem 
                          key={notification.id} 
                          className={`py-3 px-4 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                          onClick={() => handleMarkNotificationAsRead(notification.id)}
                        >
                          <div className="flex gap-3 items-start w-full">
                            <div className={`rounded-full p-2 ${
                              notification.type === 'order' ? 'bg-green-100 text-green-600' :
                              notification.type === 'inventory' ? 'bg-amber-100 text-amber-600' :
                              notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {notification.type === 'order' && <ShoppingBag className="h-4 w-4" />}
                              {notification.type === 'inventory' && <AlertTriangle className="h-4 w-4" />}
                              {notification.type === 'message' && <MessageSquare className="h-4 w-4" />}
                              {notification.type === 'payment' && <ArrowUpRight className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{notification.title}</div>
                              <div className="text-sm text-muted-foreground">{notification.message}</div>
                              <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {authStore.currentUser?.role.charAt(0).toUpperCase() + authStore.currentUser?.role.slice(1).replace('_', ' ')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {authStore.currentUser?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{authStore.currentUser?.name}</div>
                      <div className="text-xs text-muted-foreground">{authStore.currentUser?.email}</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              {canManageProducts && (
                <Button 
                  variant={activeTab === "products" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("products")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Products
                </Button>
              )}
              {canManageOrders && (
                <Button 
                  variant={activeTab === "orders" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("orders")}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Orders
                </Button>
              )}
              {canManageUsers && (
                <Button 
                  variant={activeTab === "customers" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("customers")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Customers
                </Button>
              )}
              {canManageMessages && (
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
              )}
              {canManageSettings && (
                <Button 
                  variant={activeTab === "settings" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              )}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-8" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            {activeTab === "overview" && (
              <AdminAnalytics />
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
              <AdminUserManagement />
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
            
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your store to external e-commerce platforms for product synchronization.
                      </p>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                              <img src="https://jumia.com.gh/assets/favicons/favicon-192.png" alt="Jumia" className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">Jumia Ghana</h3>
                              <p className="text-xs text-muted-foreground">Connected on April 1, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                              <ShoppingBag className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Connect New Platform</h3>
                              <p className="text-xs text-muted-foreground">Sync with another e-commerce platform</p>
                            </div>
                          </div>
                          <Button size="sm">Connect</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Export your store data for backup or analysis.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="outline" size="sm">Export Products</Button>
                        <Button variant="outline" size="sm">Export Orders</Button>
                        <Button variant="outline" size="sm">Export Customers</Button>
                        <Button variant="outline" size="sm">Full Backup</Button>
                      </div>
                    </CardContent>
                  </Card>
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
