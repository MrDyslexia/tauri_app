"use client"

import { useState } from "react"
import { Button, Input } from "@heroui/react"
import { Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { AssistantResponse } from "@/types/interfaces"

interface ChatViewProps {
  responses: AssistantResponse[]
  onBack: () => void
  onSelectResponse: (response: AssistantResponse) => void
}

export default function ChatView({ responses, onBack, onSelectResponse }: ChatViewProps) {
  const [isListening, setIsListening] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button className="text-gray-600" size="sm" variant="light" onPress={onBack}>
            ← Back
          </Button>
          <h1 className="text-lg font-light text-gray-800">AI Assistant</h1>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4">
          <div className="min-h-[200px] max-h-[300px] overflow-y-auto space-y-3 p-3 bg-gray-50/50 rounded-lg">
            <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white p-2 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-2">
            <Input className="flex-1 h-9" placeholder="Type your message or use voice..." />
            <Button
              className="h-9 w-9 min-w-9"
              size="sm"
              variant={isListening ? "shadow" : "flat"}
              onPress={() => setIsListening(!isListening)}
            >
              <Mic className={`h-4 w-4 ${isListening ? "animate-pulse text-red-500" : ""}`} />
            </Button>
          </div>

          <AnimatePresence>
            {isListening && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs text-gray-500 animate-pulse">Listening...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {responses.slice(0, 4).map((response, index) => (
              <Button
                key={index}
                size="sm"
                variant="flat"
                className="h-7 text-xs"
                onPress={() => onSelectResponse(response)}
              >
                {response.type} Example
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
