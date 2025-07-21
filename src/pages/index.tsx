"use client"

import { useState } from "react"
import { Card, CardHeader, CardBody, Button, Input, Badge } from "@heroui/react"
import { Mic, Search, History, ExternalLink, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import OverlayControls from "@/components/overlay-controls"

// Tipos de respuesta del asistente
type ResponseType = "text" | "image" | "links" | "products" | "weather" | "calendar"

interface AssistantResponse {
  id: string
  type: ResponseType
  query: string
  content: any
  timestamp: Date
}

export default function IndexPage() {
  const [currentView, setCurrentView] = useState<"login" | "home" | "chat" | "response">("login")
  const [isListening, setIsListening] = useState(false)
  const [currentResponse, setCurrentResponse] = useState<AssistantResponse | null>(null)

  // Ejemplos de respuestas del asistente
  const sampleResponses: AssistantResponse[] = [
    {
      id: "1",
      type: "text",
      query: "What is artificial intelligence?",
      content: {
        text: "Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, and understanding natural language.",
      },
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "image",
      query: "Show me the Eiffel Tower",
      content: {
        text: "Here's the iconic Eiffel Tower in Paris, France:",
        imageUrl: "/placeholder.svg?height=300&width=400",
        caption: "The Eiffel Tower - 324 meters tall, built in 1889",
      },
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "links",
      query: "Best resources to learn React",
      content: {
        text: "Here are some excellent resources to learn React:",
        links: [
          {
            title: "Official React Documentation",
            url: "https://react.dev",
            description: "The official guide and reference",
          },
          {
            title: "React Tutorial for Beginners",
            url: "https://reactjs.org/tutorial",
            description: "Step-by-step tutorial",
          },
          {
            title: "React Patterns",
            url: "https://reactpatterns.com",
            description: "Common React patterns and best practices",
          },
        ],
      },
      timestamp: new Date(),
    },
    {
      id: "4",
      type: "products",
      query: "Best laptops for programming",
      content: {
        text: "Here are some top-rated laptops for programming:",
        products: [
          {
            name: "MacBook Pro M3",
            price: "$1,999",
            image: "/placeholder.svg?height=150&width=200",
            rating: 4.8,
            url: "#",
            specs: ["M3 Chip", "16GB RAM", "512GB SSD"],
          },
          {
            name: "Dell XPS 13",
            price: "$1,299",
            image: "/placeholder.svg?height=150&width=200",
            rating: 4.6,
            url: "#",
            specs: ["Intel i7", "16GB RAM", "1TB SSD"],
          },
          {
            name: "ThinkPad X1 Carbon",
            price: "$1,599",
            image: "/placeholder.svg?height=150&width=200",
            rating: 4.7,
            url: "#",
            specs: ["Intel i7", "32GB RAM", "1TB SSD"],
          },
        ],
      },
      timestamp: new Date(),
    },
  ]

  const LoginView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <h1 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Assistant
          </h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Email</div>
            <Input className="h-9" id="email" type="email" />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Password</div>
            <Input className="h-9" id="password" type="password" />
          </div>
          <Button
            className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onPress={() => setCurrentView("home")}
          >
            Sign In
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  )

  const HomeView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <h1 className="text-lg font-light">Recent Searches</h1>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="space-y-2">
            {sampleResponses.map((response, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer hover-glow"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCurrentResponse(response)
                  setCurrentView("response")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentResponse(response)
                    setCurrentView("response")
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <History className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 flex-1">{response.query}</span>
                <Badge className="text-xs" variant="flat">
                  {response.type}
                </Badge>
              </motion.div>
            ))}
          </div>
          <Button
            className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4"
            onPress={() => setCurrentView("chat")}
          >
            <Search className="h-4 w-4 mr-2" />
            New Search
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  )

  const ChatView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <Button className="text-gray-600" size="sm" variant="ghost" onPress={() => setCurrentView("home")}>
            ← Back
          </Button>
          <h1 className="text-lg font-light">AI Assistant</h1>
          <div className="w-8"></div>
        </CardHeader>
        <CardBody className="space-y-4">
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
              className="h-9 w-9"
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
            {sampleResponses.map((response, index) => (
              <Button
                key={index}
                size="sm"
                variant="flat"
                className="h-7 text-xs"
                onClick={() => {
                  setCurrentResponse(response)
                  setCurrentView("response")
                }}
              >
                {response.type} Example
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )

  const ResponseView = () => {
    if (!currentResponse) return null

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <Button className="text-gray-600" size="sm" variant="ghost" onPress={() => setCurrentView("chat")}>
              ← Back
            </Button>
            <Badge variant="flat">{currentResponse.type}</Badge>
            <div className="w-8"></div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-900">{currentResponse.query}</p>
            </div>

            {/* Componente de Respuesta de Texto */}
            {currentResponse.type === "text" && (
              <motion.div
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm leading-relaxed">{currentResponse.content.text}</p>
              </motion.div>
            )}

            {/* Componente de Respuesta con Imagen */}
            {currentResponse.type === "image" && (
              <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-sm">{currentResponse.content.text}</p>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <img
                    src={currentResponse.content.imageUrl || "/placeholder.svg"}
                    alt={currentResponse.content.caption}
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="text-xs text-gray-600 mt-2">{currentResponse.content.caption}</p>
                </div>
              </motion.div>
            )}

            {/* Componente de Respuesta con Links */}
            {currentResponse.type === "links" && (
              <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-sm">{currentResponse.content.text}</p>
                <div className="space-y-2">
                  {currentResponse.content.links.map((link: any, index: number) => (
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
            )}

            {/* Componente de Respuesta con Productos */}
            {currentResponse.type === "products" && (
              <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-sm">{currentResponse.content.text}</p>
                <div className="space-y-3">
                  {currentResponse.content.products.map((product: any, index: number) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg hover-glow"
                      whileHover={{ scale: 1.02 }}
                    >
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
                            {product.specs.map((spec: string, i: number) => (
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
            )}

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-xs text-gray-500">{currentResponse.timestamp.toLocaleTimeString()}</span>
              <Button className="text-xs" size="sm" variant="ghost">
                Save Response
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="w-full h-screen bg-transparent overlay-container">
      <OverlayControls />

      <div className="p-4" data-tauri-drag-region="false">
        <AnimatePresence mode="wait">
          {currentView === "login" && <LoginView />}
          {currentView === "home" && <HomeView />}
          {currentView === "chat" && <ChatView />}
          {currentView === "response" && <ResponseView />}
        </AnimatePresence>
      </div>
    </div>
  )
}
