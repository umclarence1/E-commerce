import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";

const promos = [
  { text: "New Season Collection Now Available", highlight: "SHOP NOW" },
  { text: "Free Shipping on Orders Over $200", highlight: "LIMITED TIME" },
  { text: "Use Code WELCOME15 for 15% Off Your First Order", highlight: "NEW CUSTOMERS" },
  { text: "Join Our Loyalty Program & Earn Rewards", highlight: "LEARN MORE" },
];

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 20px
            )`,
            animation: "marquee 20s linear infinite",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center py-2.5 md:py-3">
          {/* Content */}
          <div className="flex items-center gap-2 md:gap-3 text-center">
            <Sparkles className="w-4 h-4 hidden sm:block" />

            <div className="overflow-hidden h-5">
              <div
                className="transition-transform duration-500"
                style={{ transform: `translateY(-${currentPromo * 20}px)` }}
              >
                {promos.map((promo, index) => (
                  <p key={index} className="h-5 flex items-center justify-center gap-2 text-sm font-medium">
                    <span className="hidden md:inline">{promo.text}</span>
                    <span className="md:hidden">{promo.text.slice(0, 40)}...</span>
                    <span className="px-2 py-0.5 bg-black/20 rounded text-xs font-bold">
                      {promo.highlight}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <ArrowRight className="w-4 h-4 hidden sm:block" />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-black/10 rounded transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
