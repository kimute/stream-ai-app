"use client";
import '../app/utils/polyfills';
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@/components/ui/button";

interface VoiceRecorderProps {
    onTranscriptChange: (transcript: string) => void;
}

export default function VoiceRecorder({ onTranscriptChange }: VoiceRecorderProps) {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        onTranscriptChange(transcript); // 인식된 텍스트를 부모 컴포넌트로 전달
    }, [transcript, onTranscriptChange]);

    const toggleRecording = () => {
        if (listening) {
            //resetTranscript();
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ language: "ja" }); // 일본어로 설정
        }
    };

    return (
        <div>
            <Button onClick={toggleRecording}>
                {listening ? "Stop" : "Record"}
            </Button>
        </div>
    );
}