
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Women's Fashion",
    image: "https://i.imgur.com/MQrRXuc.jpeg",
    count: 245
  },
  {
    id: 2,
    name: "Men's Fashion",
    image: "https://i.imgur.com/mHWv2IH.jpeg",
    count: 156
  },
  {
    id: 3,
    name: "Jewelry & Accessories",
    image: "https://i.imgur.com/2IxWjZx.jpeg",
    count: 78
  },
  {
    id: 4,
    name: "Electronics",
    image: "https://i.imgur.com/TiHg7Jk.jpeg",
    count: 92
  }
];

const ProductCategories = () => {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our wide selection of products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden group cursor-pointer">
              <div className="relative h-80">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} products</p>
                  <Button variant="outline" className="mt-3 bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
