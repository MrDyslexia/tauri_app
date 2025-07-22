"use client"

import { useState } from "react"
import { Button, Input } from "@heroui/react"
import { Mic, Send, ArrowLeft, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import type { AssistantResponse } from "@/types/interfaces"

interface ChatViewProps {
  responses: AssistantResponse[]
  onBack: () => void
  onSelectResponse: (response: AssistantResponse) => void
}

export default function ChatView({ responses, onBack, onSelectResponse }: ChatViewProps) {
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState("")
  const { theme } = useTheme()

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      setMessage("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Button className="glass-button" size="sm" variant="light" onPress={onBack}>
          <ArrowLeft className={`w-4 h-4 mr-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Atrás</span>
        </Button>

        <div className="flex items-center gap-2">
          <MessageCircle className={`w-5 h-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className={`text-lg font-light ${theme === "dark" ? "text-white" : "text-gray-800"}`}>AI Assistant</h1>
        </div>

        <div className="w-16"></div>
      </div>

      <div className="space-y-4">
        <motion.div
          className="glass-panel rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-panel rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className={`text-xs font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                  Asistente
                </span>
              </div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                ¡Hola! ¿En qué puedo ayudarte hoy? Puedes escribir tu pregunta o usar el micrófono para hablar.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            className="flex-1 glass-input"
            placeholder="Escribe tu mensaje o usa el micrófono..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            classNames={{
              input: `${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`,
              inputWrapper: "glass-input border-0 bg-transparent",
            }}
          />

          <Button
            className="glass-button hover-glow min-w-unit-10 w-10 h-10"
            size="sm"
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className={`w-4 h-4 ${theme === "dark" ? "text-white" : "text-gray-700"}`} />
          </Button>

          <Button
            className={`glass-button hover-glow min-w-unit-10 w-10 h-10 ${isListening ? "bg-red-500/20" : ""}`}
            size="sm"
            onPress={() => setIsListening(!isListening)}
          >
            <Mic
              className={`w-4 h-4 ${isListening ? "text-red-400 animate-pulse" : theme === "dark" ? "text-white" : "text-gray-700"}`}
            />
          </Button>
        </motion.div>

        <AnimatePresence>
          {isListening && (
            <motion.div
              className="text-center glass-panel rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <p className={`text-sm ${theme === "dark" ? "text-red-400" : "text-red-600"} animate-pulse`}>
                  Escuchando...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Ejemplos rápidos:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {responses.slice(0, 4).map((response, index) => (
              <Button
                key={index}
                size="sm"
                variant="flat"
                className="glass-button text-xs hover-glow"
                onPress={() => onSelectResponse(response)}
              >
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  {response.type === "text" && "📝"}
                  {response.type === "image" && "🖼️"}
                  {response.type === "links" && "🔗"}
                  {response.type === "products" && "🛍️"} {response.type}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
