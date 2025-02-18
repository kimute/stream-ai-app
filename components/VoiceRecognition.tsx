"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import type * as speechRecognition from "speech-recognition-polyfill"

interface VoiceRecognitionProps {
  onRecognized: (text: string) => void
}

export default function VoiceRecognition({ onRecognized }: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<speechRecognition.SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
        const recognitionInstance = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        setRecognition(recognitionInstance)
      }
    }
  }, [])

  const 
   = useCallback(
    (event: speechRecognition.SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
      onRecognized(transcript)
    },
    [onRecognized],
  )

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop()
    } else {
      recognition?.start()
      recognition?.addEventListener("result", handleResult)
    }
    setIsListening(!isListening)
  }

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.removeEventListener("result", handleResult)
        recognition.stop()
      }
    }
  }, [recognition, handleResult])

  if (!recognition) {
    return <div>Speech recognition is not supported in this browser.</div>
  }

  return <Button onClick={toggleListening}>{isListening ? "Stop Listening" : "Start Listening"}</Button>
}

