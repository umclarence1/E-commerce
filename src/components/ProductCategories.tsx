import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "womens",
    name: "Women",
    subtitle: "Elegance Redefined",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000",
    count: 245,
    featured: "New Season"
  },
  {
    id: "mens",
    name: "Men",
    subtitle: "Modern Sophistication",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000",
    count: 156,
    featured: "Best Sellers"
  },
  {
    id: "accessories",
    name: "Accessories",
    subtitle: "Finishing Touches",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000",
    count: 78,
    featured: "Limited Edition"
  },
  {
    id: "footwear",
    name: "Footwear",
    subtitle: "Walk in Style",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
    count: 92,
    featured: "Trending"
  }
];

interface ProductCategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

const ProductCategories = ({ onCategoryClick }: ProductCategoriesProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
            Explore
          </p>
          <h2 className="section-title mb-4">
            Shop by <span className="text-gradient-gold">Category</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover our carefully curated collections, each designed to complement your unique style
          </p>
        </div>

        {/* Categories Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`category-card overflow-hidden ${
                  index === 0 ? 'h-[500px] lg:h-full' : 'h-[300px] lg:h-[280px]'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8">
                  {/* Top Badge */}
                  <div className="self-start">
                    <span className="inline-block px-3 py-1 glass text-xs font-medium tracking-wider uppercase text-white/90 rounded-full">
                      {category.featured}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className={`font-serif font-medium text-white ${
                          index === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                        }`}>
                          {category.name}
                        </h3>
                        <p className="text-white/60 mt-1 text-sm">
                          {category.subtitle}
                        </p>
                      </div>

                      {/* Arrow Button */}
                      <div className="glass-gold rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-amber-500" />
                      </div>
                    </div>

                    {/* Product Count & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-white/50 text-sm">
                        {category.count} Products
                      </span>
                      <Button
                        variant="link"
                        className="text-white/70 hover:text-amber-500 p-0 h-auto font-normal text-sm transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.id);
                        }}
                      >
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover Gradient Enhancement */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="btn-outline-luxury rounded-full px-8 py-6 text-base"
          >
            View All Categories
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
