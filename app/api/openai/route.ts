import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}