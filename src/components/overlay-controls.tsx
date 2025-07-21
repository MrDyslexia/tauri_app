"use client";

import { useState, useEffect } from "react";
import { Button, Checkbox, Switch } from "@heroui/react";
import { Minimize2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTauriCommands } from "@/hooks/use-tauri-commands";

interface OverlayControlsProps {
  onToggleVisibility?: () => void;
}

export default function OverlayControls({
  onToggleVisibility,
}: OverlayControlsProps) {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { setAlwaysOnTop, minimizeToTray, getWindowPosition } =
    useTauriCommands();

  useEffect(() => {
    // Obtener posición inicial
    getWindowPosition().then((pos) => {
      if (pos) {
        setPosition({ x: pos[0], y: pos[1] });
      }
    });
  }, [getWindowPosition]);

  const handleAlwaysOnTopToggle = async (value: boolean) => {
    setIsAlwaysOnTop(value);
    await setAlwaysOnTop(value);
  };

  const handleMinimize = async () => {
    await minimizeToTray();
  };

  return (
    <div className="relative">
      {/* Barra de título personalizada */}
      <motion.div
        className="h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/40 backdrop-blur-sm rounded-t-xl flex items-center justify-between px-3 cursor-move"
        data-tauri-drag-region="true"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
              <Button
                size="md"
                variant="light"
                onPress={() => {
                  setShowSettings(!showSettings);
                }}
              >
                <Settings size={18} color="white" />
              </Button>

              <Button size="md" variant="light" onPress={handleMinimize}>
                <Minimize2 size={18} color="white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Panel de controles expandido */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute top-8 right-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-b-lg shadow-lg z-50 w-1/2 "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 grid grid-cols-[70%_30%] gap-3 items-center">
              <span className="text-xs font-medium text-gray-700">
                Position
              </span>
              <div className="text-xs text-gray-500 items-center justify-self-center">
                {position.x}, {position.y}
              </div>
              <span className="text-xs font-medium text-gray-700">
                Always on Top
              </span>
              <Switch
                size="sm"
                isSelected={isAlwaysOnTop}
                onValueChange={handleAlwaysOnTopToggle}
              />

              <span className="text-xs font-medium text-gray-700">
                Option 2
              </span>
              <Switch
                size="sm"
                onValueChange={() => {
                  console.log("ss");
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
