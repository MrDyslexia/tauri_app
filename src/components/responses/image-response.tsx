import { motion } from "framer-motion"
import type { ImageContent } from "@/types/interfaces"

interface ImageResponseProps {
  content: ImageContent
}

export default function ImageResponse({ content }: ImageResponseProps) {
  return (
    <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm">{content.text}</p>
      <div className="bg-gray-50 p-2 rounded-lg">
        <img
          src={content.imageUrl || "/placeholder.svg"}
          alt={content.caption}
          className="w-full h-48 object-cover rounded"
        />
        <p className="text-xs text-gray-600 mt-2">{content.caption}</p>
      </div>
    </motion.div>
  )
}
