
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[500px] flex items-center justify-center text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Spring Collection 2025</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover our latest arrivals with stunning designs and premium quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Shop Women
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Shop Men
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 -mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">On all orders over $50</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-muted-foreground">30-day return policy</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">Protected by top payment gateways</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
