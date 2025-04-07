
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, LogIn, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authStore } from "@/utils/authUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // For demo, credentials are:
    // owner@debutify.com (Super Admin) or admin@debutify.com (Admin) with any password
    const success = authStore.login(email, password);
    
    setTimeout(() => {
      setLoading(false);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to DeButify admin panel.",
        });
        
        if (authStore.isAdmin()) {
          navigate("/admin");
        } else {
          navigate("/");
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">DeButify Admin</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
              
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md mb-4 flex items-start text-sm">
                <Info className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Demo Credentials:</p>
                  <p>Super Admin: <span className="font-mono bg-amber-100 px-1">owner@debutify.com</span></p>
                  <p>Admin: <span className="font-mono bg-amber-100 px-1">admin@debutify.com</span></p>
                  <p className="text-xs mt-1">Use any password for demo purposes</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@debutify.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-slate-500">
              <span className="flex items-center justify-center">
                <LockKeyhole className="h-4 w-4 mr-1" />
                Admin access only
              </span>
            </div>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => navigate("/")}>
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
