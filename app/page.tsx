"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoiceRecognition from "@/components/VoiceRecognition";
import VoiceRecorder from "@/components/VoiceRecoder";
import AIInteraction from "@/components/AIInteraction";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [recognizedText, setRecognizedText] = useState("");
  const [transcript, setTranscript] = useState("");

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!transcript) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: transcript,
          action: "question",
        }),
      });

      const data = await res.json();
      setResponse(data.result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Voice Recognition and AI Interaction</CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceRecorder onTranscriptChange={setTranscript} />
          {transcript && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">인식된 텍스트:</h3>
              <p className="mt-2 p-4 bg-muted rounded-md">{transcript}</p>
              <Button onClick={handleAsk} className="mt-4" disabled={isLoading}>
                {isLoading ? "처리 중..." : "AI에게 물어보기"}
              </Button>
            </div>
          )}
          {/* aiからきた返事 */}
          {response && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">AI 응답:</h3>
              <p className="mt-2 p-4 bg-muted rounded-md whitespace-pre-wrap">
                {response}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <AIInteraction recognizedText={recognizedText} />
        </CardFooter>
      </Card>
    </div>
  );
}
