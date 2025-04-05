
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Star, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      toast({
        title: "You're in!",
        description: "Welcome to our exclusive circle of trendsetters.",
      });
      
      setEmail("");
      setIsAnimating(false);
    }, 1500);
  };

  // Create floating sparkles effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'absolute';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.fontSize = `${Math.random() * 20 + 10}px`;
      sparkle.style.opacity = '0';
      sparkle.style.animation = `sparkleAnimation ${Math.random() * 2 + 2}s forwards`;
      sparkle.style.zIndex = '1';
      
      container.appendChild(sparkle);
      
      setTimeout(() => {
        container.removeChild(sparkle);
      }, 4000);
    };
    
    // Add keyframes for sparkle animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes sparkleAnimation {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(90deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Create sparkles at regular intervals
    const interval = setInterval(createSparkle, 300);
    
    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <section className="py-16 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-red-500/20 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className={`bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/30 shadow-xl transition-all duration-1000 ${isAnimating ? 'scale-105 rotate-1' : ''}`}>
            <div className="absolute -top-6 -right-6">
              <div className="relative w-24 h-24">
                <Star className="absolute top-0 left-0 text-yellow-400 w-16 h-16 animate-pulse" />
                <Star className="absolute bottom-0 right-0 text-pink-400 w-12 h-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Join The Style Revolution
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Become part of our exclusive circle and unlock personalized style insights, early access, and special offers.
              </p>
              
              <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                <div className="group flex items-center overflow-hidden bg-background/50 backdrop-blur-sm rounded-full border border-input transition-all hover:border-primary">
                  <Mail className="absolute left-3 h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-0 focus-visible:ring-0 bg-transparent pl-10"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none rounded-r-full group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    <span className="mr-2">Subscribe</span>
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
                
                {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-full animate-pulse"></div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>Weekly style tips</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Early access to drops</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Exclusive offers</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-6">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
