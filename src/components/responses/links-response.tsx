"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { LinksContent } from "@/types/interfaces"

interface LinksResponseProps {
  content: LinksContent
}

export default function LinksResponse({ content }: LinksResponseProps) {
  return (
    <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm">{content.text}</p>
      <div className="space-y-2">
        {content.links.map((link, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer hover-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-600">{link.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
