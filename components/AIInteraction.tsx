"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AIInteractionProps {
  recognizedText: string
}

export default function AIInteraction({ recognizedText }: AIInteractionProps) {
  const [summary, setSummary] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSummarize = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "summarize", text: recognizedText }),
    })
    const data = await response.json()
    setSummary(data.result)
  }

  const handleAskQuestion = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "question", text: recognizedText, question }),
    })
    const data = await response.json()
    setAnswer(data.result)
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <Button onClick={handleSummarize}>Summarize</Button>
        {summary && (
          <div className="mt-2 bg-gray-100 p-2 rounded">
            <h4 className="font-semibold">Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex space-x-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the conversation"
          />
          <Button onClick={handleAskQuestion}>Ask</Button>
        </div>
        {answer && (
          <div className="mt-2 bg-gray-100 p-2 rounded">
            <h4 className="font-semibold">Answer:</h4>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

