import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, Bot, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your DebutiStyle shopping assistant. How can I help you today? You can ask about our products, sizing, shipping, or anything else related to your shopping experience!'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{[key: number]: 'positive' | 'negative' | null}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const productKnowledge = {
    ghana: {
      shipping: "We offer nationwide delivery across Ghana. Standard delivery to Accra and Kumasi takes 1-2 business days, while delivery to other regions may take 3-5 business days. Orders over GH₵200 qualify for free shipping.",
      payment: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, and all major credit cards. Cash on delivery is available in select locations in Accra and Kumasi.",
      locations: "Our flagship store is located at Accra Mall. We also have branches at West Hills Mall, Kumasi City Mall, and Takoradi Market Circle."
    },
    clothing: {
      sizing: "Our sizes range from XS to 3XL. We recommend checking the detailed size chart on each product page for specific measurements. Our women's apparel follows international sizing standards with slight adjustments for Ghanaian body types.",
      materials: "We source high-quality fabrics including organic cotton, breathable linen, and Ankara prints from local Ghanaian artisans. Our premium collections feature imported silks and sustainable textiles.",
      care: "For most garments, we recommend washing in cold water and air-drying to preserve colors and fabric integrity. Ankara prints should be hand-washed separately and dried in shade to maintain their vibrant colors."
    },
    returns: {
      policy: "We offer hassle-free returns within 14 days of purchase. Items must be unworn with original tags attached. For hygiene reasons, underwear and swimwear cannot be returned once the seal is broken.",
      process: "To initiate a return, please contact our customer service at support@debutistyle.com or call 030-XXX-XXXX. Returns can be processed at any of our physical stores or via our courier partners.",
      refunds: "Refunds are processed within 7 business days. For Mobile Money refunds, the same number used for payment will receive the refund. Credit card refunds typically take 5-7 business days to reflect in your account."
    },
    promotions: {
      current: "Join our loyalty program for exclusive discounts and early access to new collections. First-time customers receive 15% off their initial purchase when they sign up for our newsletter.",
      seasonal: "We run major sales during holidays such as Independence Day, Republic Day, Christmas, and Eid celebrations. Our mid-year sale in July offers up to 50% off selected items.",
      partnerships: "We have partnerships with major banks in Ghana offering installment payment options and special discounts for their premium cardholders."
    },
    accessories: {
      jewelry: "Our jewelry collection features handcrafted pieces from local Ghanaian artisans specializing in gold-plated brass, recycled glass beads, and traditional Akan designs.",
      bags: "Our bags range from everyday totes to evening clutches. We proudly feature Kente-accented leather goods and Ankara print designs exclusive to DebutiStyle.",
      care: "For jewelry, avoid contact with water, perfumes, and lotions. Store in the provided pouches. For leather goods, apply leather conditioner quarterly to maintain quality."
    }
  };

  const getAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userMessageLower = userMessage.toLowerCase();
        
        if (userMessageLower.match(/^(hello|hi|hey|greetings|good (morning|afternoon|evening))/)) {
          resolve('Hello there! How can I assist you with your shopping today at DebutiStyle? Are you looking for something specific?');
        }
        else if (userMessageLower.includes('ship') || userMessageLower.includes('delivery') || userMessageLower.includes('how long')) {
          if (userMessageLower.includes('accra') || userMessageLower.includes('kumasi')) {
            resolve(`${productKnowledge.ghana.shipping} For Accra and Kumasi specifically, we offer same-day delivery for orders placed before 11am.`);
          } else {
            resolve(productKnowledge.ghana.shipping);
          }
        }
        else if (userMessageLower.match(/(return|refund|exchange|money back)/)) {
          if (userMessageLower.includes('process') || userMessageLower.includes('how')) {
            resolve(productKnowledge.returns.process);
          } else if (userMessageLower.includes('long') || userMessageLower.includes('time')) {
            resolve(productKnowledge.returns.refunds);
          } else {
            resolve(`${productKnowledge.returns.policy} ${productKnowledge.returns.process}`);
          }
        }
        else if (userMessageLower.includes('size') || userMessageLower.includes('sizing') || userMessageLower.includes('fit')) {
          if (userMessageLower.includes('chart')) {
            resolve('Our detailed size charts are available on each product page. Would you like me to help you find a specific product to check its sizing?');
          } else if (userMessageLower.includes('ankara') || userMessageLower.includes('african')) {
            resolve('Our Ankara clothing typically runs true to size, though we recommend going up one size for fitted styles as the fabric has minimal stretch. Check the product page for item-specific notes on sizing.');
          } else {
            resolve(productKnowledge.clothing.sizing);
          }
        }
        else if (userMessageLower.match(/(discount|coupon|promo|sale|offer)/)) {
          if (userMessageLower.includes('current') || userMessageLower.includes('now')) {
            resolve(`${productKnowledge.promotions.current} Currently, we're also offering a special "Buy 2, Get 1 at 50% off" promotion on all accessories.`);
          } else if (userMessageLower.includes('seasonal') || userMessageLower.includes('holiday')) {
            resolve(productKnowledge.promotions.seasonal);
          } else {
            resolve(`${productKnowledge.promotions.current} ${productKnowledge.promotions.seasonal}`);
          }
        }
        else if (userMessageLower.match(/(material|fabric|quality|made of|cotton|sustainable)/)) {
          if (userMessageLower.includes('jewelry') || userMessageLower.includes('accessories')) {
            resolve(productKnowledge.accessories.jewelry);
          } else if (userMessageLower.includes('bag') || userMessageLower.includes('purse')) {
            resolve(productKnowledge.accessories.bags);
          } else {
            resolve(productKnowledge.clothing.materials);
          }
        }
        else if (userMessageLower.match(/(payment|pay|momo|mobile money|card|visa|mastercard)/)) {
          resolve(productKnowledge.ghana.payment);
        }
        else if (userMessageLower.match(/(location|store|shop|mall|accra|kumasi)/)) {
          resolve(productKnowledge.ghana.locations);
        }
        else if (userMessageLower.match(/(care|wash|clean|maintain|iron)/)) {
          if (userMessageLower.includes('jewelry') || userMessageLower.includes('accessory')) {
            resolve(productKnowledge.accessories.care);
          } else if (userMessageLower.includes('ankara') || userMessageLower.includes('print')) {
            resolve('Ankara prints should be hand-washed separately in cold water and dried in shade to maintain their vibrant colors. We recommend using mild detergent and avoiding bleach or harsh chemicals.');
          } else {
            resolve(productKnowledge.clothing.care);
          }
        }
        else if (userMessageLower.match(/(recommend|suggestion|trending|popular|best seller)/)) {
          if (userMessageLower.includes('women') || userMessageLower.includes('female')) {
            resolve('Our best-selling women\'s items currently include the Ankara Wrap Dress, Premium Cotton T-Shirts, and our handcrafted beaded jewelry sets. The Kente-trimmed maxi skirts are also very popular this season.');
          } else if (userMessageLower.includes('men') || userMessageLower.includes('male')) {
            resolve('For men, our current bestsellers include the African Print Short-sleeve Shirts, Premium Cotton T-Shirts with Ghanaian motifs, and our leather accessories including handcrafted belts and wallets.');
          } else {
            resolve('Our current bestsellers include our Ankara Print T-Shirts, handcrafted leather bags with Kente accents, and our premium cotton basics. Would you like recommendations for a specific category?');
          }
        }
        else if (userMessageLower.match(/(track|order|status|package|delivery status)/)) {
          resolve('You can track your order by visiting the "My Orders" section in your account or by entering your order number on our tracking page. Alternatively, you can respond to your order confirmation email for updates. Would you like me to guide you to the tracking page?');
        }
        else {
          resolve('Thank you for your question. While I\'m continuously learning to better assist you, for this specific inquiry, you might get more detailed information from our customer service team at support@debutistyle.com or by calling 030-XXX-XXXX during business hours (9am-6pm GMT, Monday to Saturday). Is there something else I can help you with today?');
        }
      }, 800);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const aiResponse = await getAIResponse(input);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: aiResponse }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageIndex: number, type: 'positive' | 'negative') => {
    setFeedback(prev => {
      if (prev[messageIndex] === type) {
        return { ...prev, [messageIndex]: null };
      }
      return { ...prev, [messageIndex]: type };
    });
    
    console.log(`Feedback on message ${messageIndex}: ${type}`);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-[450px] max-h-[80vh] shadow-xl flex flex-col z-50 overflow-hidden">
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">DebutiStyle Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-primary-foreground hover:bg-primary/80">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block px-4 py-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-slate-200 dark:bg-slate-800 text-foreground mr-12'
              }`}
            >
              {message.content}
            </div>
            
            {message.role === 'assistant' && index > 0 && (
              <div className="flex gap-1 mt-1 justify-start">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-6 w-6 p-0 rounded-full ${feedback[index] === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'text-slate-400'}`}
                  onClick={() => handleFeedback(index, 'positive')}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-6 w-6 p-0 rounded-full ${feedback[index] === 'negative' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'text-slate-400'}`}
                  onClick={() => handleFeedback(index, 'negative')}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t bg-background">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={isLoading || input.trim() === ''}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-center mt-2 text-slate-500">
          <span className="inline-flex items-center">
            <Sparkles className="h-3 w-3 mr-1" /> 
            Powered by DebutiStyle AI
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AIAssistant;
