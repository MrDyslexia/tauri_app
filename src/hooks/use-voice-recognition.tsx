// src/hooks/useVoiceRecognition.ts
import { useEffect } from "react";
export const useVoiceRecognition = () => {
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "es-ES";

    let isRestarting = false;

    const start = () => {
      if (!isRestarting) {
        recognition.start();
        console.log("🎤 Escuchando...");
      }
    };

    recognition.onstart = () => {
      isRestarting = false;
    };

    recognition.onend = () => {
      console.log("🔇 Escucha finalizada.");
      // Reinicia solo si no fue abortado manualmente
      setTimeout(() => {
        start();
      }, 1000); // 1 segundo de pausa
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");

      console.log("🗣️ Escuchado:", transcript);
      if (transcript.toLowerCase().includes("asistente")) {
        window.location.href = "/assistant";
      }
    };

    recognition.onerror = (event: any) => {
      console.error("❌ Error de reconocimiento:", event.error);
      if (event.error === "aborted") {
        isRestarting = true;
        setTimeout(() => {
          start();
        }, 1000);
      }
    };

    start();

    return () => {
      isRestarting = true;
      recognition.stop();
    };
  }, []);
};