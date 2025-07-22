"use client"

import { Button, Input } from "@heroui/react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import { User, Lock, Sparkles } from "lucide-react"

interface LoginViewProps {
  onLogin: () => void
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-3">
        <motion.div
          className="mx-auto w-16 h-16 rounded-full glass-panel flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className={`w-8 h-8 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
        </motion.div>

        <h1 className="text-2xl font-light gradient-text">AI Assistant</h1>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Accede a tu asistente inteligente
        </p>
      </div>

      <div className="space-y-4">
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
          <div className="relative">
            <User
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            />
            <Input
              className="glass-input pl-10"
              id="email"
              type="email"
              placeholder="tu@email.com"
              classNames={{
                input: `${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`,
                inputWrapper: "glass-input border-0 bg-transparent",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Contraseña
          </label>
          <div className="relative">
            <Lock
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            />
            <Input
              className="glass-input pl-10"
              id="password"
              type="password"
              placeholder="••••••••"
              classNames={{
                input: `${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`,
                inputWrapper: "glass-input border-0 bg-transparent",
              }}
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button className="w-full glass-button hover-glow" onPress={onLogin} size="lg">
            <motion.span
              className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              whileHover={{ scale: 1.05 }}
            >
              Iniciar Sesión
            </motion.span>
          </Button>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
            ¿Olvidaste tu contraseña?{" "}
            <button
              className={`${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"} transition-colors`}
            >
              Recuperar
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
