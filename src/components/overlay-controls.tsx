"use client"

import { useState, useEffect } from "react"
import { Button, Switch } from "@heroui/react"
import { Minimize2, Settings, ArrowLeft, EyeOff, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTauriCommands } from "@/hooks/use-tauri-commands"
import { useTheme } from "@/hooks/use-theme"

interface OverlayControlsProps {
  onBackToSphere?: () => void
}

export default function OverlayControls({ onBackToSphere }: OverlayControlsProps) {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { theme, toggleTheme } = useTheme()
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
        className="h-8 glass-panel rounded-t-xl flex items-center justify-between px-3 cursor-move"
        data-tauri-drag-region="true"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.2)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            AI Assistant
          </span>
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
              <Button
                size="sm"
                variant="light"
                onPress={toggleTheme}
                className="min-w-unit-8 w-8 h-8"
                title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
              >
                {theme === "dark" ? <Sun size={16} color="white" /> : <Moon size={16} color="gray" />}
              </Button>

              {onBackToSphere && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={onBackToSphere}
                  className="min-w-unit-8 w-8 h-8"
                  title="Volver a la esfera"
                >
                  <ArrowLeft size={16} color={theme === "dark" ? "white" : "gray"} />
                </Button>
              )}

              <Button
                size="sm"
                variant="light"
                onPress={() => setShowSettings(!showSettings)}
                className="min-w-unit-8 w-8 h-8"
                title="Configuración"
              >
                <Settings size={16} color={theme === "dark" ? "white" : "gray"} />
              </Button>

              <Button
                size="sm"
                variant="light"
                onPress={handleMinimize}
                className="min-w-unit-8 w-8 h-8"
                title="Minimizar a la barra de tareas"
              >
                <Minimize2 size={16} color={theme === "dark" ? "white" : "gray"} />
              </Button>

              <Button
                size="sm"
                variant="light"
                onPress={handleHideToTray}
                className="min-w-unit-8 w-8 h-8"
                title="Ocultar en iconos ocultos"
              >
                <EyeOff size={16} color={theme === "dark" ? "white" : "gray"} />
              </Button>

              <Button
                size="sm"
                variant="light"
                onPress={handleQuit}
                className="min-w-unit-8 w-8 h-8"
                title="Cerrar aplicación"
              >
                <X size={16} color={theme === "dark" ? "white" : "gray"} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute top-8 right-0 glass-panel rounded-b-lg shadow-lg z-50 min-w-72"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Posición
                </span>
                <span className={`text-xs font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {position.x}, {position.y}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Tema
                </span>
                <Button size="sm" variant="flat" onPress={toggleTheme} className="glass-button text-xs">
                  {theme === "dark" ? <Sun size={14} className="mr-1" /> : <Moon size={14} className="mr-1" />}
                  {theme === "dark" ? "Claro" : "Oscuro"}
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Siempre encima
                </span>
                <Switch size="sm" isSelected={isAlwaysOnTop} onValueChange={handleAlwaysOnTopToggle} />
              </div>

              <div className={`pt-2 border-t ${theme === "dark" ? "border-gray-600" : "border-gray-200"}`}>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="flat" onPress={handleMinimize} className="glass-button text-xs">
                    <Minimize2 size={14} className="mr-1" />
                    Minimizar
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    onPress={handleHideToTray}
                    className="glass-button text-xs"
                  >
                    <EyeOff size={14} className="mr-1" />
                    Al Tray
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={handleQuit}
                  className="glass-button text-xs w-full mt-2"
                >
                  <X size={14} className="mr-1" />
                  Cerrar App
                </Button>

                <div className={`mt-3 text-xs space-y-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
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
