'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Bot, X } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const botReply = await getAIResponse(input);
    const botMessage: Message = { sender: 'bot', text: botReply };
    setMessages((prev) => [...prev, botMessage]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-full max-w-md sm:w-80 md:w-96 h-[80vh] max-h-[80vh] shadow-xl flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">DebutiStyle Assistant</h2>
            <button onClick={handleToggle}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md max-w-[90%] ${msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-200 self-start mr-auto'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      ) : (
        <Button onClick={handleToggle} className="rounded-full p-3 shadow-lg bg-black text-white">
          <Bot className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}

// 🔁 API Call function
async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    return data.reply || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error('API error:', error);
    return 'Something went wrong while contacting the assistant.';
  }
}
