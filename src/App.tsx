
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import { authStore, PERMISSIONS } from "./utils/authUtils";

const queryClient = new QueryClient();

// Protected route component for admin routes
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  // Check if user is admin and has dashboard permission
  if (authStore.isAdmin() && authStore.hasPermission(PERMISSIONS.VIEW_DASHBOARD)) {
    return <>{element}</>;
  }
  // Redirect to login if not admin
  return <Navigate to="/login" replace />;
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load auth state on initial render
  useEffect(() => {
    authStore.loadFromStorage();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null; // Prevent flash of content before auth is loaded
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
