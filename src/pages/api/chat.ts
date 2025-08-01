// pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'No message provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a stylish, friendly, and knowledgeable shopping assistant for DebutiStyle. 
You help users with questions about products, trends, promotions, and shopping help.
Always respond like a helpful personal shopper.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? 'I’m here to assist you!';

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('OpenAI error:', error.message || error);
    res.status(500).json({ reply: 'Oops! Something went wrong. Please try again.' });
  }
}
