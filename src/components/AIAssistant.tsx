import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, X, Send, Bot, User, ShoppingBag, Package, CreditCard, Truck, RotateCcw, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onClose?: () => void;
}

// Shop Knowledge Base
const shopKnowledge = {
  name: "Debutify",
  tagline: "Premium Fashion & Lifestyle",
  description: "Your premium destination for curated fashion and lifestyle products. We offer timeless pieces that define modern elegance.",

  products: [
    { id: 1, name: "Silk Evening Gown", price: 289.99, category: "Womens", color: "Champagne", sizes: ["XS", "S", "M", "L", "XL"], description: "Exquisitely crafted from premium silk blend fabric" },
    { id: 2, name: "Tailored Wool Blazer", price: 459.99, category: "Mens", color: "Charcoal", sizes: ["S", "M", "L", "XL"], description: "Classic tailored blazer in premium wool" },
    { id: 3, name: "Artisan Leather Tote", price: 379.99, category: "Accessories", color: "Cognac", sizes: ["One Size"], description: "Handcrafted leather tote bag" },
    { id: 4, name: "Cashmere Blend Coat", price: 599.99, category: "Womens", color: "Camel", sizes: ["XS", "S", "M", "L"], description: "Luxurious cashmere blend winter coat" },
    { id: 5, name: "Heritage Timepiece", price: 1299.99, category: "Accessories", color: "Rose Gold", sizes: ["One Size"], description: "Premium Swiss-made watch" },
    { id: 6, name: "Italian Leather Loafers", price: 349.99, category: "Footwear", color: "Burgundy", sizes: ["38", "39", "40", "41", "42", "43", "44"], description: "Handmade Italian leather shoes" },
  ],

  categories: [
    { name: "Women's Fashion", count: 245, description: "Elegant dresses, coats, and accessories for the modern woman" },
    { name: "Men's Fashion", count: 156, description: "Sophisticated suits, blazers, and casual wear" },
    { name: "Accessories", count: 78, description: "Watches, bags, jewelry, and more" },
    { name: "Footwear", count: 92, description: "Premium shoes and boots for all occasions" },
  ],

  policies: {
    shipping: {
      standard: "5-7 business days, $15.99 (Free on orders over $200)",
      express: "2-3 business days, $29.99",
      overnight: "Next business day, $49.99",
      international: "7-14 business days, rates vary by location"
    },
    returns: "30-day return policy. Items must be unworn with original tags. Free returns on all orders.",
    payment: ["Visa", "Mastercard", "American Express", "PayPal", "Apple Pay", "Google Pay", "Klarna (Buy now, pay later)"],
    giftCards: "Available in denominations of $50, $100, $250, and $500"
  },

  contact: {
    email: "hello@debutify.com",
    phone: "+1 (555) 123-4567",
    hours: "Monday-Friday 9AM-6PM EST, Saturday 10AM-4PM EST",
    address: "123 Fashion Avenue, Style District, NY 10001"
  },

  faq: [
    { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also track orders in your account dashboard under 'Orders'." },
    { q: "What sizes do you offer?", a: "We offer sizes XS to XL for most clothing items. Check the size guide on each product page for detailed measurements." },
    { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide. Shipping rates and delivery times vary by location." },
    { q: "How do returns work?", a: "We offer free returns within 30 days of delivery. Items must be unworn with original tags attached. Start a return from your account or contact us." },
    { q: "Are your products authentic?", a: "Absolutely. All our products are 100% authentic and sourced directly from brands or authorized distributors." },
  ],

  promotions: [
    { name: "New Customer Discount", description: "Get 15% off your first order with code WELCOME15" },
    { name: "Free Shipping", description: "Free standard shipping on orders over $200" },
    { name: "Loyalty Rewards", description: "Earn 1 point for every $1 spent. 100 points = $10 reward" },
  ]
};

// AI Response Generator
function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Greetings
  if (msg.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return `Hello! Welcome to ${shopKnowledge.name}. I'm your personal style assistant. How can I help you today? I can help with:\n\n• Finding products\n• Sizing & fit questions\n• Shipping & delivery info\n• Returns & exchanges\n• Order tracking\n\nJust ask me anything!`;
  }

  // Thanks
  if (msg.match(/(thank|thanks|thank you|appreciate)/)) {
    return "You're welcome! Is there anything else I can help you with? I'm here to make your shopping experience exceptional.";
  }

  // Goodbye
  if (msg.match(/^(bye|goodbye|see you|later)/)) {
    return "Thank you for visiting Debutify! Have a wonderful day, and happy shopping! Feel free to chat anytime you need assistance.";
  }

  // Product searches
  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(dress|gown|evening)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Gown"));
    return `I found our stunning **Silk Evening Gown** for you!\n\n💃 **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Color: ${product?.color}\n📏 Sizes: ${product?.sizes?.join(", ")}\n\n${product?.description}. Perfect for galas, formal dinners, or any special occasion.\n\nWould you like me to add it to your bag or show you similar items?`;
  }

  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(blazer|suit|jacket)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Blazer"));
    return `Here's our bestselling blazer:\n\n🧥 **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Color: ${product?.color}\n📏 Sizes: ${product?.sizes?.join(", ")}\n\n${product?.description}. A timeless piece for the modern gentleman.\n\nWould you like to see more details or add it to your bag?`;
  }

  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(bag|tote|purse|handbag)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Tote"));
    return `Perfect choice! Here's our premium bag:\n\n👜 **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Color: ${product?.color}\n\n${product?.description}. Crafted by skilled artisans using the finest leather.\n\nShall I add this to your wishlist?`;
  }

  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(watch|timepiece)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Timepiece"));
    return `Excellent taste! Here's our luxury timepiece:\n\n⌚ **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Finish: ${product?.color}\n\n${product?.description}. A statement piece that combines heritage craftsmanship with modern elegance.\n\nThis would make a perfect gift or personal investment piece!`;
  }

  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(shoe|loafer|footwear|boots)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Loafers"));
    return `Here's our handcrafted footwear:\n\n👞 **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Color: ${product?.color}\n📏 Sizes: EU ${product?.sizes?.join(", ")}\n\n${product?.description}. Made in Italy with premium materials.\n\nWould you like size recommendations?`;
  }

  if (msg.match(/(show|find|looking for|search|browse|shop|buy|want|need).*(coat|winter|cashmere)/i)) {
    const product = shopKnowledge.products.find(p => p.name.includes("Coat"));
    return `Stay warm in style with our luxury coat:\n\n🧥 **${product?.name}**\n💵 Price: $${product?.price}\n🎨 Color: ${product?.color}\n📏 Sizes: ${product?.sizes?.join(", ")}\n\n${product?.description}. The perfect investment piece for colder months.\n\nThis is one of our most popular items!`;
  }

  // Categories
  if (msg.match(/(women|woman|ladies|female)/i)) {
    return `Our **Women's Collection** features ${shopKnowledge.categories[0].count} exquisite pieces:\n\n✨ ${shopKnowledge.categories[0].description}\n\nTop picks:\n• Silk Evening Gown - $289.99\n• Cashmere Blend Coat - $599.99\n\nWould you like me to show you specific items or help you find something for a particular occasion?`;
  }

  if (msg.match(/(men|man|male|gentleman)/i)) {
    return `Our **Men's Collection** offers ${shopKnowledge.categories[1].count} refined pieces:\n\n👔 ${shopKnowledge.categories[1].description}\n\nFeatured:\n• Tailored Wool Blazer - $459.99\n• Italian Leather Loafers - $349.99\n\nLooking for something specific? I can help you find the perfect outfit!`;
  }

  if (msg.match(/(accessor|jewelry|watch|bag)/i)) {
    return `Our **Accessories Collection** includes ${shopKnowledge.categories[2].count} premium items:\n\n💎 ${shopKnowledge.categories[2].description}\n\nHighlights:\n• Heritage Timepiece - $1,299.99\n• Artisan Leather Tote - $379.99\n\nThese make perfect gifts! Need help choosing?`;
  }

  // All products
  if (msg.match(/(all products|everything|catalog|collection|what do you (have|sell|offer))/i)) {
    const productList = shopKnowledge.products.map(p => `• ${p.name} - $${p.price}`).join("\n");
    return `Here's our curated collection:\n\n${productList}\n\nWe have ${shopKnowledge.categories.reduce((sum, c) => sum + c.count, 0)}+ products across ${shopKnowledge.categories.length} categories. Would you like me to filter by category, price range, or style?`;
  }

  // Shipping
  if (msg.match(/(ship|shipping|delivery|deliver|how long|when.*arrive)/i)) {
    return `📦 **Shipping Options:**\n\n🚚 **Standard:** ${shopKnowledge.policies.shipping.standard}\n⚡ **Express:** ${shopKnowledge.policies.shipping.express}\n✈️ **Overnight:** ${shopKnowledge.policies.shipping.overnight}\n🌍 **International:** ${shopKnowledge.policies.shipping.international}\n\n💡 **Pro tip:** Orders over $200 get FREE standard shipping!\n\nNeed help with anything else?`;
  }

  // Returns
  if (msg.match(/(return|refund|exchange|money back|send back)/i)) {
    return `↩️ **Returns & Exchanges:**\n\n${shopKnowledge.policies.returns}\n\n**How to return:**\n1. Log into your account\n2. Go to 'Orders' and select the item\n3. Click 'Start Return'\n4. Print the free return label\n5. Drop off at any shipping location\n\nRefunds are processed within 5-7 business days after we receive your item. Need help starting a return?`;
  }

  // Payment
  if (msg.match(/(pay|payment|credit card|debit|how.*pay|checkout)/i)) {
    return `💳 **Payment Methods:**\n\nWe accept:\n${shopKnowledge.policies.payment.map(p => `• ${p}`).join("\n")}\n\n🔒 All transactions are secured with SSL encryption.\n\n💡 Use **Klarna** to split your purchase into 4 interest-free payments!\n\nAny questions about checkout?`;
  }

  // Sizing
  if (msg.match(/(size|sizing|fit|measurement|which size|what size)/i)) {
    return `📏 **Size Guide:**\n\nFor the best fit, we recommend:\n\n**Clothing:**\n• XS: Bust 32", Waist 24-25"\n• S: Bust 34", Waist 26-27"\n• M: Bust 36", Waist 28-29"\n• L: Bust 38", Waist 30-31"\n• XL: Bust 40", Waist 32-33"\n\n**Footwear:**\nWe use EU sizing. Check each product for specific measurements.\n\n💡 **Tip:** When in between sizes, size up for a relaxed fit or size down for a tailored look.\n\nWould you like sizing help for a specific item?`;
  }

  // Order tracking
  if (msg.match(/(track|tracking|where.*order|order status)/i)) {
    return `📍 **Order Tracking:**\n\nTo track your order:\n1. Check your email for the tracking number\n2. Visit your account dashboard → 'My Orders'\n3. Click on the order to see real-time updates\n\nOr provide your order number and I can help look it up!\n\n*Note: Tracking information is available 24-48 hours after your order ships.*`;
  }

  // Gift cards
  if (msg.match(/(gift|gift card|voucher|present)/i)) {
    return `🎁 **Gift Cards:**\n\n${shopKnowledge.policies.giftCards}\n\nGift cards:\n• Never expire\n• Can be used online or in-store\n• Are delivered instantly via email\n\nPerfect for any occasion! Would you like to purchase one?`;
  }

  // Contact
  if (msg.match(/(contact|reach|support|help|speak|talk|call|email)/i)) {
    return `📞 **Contact Us:**\n\n📧 Email: ${shopKnowledge.contact.email}\n📱 Phone: ${shopKnowledge.contact.phone}\n🕐 Hours: ${shopKnowledge.contact.hours}\n📍 Address: ${shopKnowledge.contact.address}\n\nYou can also chat with me 24/7 for instant assistance! How can I help you today?`;
  }

  // Promotions/Discounts
  if (msg.match(/(discount|promo|coupon|code|sale|offer|deal)/i)) {
    const promos = shopKnowledge.promotions.map(p => `🏷️ **${p.name}:** ${p.description}`).join("\n\n");
    return `🎉 **Current Offers:**\n\n${promos}\n\nSign up for our newsletter to get exclusive member-only deals!`;
  }

  // Price range
  if (msg.match(/(cheap|affordable|budget|under \$|less than)/i)) {
    const affordable = shopKnowledge.products.filter(p => p.price < 400).map(p => `• ${p.name} - $${p.price}`).join("\n");
    return `💰 **Best Value Picks (Under $400):**\n\n${affordable}\n\nAll our products are investment pieces designed to last. Plus, use code **WELCOME15** for 15% off your first order!`;
  }

  if (msg.match(/(luxury|premium|expensive|high.end|best)/i)) {
    const luxury = shopKnowledge.products.filter(p => p.price > 400).map(p => `• ${p.name} - $${p.price}`).join("\n");
    return `✨ **Luxury Collection:**\n\n${luxury}\n\nThese are our finest pieces, crafted with exceptional materials and attention to detail. Perfect for special occasions or as investment pieces.`;
  }

  // About the store
  if (msg.match(/(about|who are you|what is debutify|tell me about)/i)) {
    return `✨ **About Debutify:**\n\n${shopKnowledge.description}\n\n🌟 **Why Shop With Us:**\n• Curated luxury collections\n• Authentic, high-quality products\n• Free shipping over $200\n• 30-day easy returns\n• Exceptional customer service\n\nWe've been helping fashion enthusiasts discover their perfect style for over 15 years. How can I help you find yours?`;
  }

  // Help
  if (msg.match(/^(help|what can you do|options|menu)/i)) {
    return `I'm your personal style assistant! Here's how I can help:\n\n🛍️ **Shopping:**\n• Browse collections\n• Find specific products\n• Get size recommendations\n• Check prices\n\n📦 **Orders:**\n• Track shipments\n• Shipping options\n• Return process\n\n💬 **Support:**\n• Payment methods\n• Contact information\n• FAQs\n\nJust ask me anything naturally, like "Show me dresses" or "How do returns work?"`;
  }

  // Default response for unmatched queries
  const suggestions = [
    "browse our collections",
    "check shipping options",
    "learn about returns",
    "find a specific product",
    "get size recommendations"
  ];
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

  return `I'd be happy to help with that! While I search for the best answer, here are some things I can definitely help with:\n\n• Product recommendations\n• Sizing & fit\n• Shipping & delivery\n• Returns & exchanges\n• Order tracking\n\nTry asking me to "${randomSuggestion}" or feel free to rephrase your question!`;
}

// Quick action suggestions
const quickActions = [
  { icon: ShoppingBag, label: "Browse Products", query: "Show me all products" },
  { icon: Truck, label: "Shipping Info", query: "What are the shipping options?" },
  { icon: RotateCcw, label: "Returns", query: "How do returns work?" },
  { icon: HelpCircle, label: "Help", query: "What can you help me with?" },
];

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Welcome to Debutify! ✨\n\nI'm your personal style assistant. I can help you:\n\n• Find the perfect outfit\n• Answer questions about products\n• Check shipping & returns\n• Track your orders\n\nHow can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      <div className="w-[calc(100vw-32px)] sm:w-[380px] max-w-[420px] h-[calc(100vh-100px)] sm:h-[600px] max-h-[700px] glass rounded-2xl sm:rounded-3xl shadow-2xl shadow-amber-500/10 flex flex-col overflow-hidden animate-fade-in-up border border-amber-500/20">
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-amber-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-serif font-medium">Style Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === 'user' ? 'bg-amber-500' : 'bg-secondary'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-black" />
                ) : (
                  <Bot className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className={`max-w-[80%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-black rounded-br-md'
                    : 'bg-secondary rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-500" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-bl-md p-3 px-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(action.query)}
                  className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-xs hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-secondary/50 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-muted-foreground"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="btn-luxury rounded-full w-12 h-12 p-0"
            >
              <Send className="w-5 h-5 relative z-10" />
            </Button>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            Powered by Debutify AI • Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
