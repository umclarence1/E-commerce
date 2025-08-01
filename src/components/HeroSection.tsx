import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, ShoppingBag } from "lucide-react";

const HeroSection = () => {
  const [rotation, setRotation] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const features = [
    { text: "Exclusive Collections", position: 0 },
    { text: "Premium Quality", position: 72 },
    { text: "Global Shipping", position: 144 },
    { text: "Easy Returns", position: 216 },
    { text: "24/7 Support", position: 288 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 text-white py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300">
                Modern Shopping
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Discover premium products, exclusive deals, and an experience tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Side Orbit Animation */}
          <div className="md:w-1/2 relative">
            <div className="aspect-square w-full max-w-md mx-auto relative">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              />

              {/* Center Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-md p-2 flex items-center justify-center">
                  <img
                    src="https://i.imgur.com/JFHjdNr.jpeg"
                    alt="Featured Product"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Orbiting Features */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotate(${feature.position}deg) translateX(10rem) rotate(-${feature.position}deg)`,
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs text-white text-center font-medium transition-all duration-300 ${
                      hoverIndex === index ? "scale-110 bg-white/30" : ""
                    }`}
                  >
                    {feature.text}
                  </div>
                </div>
              ))}

              {/* Rotation Controls */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-white/50 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setRotation((prev) => (prev - 10) % 360)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-white/50 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setRotation((prev) => (prev + 10) % 360)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center border border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-white/70">On all orders above $50</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center border border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Hassle-Free Returns</h3>
            <p className="text-white/70">30-day return policy</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center border border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
            <p className="text-white/70">Protected payments & privacy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
