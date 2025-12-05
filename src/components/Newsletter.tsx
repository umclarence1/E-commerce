import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, Loader2, ArrowRight, Sparkles } from "lucide-react";
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

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      toast({
        title: "Welcome to the club",
        description: "You'll receive exclusive updates and early access to new collections.",
      });

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

  const benefits = [
    { icon: "01", text: "Early access to new collections" },
    { icon: "02", text: "Exclusive member discounts" },
    { icon: "03", text: "Personalized style recommendations" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                          linear-gradient(90deg, currentColor 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-500 tracking-wider uppercase">
                    Join the Inner Circle
                  </span>
                </div>

                <h2 className="section-title mb-4">
                  Stay Ahead of <span className="text-gradient-gold">Style</span>
                </h2>

                <p className="section-subtitle">
                  Subscribe to receive exclusive access to new arrivals, special offers, and curated style inspiration delivered to your inbox.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center text-amber-500 font-serif text-lg group-hover:bg-amber-500/20 transition-colors">
                      {benefit.icon}
                    </div>
                    <span className="text-foreground/80">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form Card */}
            <div className="relative">
              {/* Decorative Border */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-500/30 via-transparent to-amber-500/30 blur-sm" />

              <div className="relative glass rounded-3xl p-8 md:p-10">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
                      <Mail className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium mb-2">
                      Get Exclusive Access
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Join 50,000+ style enthusiasts
                    </p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        className={`input-luxury h-14 pl-12 pr-4 text-base ${
                          error ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                        disabled={isSubmitting || submitted}
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full btn-luxury rounded-full h-14 text-base font-medium"
                      disabled={isSubmitting || submitted}
                    >
                      {isSubmitting ? (
                        <span className="relative z-10 flex items-center">
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Subscribing...
                        </span>
                      ) : submitted ? (
                        <span className="relative z-10 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Welcome Aboard!
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center">
                          Subscribe Now
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </span>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-center text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-xl font-serif font-semibold text-gradient-gold">50K+</p>
                      <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                      <p className="text-xl font-serif font-semibold text-gradient-gold">Weekly</p>
                      <p className="text-xs text-muted-foreground">Updates</p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                      <p className="text-xl font-serif font-semibold text-gradient-gold">Free</p>
                      <p className="text-xs text-muted-foreground">Forever</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
