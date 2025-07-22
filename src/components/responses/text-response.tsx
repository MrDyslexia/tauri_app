"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import type { TextContent } from "@/types/interfaces"

interface TextResponseProps {
  content: TextContent
}

export default function TextResponse({ content }: TextResponseProps) {
  const { theme } = useTheme()

  return (
    <motion.div className="glass-panel rounded-lg p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-blue-500/20">
          <span className="text-blue-400">🤖</span>
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-2`}>
            Respuesta:
          </p>
          <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {content.text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
