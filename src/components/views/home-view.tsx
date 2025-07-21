"use client"

import { Button, Badge } from "@heroui/react"
import { Search, History } from "lucide-react"
import { motion } from "framer-motion"
import type { AssistantResponse } from "@/types/interfaces"

interface HomeViewProps {
  responses: AssistantResponse[]
  onNewSearch: () => void
  onSelectResponse: (response: AssistantResponse) => void
}

export default function HomeView({ responses, onNewSearch, onSelectResponse }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div>
          <h1 className="text-lg font-light text-gray-800">Recent Searches</h1>
        </div>
        <div className="space-y-3">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {responses.map((response, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer hover-glow"
                role="button"
                tabIndex={0}
                onClick={() => onSelectResponse(response)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectResponse(response)
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <History className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 flex-1 truncate">{response.query}</span>
                <Badge className="text-xs" variant="flat">
                  {response.type}
                </Badge>
              </motion.div>
            ))}
          </div>
          <Button
            className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onPress={onNewSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            New Search
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
