
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    count: 245
  },
  {
    id: 2,
    name: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000",
    count: 156
  },
  {
    id: 3,
    name: "Jewelry & Accessories",
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000",
    count: 78
  },
  {
    id: 4,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000",
    count: 92
  }
];

const ProductCategories = () => {
  return (
    <section className="py-8 md:py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Browse our wide selection of products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden group cursor-pointer">
              <div className="relative h-64 md:h-80">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-semibold">{category.name}</h3>
                  <p className="text-xs md:text-sm text-white/80">{category.count} products</p>
                  <Button variant="outline" className="mt-2 md:mt-3 bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors text-xs md:text-sm py-1 md:py-2">
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
