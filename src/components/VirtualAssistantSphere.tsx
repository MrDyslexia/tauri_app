"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface VirtualAssistantSphereProps {
  onMenuAction: (action: string) => void
}

const VirtualAssistantSphere: React.FC<VirtualAssistantSphereProps> = ({ onMenuAction }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { label: "Nueva tarea", icon: "✨" },
    { label: "Estado del sistema", icon: "📊" },
    { label: "Configuración", icon: "⚙️" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        sphereRef.current &&
        !sphereRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <motion.div
        ref={sphereRef}
        className="fixed z-40 cursor-pointer"
        data-tauri-drag-region="true"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="relative w-20 h-20"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-pink-500/30 backdrop-blur-md border border-white/30 shadow-2xl"
            style={{
              boxShadow: `
                0 0 30px rgba(59, 130, 246, 0.6),
                inset 0 0 30px rgba(255, 255, 255, 0.2),
                0 0 80px rgba(168, 85, 247, 0.4)
              `,
            }}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <motion.div
                className="absolute inset-1/4 rounded-full bg-gradient-radial from-purple-500/50 via-transparent to-transparent"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            <motion.div
              className="absolute inset-0 rounded-full border border-blue-400/40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full shadow-lg"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-32 right-8 z-40 bg-slate-900/95 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl min-w-48"
          >
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-sm mb-3 text-center">Asistente IA</h3>
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onMenuAction(item.label)
                    setIsOpen(false)
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VirtualAssistantSphere
