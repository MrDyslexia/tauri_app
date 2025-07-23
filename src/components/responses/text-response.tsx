"use client"

import { motion } from "framer-motion"
import type { TextContent } from "@/types/interfaces"

interface TextResponseProps {
  content: TextContent
}

export default function TextResponse({ content }: TextResponseProps) {
  return (
    <motion.div className="bg-gray-50 p-4 rounded-lg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm leading-relaxed">{content.text}</p>
    </motion.div>
  )
}
