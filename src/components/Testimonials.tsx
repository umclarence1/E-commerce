import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Blogger",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    rating: 5,
    text: "Debutify has completely transformed my wardrobe. The quality of their pieces is exceptional, and every item I've purchased has exceeded my expectations. The customer service is world-class!",
    product: "Silk Evening Gown"
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Business Executive",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    rating: 5,
    text: "I've been a loyal customer for over 3 years now. The tailored blazers are impeccable - perfect fit, premium materials, and they always arrive on time. Highly recommend for any professional.",
    product: "Tailored Wool Blazer"
  },
  {
    id: 3,
    name: "Emma Chen",
    role: "Interior Designer",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    rating: 5,
    text: "The attention to detail in every piece is remarkable. From the packaging to the product itself, everything screams luxury. My cashmere coat is my most treasured possession!",
    product: "Cashmere Blend Coat"
  },
  {
    id: 4,
    name: "Michael Torres",
    role: "Entrepreneur",
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    text: "The Heritage Timepiece I bought was worth every penny. It's become my signature piece - elegant, sophisticated, and always draws compliments. Debutify understands luxury.",
    product: "Heritage Timepiece"
  },
  {
    id: 5,
    name: "Olivia Park",
    role: "Art Director",
    location: "Seoul, Korea",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    rating: 5,
    text: "Finally found a brand that matches my aesthetic. The minimalist designs with premium quality - that's exactly what I was looking for. The leather tote is my daily essential.",
    product: "Artisan Leather Tote"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="section-title mb-4">
            What Our <span className="text-gradient-gold">Clients</span> Say
          </h2>
          <div className="divider-gold mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the Debutify difference
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-black" />
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Author Image */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-amber-500/30">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-black fill-current" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < currentTestimonial.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl leading-relaxed mb-6 italic text-foreground/90">
                  "{currentTestimonial.text}"
                </p>

                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-medium">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.location}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border inline-block">
                  <p className="text-xs text-muted-foreground">
                    Purchased: <span className="text-amber-500">{currentTestimonial.product}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full border-border hover:bg-amber-500/10 hover:border-amber-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-amber-500"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-border hover:bg-amber-500/10 hover:border-amber-500"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border max-w-4xl mx-auto">
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "15+", label: "Years of Excellence" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-semibold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
