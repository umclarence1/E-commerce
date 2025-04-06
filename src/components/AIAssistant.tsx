
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, Bot } from "lucide-react";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock responses for the chatbot
  const getAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userMessageLower = userMessage.toLowerCase();
        
        if (userMessageLower.includes('hello') || userMessageLower.includes('hi')) {
          resolve('Hello there! How can I assist you with your shopping today?');
        } else if (userMessageLower.includes('shipping') || userMessageLower.includes('delivery')) {
          resolve('We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, and express delivery is available for an additional fee.');
        } else if (userMessageLower.includes('return') || userMessageLower.includes('refund')) {
          resolve('Our return policy allows you to return items within 30 days of receipt. All items must be unworn with original tags attached. Refunds are processed within 5-7 business days after we receive your returned items.');
        } else if (userMessageLower.includes('size') || userMessageLower.includes('sizing')) {
          resolve('We offer sizes XS through 3XL for most of our items. You can find detailed size charts on each product page. If you\'re between sizes, we generally recommend sizing up for a more comfortable fit.');
        } else if (userMessageLower.includes('discount') || userMessageLower.includes('coupon') || userMessageLower.includes('sale')) {
          resolve('You can sign up for our newsletter to receive a 15% discount on your first purchase. We also run seasonal sales and special promotions for our loyal customers.');
        } else if (userMessageLower.includes('material') || userMessageLower.includes('fabric')) {
          resolve('We prioritize high-quality, sustainable materials for our products. Specific material information is provided on each product page. Many of our items use organic cotton, recycled polyester, and other eco-friendly materials.');
        } else if (userMessageLower.includes('payment') || userMessageLower.includes('pay')) {
          resolve('We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.');
        } else {
          resolve('Thank you for your question. Our team is constantly improving this AI assistant. For more specific information, please contact our customer service team at support@debutistyle.com.');
        }
      }, 1000);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response
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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIAssistant;
