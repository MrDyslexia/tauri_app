"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import VirtualAssistantSphere from "@/components/VirtualAssistantSphere"
import { useState } from "react";

export default function IndexPage() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingInstruction, setThinkingInstruction] = useState("");
  const menuItems = [
    { label: "Nueva tarea", icon: "✨" },
    { label: "Estado del sistema", icon: "📊" },
    { label: "Configuración", icon: "⚙️" },
    { label: "Pensar", icon: "💭" },
  ];

  const handleMenuAction = (action: string) => {
    setIsOpen(false);
    
    switch (action) {
      case "Nueva tarea":
        navigate("/assistant")
        break
      case "Estado del sistema":
        setThinkingInstruction("Analizando métricas del sistema: CPU 72%, RAM 4.2/8GB, Disco 65% usado...");
        setIsThinking(true)
        setTimeout(() => setIsThinking(false), 5000)
        break
      case "Configuración":
        setThinkingInstruction("Cargando preferencias de usuario: tema oscuro, notificaciones activadas...");
        setIsThinking(true)
        setTimeout(() => setIsThinking(false), 4000)
        break
      case "Pensar":
        setThinkingInstruction("Investigar las últimas tendencias en IA generativa y preparar un resumen ejecutivo...");
        setIsThinking(true)
        setTimeout(() => {
          setIsThinking(false)
          setThinkingInstruction("");
        }, 6000)
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
        thinkingInstruction={thinkingInstruction}
      />
    </motion.div>
  )
}