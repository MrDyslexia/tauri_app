"use client"

import { useState, useEffect } from "react"
import { Button, Switch } from "@heroui/react"
import { Minimize2, Pin, PinOff, Move, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTauriCommands } from "@/hooks/use-tauri-commands"

interface OverlayControlsProps {
  onToggleVisibility?: () => void
}

export default function OverlayControls({ onToggleVisibility }: OverlayControlsProps) {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { setAlwaysOnTop, minimizeToTray, setWindowPosition, getWindowPosition } = useTauriCommands()

  useEffect(() => {
    // Obtener posición inicial
    getWindowPosition().then((pos) => {
      if (pos) {
        setPosition({ x: pos[0], y: pos[1] })
      }
    })
  }, [getWindowPosition])

  const handleAlwaysOnTopToggle = async (value: boolean) => {
    setIsAlwaysOnTop(value)
    await setAlwaysOnTop(value)
  }

  const handleMinimize = async () => {
    await minimizeToTray()
  }

  return (
    <div className="relative">
      {/* Barra de título personalizada */}
      <motion.div
        className="h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-t-xl flex items-center justify-between px-3 cursor-move"
        data-tauri-drag-region="true"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs font-medium text-gray-700">AI Assistant</span>
        </div>

        <AnimatePresence>
          {showControls && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                variant="light"
                className="h-6 w-6 min-w-6"
                onPress={() => setShowControls(!showControls)}
              >
                <Settings className="h-3 w-3" />
              </Button>

              <Button size="sm" variant="light" className="h-6 w-6 min-w-6" onPress={handleMinimize}>
                <Minimize2 className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Panel de controles expandido */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute top-8 left-0 right-0 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-b-lg shadow-lg z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Always on Top</span>
                <Switch size="sm" isSelected={isAlwaysOnTop} onValueChange={handleAlwaysOnTopToggle} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Position</span>
                <div className="text-xs text-gray-500">
                  {position.x}, {position.y}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  className="flex-1 h-7 text-xs"
                  startContent={<Move className="h-3 w-3" />}
                  onPress={() => {
                    // Actualizar posición cuando se mueva
                    getWindowPosition().then((pos) => {
                      if (pos) {
                        setPosition({ x: pos[0], y: pos[1] })
                      }
                    })
                  }}
                >
                  Refresh Position
                </Button>

                <Button
                  size="sm"
                  variant="flat"
                  className="flex-1 h-7 text-xs"
                  startContent={isAlwaysOnTop ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                  onPress={() => handleAlwaysOnTopToggle(!isAlwaysOnTop)}
                >
                  {isAlwaysOnTop ? "Unpin" : "Pin"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
