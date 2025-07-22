"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import VirtualAssistantSphere from "@/components/VirtualAssistantSphere"
import { useState } from "react";

export default function IndexPage() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  const menuItems = [
    { label: "Nueva tarea", icon: "✨" },
    { label: "Estado del sistema", icon: "📊" },
    { label: "Configuración", icon: "⚙️" },
    { label: "Pensar", icon: "💭" },
  ];

  const handleMenuAction = (action: string) => {
    setIsOpen(false); // Cerrar el menú después de seleccionar
    
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
      case "Pensar":
        setIsThinking(true)
        setTimeout(() => setIsThinking(false), 5000)
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
      <VirtualAssistantSphere 
        onMenuAction={handleMenuAction} 
        menuItems={menuItems} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isThinking={isThinking} 
        setIsThinking={setIsThinking} 
      />
    </motion.div>
  )
}