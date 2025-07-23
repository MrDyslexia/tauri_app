"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VirtualAssistantSphere from "@/components/VirtualAssistantSphere";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
export default function IndexPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingInstruction, setThinkingInstruction] = useState("");
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const menuItems = [
    { label: "Nueva tarea", icon: "✨" },
    { label: "Estado del sistema", icon: "📊" },
    { label: "Configuración", icon: "⚙️" },
    { label: "Pensar", icon: "💭" },
  ];
  const loadDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }); // Solicitar permiso
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = allDevices.filter((d) => d.kind === "audioinput");
      setDevices(audioInputs);
    } catch (err) {
      console.error("Error al acceder a micrófonos:", err);
    }
  };
  const handleSelect = (deviceId: string, label: string) => {
    setSelected(deviceId);
    console.log("✅ Micrófono seleccionado:", label, deviceId);
    setSubMenuOpen(false);
  };

  const handleMenuAction = (action: string) => {
    setIsOpen(false);
    switch (action) {
      case "Nueva tarea":
        navigate("/assistant");
        break;
      case "Estado del sistema":
        setThinkingInstruction(
          "Analizando métricas del sistema: CPU 72%, RAM 4.2/8GB, Disco 65% usado..."
        );
        setIsThinking(true);
        setTimeout(() => setIsThinking(false), 5000);
        break;
      case "Configuración":
        loadDevices();
        setSubMenuOpen(true);
        setIsOpen(false);
        break;
      case "Pensar":
        setThinkingInstruction(
          "Investigar las últimas tendencias en IA generativa y preparar un resumen ejecutivo..."
        );
        setIsThinking(true);
        setTimeout(() => {
          setIsThinking(false);
          setThinkingInstruction("");
        }, 6000);
        break;
      default:
        console.log("Acción no reconocida:", action);
        break;
    }
  };

  useEffect(() => {
    invoke("resize_window_to_content", { width: 150, height: 150 });
  }, []);
  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen w-screen"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      {subMenuOpen && (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/50">
          <div className="text-xs text-gray-300 space-y-1">
            <label className="block font-semibold">Micrófono: {selected ? devices.find(d => d.deviceId === selected)?.label : "No seleccionado"}</label>
            {devices.length === 0 ? (
              <p className="text-red-400">No disponible</p>
            ) : (
              <select
                className="bg-black/50 text-white px-2 py-1 rounded w-full"
                onChange={(e) => {
                  const [id, label] = e.target.value.split("|");
                  handleSelect(id, label);
                }}
              >
                <option value="">Selecciona...</option>
                {devices.map((d) => (
                  <option key={d.deviceId} value={`${d.deviceId}|${d.label}`}>
                    {d.label || "Micrófono sin nombre"}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
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
  );
}
