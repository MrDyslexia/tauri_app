import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface VirtualAssistantSphereProps {
  menuItems: { label: string; icon: string }[];
  onMenuAction: (action: string) => void;
  isOpen: boolean;
  isThinking: boolean;
  setIsOpen: (open: boolean) => void;
  setIsThinking?: (thinking: boolean) => void;
  thinkingInstruction?: string;
}

const VirtualAssistantSphere = ({
  menuItems,
  onMenuAction,
  isOpen,
  setIsOpen,
  isThinking,
  thinkingInstruction,
}: VirtualAssistantSphereProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isThinking || !thinkingInstruction) {
      setDisplayedText("");
      return;
    }
    
    const instruction = thinkingInstruction.slice(0, 120);
    let currentText = "";
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (currentText.length < instruction.length) {
        currentText += instruction.charAt(currentText.length);
        setDisplayedText(currentText);
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isThinking, thinkingInstruction]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        sphereRef.current &&
        !sphereRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <AnimatePresence>
        {isThinking && (
          <>
            <motion.div
              className="flex z-50 justify-start items-start max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="text-white text-xs text-center font-medium bg-black/30 rounded-md p-2 backdrop-blur-sm">
                <div className="typing-effect">
                  {displayedText}
                  <motion.span
                    className="inline-block w-1 h-4 bg-slate-800 ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-white text-xs font-medium bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.05, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                Pensando...
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                    scale: isThinking ? [0, 1.5, 0] : [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: isThinking
                      ? 1 + Math.random()
                      : 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <motion.div
                className="absolute inset-1/4 rounded-full bg-gradient-radial from-purple-500/50 via-transparent to-transparent"
                animate={{
                  scale: isThinking ? [1, 1.5, 1] : [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: isThinking ? 2 : 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            <motion.div
              className="absolute inset-0 rounded-full border border-blue-400/40"
              animate={{
                scale: isThinking ? [1, 1.5, 1] : [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: isThinking ? 1 : 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full shadow-lg"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              backgroundColor: isThinking ? "#fbbf24" : "#34d399",
            }}
            transition={{
              duration: 1,
              repeat: isHovered || isThinking ? Number.POSITIVE_INFINITY : 0,
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
              <h3 className="text-white font-semibold text-sm mb-3 text-center">
                Asistente IA
              </h3>
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onMenuAction(item.label);
                  }}
                  disabled={isThinking}
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
  );
};

export default VirtualAssistantSphere;
