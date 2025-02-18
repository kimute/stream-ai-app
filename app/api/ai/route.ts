import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { action, text, question } = await req.json()

  let prompt = ""
  if (action === "summarize") {
    prompt = `Summarize the following conversation:\n\n${text}`
  } else if (action === "question") {
    prompt = `Given the following conversation:\n\n${text}\n\nAnswer this question: ${question}`
  }

  try {
    const { text: result } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt,
    })

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing your request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

