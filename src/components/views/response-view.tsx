"use client"

import { Button, Badge } from "@heroui/react"
import { motion } from "framer-motion"
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button className="text-gray-600" size="sm" variant="light" onPress={onBack}>
            ← Back
          </Button>
          <Badge variant="flat">{response.type}</Badge>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-900">{response.query}</p>
          </div>

          {renderResponseContent()}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-xs text-gray-500">{response.timestamp.toLocaleTimeString()}</span>
            <Button className="text-xs" size="sm" variant="light">
              Save Response
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
