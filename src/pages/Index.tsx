import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import Newsletter from "@/components/Newsletter";
import ProductDetail from "@/components/ProductDetail";
import ShoppingCart from "@/components/ShoppingCart";
import SearchDialog from "@/components/SearchDialog";
import WishlistDialog from "@/components/WishlistDialog";
import UserProfile from "@/components/UserProfile";
import Testimonials from "@/components/Testimonials";
import PromoBanner from "@/components/PromoBanner";
import SizeGuide from "@/components/SizeGuide";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Menu, MapPin, Phone, Mail, ArrowUpRight, Sparkles, Instagram, Facebook, Twitter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AIAssistant from "@/components/AIAssistant";
import { authStore } from "@/utils/authUtils";

const categories = [
  { id: "all", name: "All" },
  { id: "womens", name: "Women" },
  { id: "mens", name: "Men" },
  { id: "accessories", name: "Accessories" },
  { id: "footwear", name: "Footwear" }
];

const productsByCategory = {
  all: [1, 2, 3, 4, 5, 6],
  womens: [1, 4],
  mens: [2],
  accessories: [3, 5],
  footwear: [6]
};

const Index = () => {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(productsByCategory.all);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const featuredRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setFilteredProducts(productsByCategory[activeCategory as keyof typeof productsByCategory] || []);
  }, [activeCategory]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleProductDetail = () => {
    setShowProductDetail(!showProductDetail);

    if (!showProductDetail) {
      setTimeout(() => {
        document.getElementById('product-detail')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast({
      title: `Collection Updated`,
      description: `Viewing ${category === "all" ? "all collections" : categories.find(c => c.id === category)?.name}`,
    });
  };

  const navigateToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    scrollToSection(featuredRef);

    toast({
      title: "Category Selected",
      description: `Browsing ${categories.find(c => c.id === categoryId)?.name || 'All Products'}`,
    });
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleAdminNavigation = () => {
    if (authStore.isAdmin()) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const navLinks = [
    { label: "Home", action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: "Shop", action: () => scrollToSection(featuredRef) },
    { label: "Collections", action: () => scrollToSection(categoriesRef) },
    { label: "About", action: () => scrollToSection(aboutRef) },
    { label: "Contact", action: () => scrollToSection(contactRef) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Promotional Banner */}
      <PromoBanner />

      {/* Premium Header */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'top-0 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'top-[44px] bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="group">
                <h1 className="text-2xl font-serif font-semibold tracking-tight">
                  <span className={`transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                    DEBU
                  </span>
                  <span className="text-gradient-gold">TIFY</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={link.action}
                  className={`text-sm font-medium tracking-wide luxury-underline transition-colors ${
                    isScrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <SearchDialog />

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleUserProfile}
                className={`rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-secondary' : 'hover:bg-white/10'
                }`}
              >
                <User className={`h-5 w-5 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
              </Button>

              <WishlistDialog />
              <ShoppingCart />

              <Button
                variant="ghost"
                size="sm"
                className={`hidden md:flex items-center gap-2 rounded-full px-4 transition-colors ${
                  isScrolled
                    ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                    : 'glass text-white hover:bg-white/20'
                }`}
                onClick={toggleChatbot}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">AI Stylist</span>
              </Button>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Menu className={`h-5 w-5 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-background border-border">
                    <div className="flex flex-col h-full pt-8">
                      <div className="space-y-1">
                        {navLinks.map((link, index) => (
                          <button
                            key={index}
                            onClick={link.action}
                            className="w-full text-left py-3 px-4 text-lg font-medium text-foreground hover:text-amber-500 hover:bg-secondary/50 rounded-lg transition-colors"
                          >
                            {link.label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto pb-8 space-y-4">
                        <Button
                          className="w-full btn-luxury rounded-full py-6"
                          onClick={toggleChatbot}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          <span className="relative z-10">AI Style Assistant</span>
                        </Button>

                        {authStore.isAdmin() && (
                          <Button
                            variant="outline"
                            className="w-full rounded-full border-border"
                            onClick={handleAdminNavigation}
                          >
                            Admin Dashboard
                          </Button>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />

        {/* Browse Collection Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
              <div>
                <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
                  Discover
                </p>
                <h2 className="section-title">
                  Browse <span className="text-gradient-gold">Collection</span>
                </h2>
              </div>

              <Button
                onClick={toggleProductDetail}
                variant="outline"
                className="btn-outline-luxury rounded-full px-6 py-5"
              >
                {showProductDetail ? "Hide Details" : "View Product Details"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Category Tabs */}
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="w-full max-w-2xl mx-auto flex justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {categories.map(category => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 data-[state=active]:bg-amber-500 data-[state=active]:text-black data-[state=inactive]:bg-secondary/50 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-secondary"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <p className="text-center text-muted-foreground mb-8">
                    {category.id === "all"
                      ? "Explore our complete collection of premium pieces"
                      : `Discover our ${category.name} collection`}
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {showProductDetail && (
          <div id="product-detail">
            <ProductDetail />
          </div>
        )}

        <div ref={featuredRef}>
          <FeaturedProducts activeCategory={activeCategory} filteredProductIds={filteredProducts} />
        </div>

        {/* Recently Viewed Section */}
        <RecentlyViewed />

        <div ref={categoriesRef}>
          <ProductCategories onCategoryClick={navigateToCategory} />
        </div>

        {/* About Section */}
        <div ref={aboutRef} className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
                  Our Story
                </p>
                <h2 className="section-title mb-6">
                  About <span className="text-gradient-gold">Debutify</span>
                </h2>
                <div className="divider-gold mb-8" />
                <p className="section-subtitle max-w-2xl mx-auto">
                  We are a premium fashion destination committed to bringing you curated collections of exceptional quality.
                  Our philosophy centers on timeless elegance, sustainable practices, and making luxury accessible.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Our Mission",
                    description: "To provide exceptional quality fashion that empowers individuals to express their unique style while promoting sustainability.",
                    number: "01"
                  },
                  {
                    title: "Our Values",
                    description: "Quality craftsmanship, ethical production, and unwavering commitment to customer satisfaction guide everything we do.",
                    number: "02"
                  },
                  {
                    title: "Our Promise",
                    description: "Premium products, exceptional service, and a seamless shopping experience that exceeds your expectations.",
                    number: "03"
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="glass rounded-2xl p-8 h-full hover:bg-amber-500/5 transition-colors duration-500">
                      <span className="text-5xl font-serif text-gradient-gold opacity-30 group-hover:opacity-60 transition-opacity">
                        {item.number}
                      </span>
                      <h3 className="font-serif text-xl font-medium mt-4 mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Newsletter />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Section */}
        <div ref={contactRef} className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
                      Get in Touch
                    </p>
                    <h2 className="section-title mb-4">
                      Contact <span className="text-gradient-gold">Us</span>
                    </h2>
                    <p className="section-subtitle">
                      Have questions or feedback? We'd love to hear from you. Our team is here to help.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: MapPin, label: "Visit Us", value: "123 Fashion Avenue, Style District" },
                      { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                      { icon: Mail, label: "Email Us", value: "hello@debutify.com" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      {[Instagram, Facebook, Twitter].map((Icon, index) => (
                        <a
                          key={index}
                          href="#"
                          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-amber-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="glass rounded-3xl p-8 md:p-10">
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Message Sent",
                      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
                    });
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input
                          type="text"
                          className="input-luxury w-full"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          className="input-luxury w-full"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        className="input-luxury w-full"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={5}
                        className="input-luxury w-full resize-none"
                        placeholder="Tell us more..."
                      />
                    </div>
                    <Button type="submit" className="w-full btn-luxury rounded-full py-6 text-base font-medium">
                      <span className="relative z-10">Send Message</span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showChatbot && <AIAssistant onClose={toggleChatbot} />}

      {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}

      {/* Premium Footer */}
      <footer className="bg-card border-t border-border">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-semibold tracking-tight mb-4">
                <span className="text-foreground">DEBU</span>
                <span className="text-gradient-gold">TIFY</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your premium destination for curated fashion and lifestyle. Discover timeless pieces that define modern elegance.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-amber-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-serif text-lg font-medium mb-6">Shop</h3>
              <ul className="space-y-3">
                {['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards', 'Lookbook'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-serif text-lg font-medium mb-6">Help</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <SizeGuide trigger={
                    <button className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                      Size Guide
                    </button>
                  } />
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-serif text-lg font-medium mb-6">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Sustainability', 'Press', 'Terms & Privacy'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors luxury-underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              {authStore.isAdmin() && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    to="/login"
                    className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
                  >
                    Admin Access
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Debutify. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-amber-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-amber-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-amber-500 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
