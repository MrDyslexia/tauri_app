"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import VirtualAssistantSphere from "@/components/VirtualAssistantSphere"

export default function IndexPage() {
  const navigate = useNavigate()

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "Nueva tarea":
        navigate("/assistant")
        break
      case "Estado del sistema":
        console.log("Estado del sistema seleccionado")
        break
      case "Configuración":
        console.log("Configuración seleccionada")
        break
      default:
        console.log("Acción no reconocida:", action)
        break
    }
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen w-screen bg-transparent"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <VirtualAssistantSphere onMenuAction={handleMenuAction} />
    </motion.div>
  )
}
