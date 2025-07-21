"use client"

import { motion } from "framer-motion"
import { Button, Badge } from "@heroui/react"
import { ShoppingCart } from "lucide-react"
import type { ProductsContent } from "@/types/interfaces"

interface ProductsResponseProps {
  content: ProductsContent
}

export default function ProductsResponse({ content }: ProductsResponseProps) {
  return (
    <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm">{content.text}</p>
      <div className="space-y-3">
        {content.products.map((product, index) => (
          <motion.div key={index} className="bg-gray-50 p-3 rounded-lg hover-glow" whileHover={{ scale: 1.02 }}>
            <div className="flex gap-3">
              <img
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
                src={product.image || "/placeholder.svg"}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <span className="text-sm font-bold text-green-600">{product.price}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-yellow-600">★ {product.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.specs.map((spec, i) => (
                    <Badge key={i} className="text-xs" variant="flat">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <Button className="mt-2 h-7 text-xs" size="sm">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  View Product
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
