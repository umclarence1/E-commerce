import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LockKeyhole, LogIn, AlertCircle, Info, ArrowLeft, Sparkles } from "lucide-react";
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

    const success = authStore.login(email, password);

    setTimeout(() => {
      setLoading(false);

      if (success) {
        toast({
          title: "Welcome back",
          description: "Successfully logged into Debutify admin.",
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
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to Store</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-serif font-medium leading-tight">
              Welcome to<br />
              <span className="text-gradient-gold">Debutify</span> Admin
            </h1>
            <p className="text-white/60 max-w-md">
              Manage your premium e-commerce platform with our powerful admin dashboard.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-amber-500/20 backdrop-blur"
                  />
                ))}
              </div>
              <span className="text-sm text-white/60">
                Trusted by 500+ brands worldwide
              </span>
            </div>
          </div>

          <div className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Debutify. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <Link to="/">
              <h1 className="text-2xl font-serif font-semibold tracking-tight">
                <span className="text-foreground">DEBU</span>
                <span className="text-gradient-gold">TIFY</span>
              </h1>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500 tracking-wider uppercase">
                Admin Portal
              </span>
            </div>
            <h2 className="text-3xl font-serif font-medium mb-2">Sign In</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 glass rounded-xl border border-red-500/20 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="glass-gold rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-amber-500">Demo Credentials</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      Super Admin: <code className="px-2 py-0.5 bg-amber-500/10 rounded text-amber-500">owner@debutify.com</code>
                    </p>
                    <p>
                      Admin: <code className="px-2 py-0.5 bg-amber-500/10 rounded text-amber-500">admin@debutify.com</code>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground/60">
                    Use any password for demo purposes
                  </p>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="admin@debutify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-luxury w-full h-14"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <button
                  type="button"
                  className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-luxury w-full h-14"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-luxury rounded-full h-14 text-base font-medium"
              disabled={loading}
            >
              {loading ? (
                <span className="relative z-10 flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="relative z-10 flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <LockKeyhole className="h-4 w-4" />
              <span>Admin access only</span>
            </div>

            <div className="lg:hidden">
              <Link
                to="/"
                className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
              >
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
