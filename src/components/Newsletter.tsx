
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast({
        title: "Successfully subscribed!",
        description: "You've joined our exclusive circle of trendsetters.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
                Join Our Style Community
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                Get exclusive access to new collections, personalized recommendations, and special offers.
              </p>
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                <div className={`flex items-center overflow-hidden bg-white dark:bg-slate-900 rounded-lg border ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} transition-all hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30`}>
                  <Mail className="ml-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className="flex-1 border-0 focus-visible:ring-0 bg-transparent pl-2"
                    disabled={isSubmitting || submitted}
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none text-white"
                    disabled={isSubmitting || submitted}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>Subscribing</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Subscribed</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </Button>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm mt-2 absolute">
                    {error}
                  </p>
                )}
              </form>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-slate-700 dark:text-slate-200">Weekly style tips</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-slate-700 dark:text-slate-200">Early access to drops</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-700/50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-slate-700 dark:text-slate-200">Exclusive offers</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-8">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
