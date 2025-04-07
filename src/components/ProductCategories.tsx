
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "womens",
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=1000",
    count: 245
  },
  {
    id: "mens",
    name: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1000",
    count: 156
  },
  {
    id: "accessories",
    name: "Jewelry & Accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
    count: 78
  },
  {
    id: "footwear",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    count: 92
  }
];

interface ProductCategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

const ProductCategories = ({ onCategoryClick }: ProductCategoriesProps) => {
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
                  <Button 
                    variant="outline" 
                    className="mt-2 md:mt-3 bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors text-xs md:text-sm py-1 md:py-2"
                    onClick={() => onCategoryClick && onCategoryClick(category.id)}
                  >
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
