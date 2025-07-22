"use client"

import { Button, Badge } from "@heroui/react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Share, Copy, Clock } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import type { AssistantResponse } from "@/types/interfaces"
import TextResponse from "@/components/responses/text-response"
import ImageResponse from "@/components/responses/image-response"
import LinksResponse from "@/components/responses/links-response"
import ProductsResponse from "@/components/responses/products-response"

interface ResponseViewProps {
  response: AssistantResponse | null
  onBack: () => void
}

export default function ResponseView({ response, onBack }: ResponseViewProps) {
  const { theme } = useTheme()

  if (!response) return null

  const renderResponseContent = () => {
    switch (response.type) {
      case "text":
        return <TextResponse content={response.content} />
      case "image":
        return <ImageResponse content={response.content} />
      case "links":
        return <LinksResponse content={response.content} />
      case "products":
        return <ProductsResponse content={response.content} />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return "📝"
      case "image":
        return "🖼️"
      case "links":
        return "🔗"
      case "products":
        return "🛍️"
      default:
        return "💬"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "primary"
      case "image":
        return "success"
      case "links":
        return "secondary"
      case "products":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Button className="glass-button" size="sm" variant="light" onPress={onBack}>
          <ArrowLeft className={`w-4 h-4 mr-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Atrás</span>
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-lg">{getTypeIcon(response.type)}</span>
          <Badge className="glass-button" variant="flat" color={getTypeColor(response.type) as any}>
            {response.type}
          </Badge>
        </div>

        <div className="w-16"></div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <motion.div
          className="glass-panel rounded-lg p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <span className="text-blue-400">❓</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-1`}>
                Tu pregunta:
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{response.query}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {renderResponseContent()}
        </motion.div>

        <motion.div
          className="glass-panel rounded-lg p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {response.timestamp.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button className="glass-button text-xs hover-glow" size="sm" variant="light">
                <Copy className="w-3 h-3 mr-1" />
                Copiar
              </Button>

              <Button className="glass-button text-xs hover-glow" size="sm" variant="light">
                <Share className="w-3 h-3 mr-1" />
                Compartir
              </Button>

              <Button className="glass-button text-xs hover-glow" size="sm" variant="light">
                <Save className="w-3 h-3 mr-1" />
                Guardar
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
