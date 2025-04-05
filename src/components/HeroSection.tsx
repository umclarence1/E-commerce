
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
    { text: "24/7 Support", position: 288 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 text-white">
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="block">Experience</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300">Shopping Reimagined</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-xl">
              Discover a new dimension of style with our revolutionary shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white">
                <ShoppingBag className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Collections
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="aspect-square w-full max-w-md mx-auto relative">
              {/* Rotating orbital ring */}
              <div 
                className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              
              {/* Product image in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center p-2">
                  <img 
                    src="https://i.imgur.com/JFHjdNr.jpeg" 
                    alt="Featured Product" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Orbital features */}
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    transform: `rotate(${feature.position}deg) translateX(10rem) rotate(-${feature.position}deg)` 
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 ${hoverIndex === index ? 'scale-125 bg-white/30' : ''}`}>
                    <span className="text-xs font-medium text-center">{feature.text}</span>
                  </div>
                </div>
              ))}
              
              {/* Control buttons */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full border-white/50 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setRotation(prev => (prev - 10) % 360)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full border-white/50 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setRotation(prev => (prev + 10) % 360)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 -mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 text-center border border-white/20 transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-white/70">On all orders over $50</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 text-center border border-white/20 transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-white/70">30-day return policy</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 text-center border border-white/20 transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-white/70">Protected by top payment gateways</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
