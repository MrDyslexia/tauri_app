// src/hooks/useVoiceRecognition.ts
import { useEffect, useState } from "react";

export const useVoiceRecognition = (wakeWord: string, onWake: () => void) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "es-ES";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("")
        .toLowerCase();

      if (transcript.includes(wakeWord.toLowerCase())) {
        onWake();
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [wakeWord, onWake]);

  return { isListening };
};