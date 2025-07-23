import { useState, useEffect } from "react"
import { Button, Switch } from "@heroui/react"
import { Minimize2, Settings, ArrowLeft, EyeOff, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTauriCommands } from "@/hooks/use-tauri-commands"

interface OverlayControlsProps {
  onBackToSphere?: () => void
}

export default function OverlayControls({ onBackToSphere }: OverlayControlsProps) {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { setAlwaysOnTop, minimizeWindow, hideToTray, getWindowPosition, quitApp } = useTauriCommands()

  useEffect(() => {
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
    await minimizeWindow()
  }

  const handleHideToTray = async () => {
    await hideToTray()
  }

  const handleQuit = async () => {
    await quitApp()
  }

  return (
    <div className="relative">
      <motion.div
        className="h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/40 backdrop-blur-sm rounded-t-xl flex items-center justify-between pl-3 cursor-move"
        data-tauri-drag-region="true"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-white">AI Assistant</span>
        </div>

        <AnimatePresence>
          {showControls && (
            <motion.div
              data-tauri-drag-region="false"
              className="flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {onBackToSphere && (
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  onPress={onBackToSphere}
                  className="min-w-unit-8 w-8 h-8"
                  title="Volver a la esfera"
                >
                  <ArrowLeft size={16} color="white" />
                </Button>
              )}

              <Button
                size="sm"
                variant="light"
                onPress={() => setShowSettings(!showSettings)}
                className="min-w-unit-8 w-8 h-8"
                title="Configuración"
                isIconOnly
              >
                <Settings size={16} color="white" />
              </Button>

              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={handleMinimize}
                className="min-w-unit-8 w-8 h-8"
                title="Minimizar a la barra de tareas"
              >
                <Minimize2 size={16} color="white" />
              </Button>

              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={handleHideToTray}
                className="min-w-unit-8 w-8 h-8"
                title="Ocultar en iconos ocultos"
              >
                <EyeOff size={16} color="white" />
              </Button>

              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={handleQuit}
                className="min-w-unit-8 w-8 h-8"
                title="Cerrar aplicación"
              >
                <X size={16} color="white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute top-8 right-0 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-b-lg shadow-lg z-50 min-w-72"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Posición</span>
                <span className="text-xs text-gray-500 font-mono">
                  {position.x}, {position.y}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Siempre encima</span>
                <Switch size="sm" isSelected={isAlwaysOnTop} onValueChange={handleAlwaysOnTopToggle} />
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="flat" onPress={handleMinimize} className="text-xs">
                    <Minimize2 size={14} className="mr-1" />
                    Minimizar
                  </Button>
                  <Button size="sm" variant="flat" color="warning" onPress={handleHideToTray} className="text-xs">
                    <EyeOff size={14} className="mr-1" />
                    Al Tray
                  </Button>
                </div>
                <Button size="sm" variant="flat" color="danger" onPress={handleQuit} className="text-xs w-full mt-2">
                  <X size={14} className="mr-1" />
                  Cerrar App
                </Button>

                <div className="mt-3 text-xs text-gray-500 space-y-1">
                  <p>
                    <strong>Minimizar:</strong> Aparece en la barra de tareas
                  </p>
                  <p>
                    <strong>Al Tray:</strong> Se oculta en "iconos ocultos"
                  </p>
                  <p>
                    <strong>Cerrar:</strong> Cierra completamente la aplicación
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
