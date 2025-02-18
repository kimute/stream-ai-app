"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import VoiceRecognition from "@/components/VoiceRecognition"
import AIInteraction from "@/components/AIInteraction"

export default function Home() {
  const [recognizedText, setRecognizedText] = useState("")

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Voice Recognition and AI Interaction</CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceRecognition onRecognized={setRecognizedText} />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recognized Text:</h3>
            <p className="bg-gray-100 p-2 rounded">{recognizedText}</p>
          </div>
        </CardContent>
        <CardFooter>
          <AIInteraction recognizedText={recognizedText} />
        </CardFooter>
      </Card>
    </div>
  )
}

