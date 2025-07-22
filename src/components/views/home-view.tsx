"use client"

import { Button, Badge } from "@heroui/react"
import { Search, History, Plus, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import type { AssistantResponse } from "@/types/interfaces"

interface HomeViewProps {
  responses: AssistantResponse[]
  onNewSearch: () => void
  onSelectResponse: (response: AssistantResponse) => void
}

export default function HomeView({ responses, onNewSearch, onSelectResponse }: HomeViewProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className={`text-xl font-light ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Búsquedas Recientes
        </h1>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Continúa donde lo dejaste</p>
      </div>

      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Button className="w-full glass-button hover-glow" onPress={onNewSearch} size="lg">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Nueva Búsqueda</span>
              <Search className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            </div>
          </Button>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Historial
            </span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {responses.map((response, i) => (
              <motion.div
                key={i}
                className="glass-panel rounded-lg p-3 cursor-pointer hover-glow transition-all duration-200"
                role="button"
                tabIndex={0}
                onClick={() => onSelectResponse(response)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectResponse(response)
                  }
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      response.type === "text"
                        ? "bg-blue-500/20"
                        : response.type === "image"
                          ? "bg-green-500/20"
                          : response.type === "links"
                            ? "bg-purple-500/20"
                            : "bg-orange-500/20"
                    }`}
                  >
                    {response.type === "text" && <span className="text-blue-400">📝</span>}
                    {response.type === "image" && <span className="text-green-400">🖼️</span>}
                    {response.type === "links" && <span className="text-purple-400">🔗</span>}
                    {response.type === "products" && <span className="text-orange-400">🛍️</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                      {response.query}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className={`w-3 h-3 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                      <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                        {response.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <Badge
                    className="text-xs glass-button"
                    variant="flat"
                    color={
                      response.type === "text"
                        ? "primary"
                        : response.type === "image"
                          ? "success"
                          : response.type === "links"
                            ? "secondary"
                            : "warning"
                    }
                  >
                    {response.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
