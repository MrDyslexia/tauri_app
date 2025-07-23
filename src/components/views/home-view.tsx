"use client";

import { Button, Badge } from "@heroui/react";
import { Search, History } from "lucide-react";
import { motion } from "framer-motion";
import type { AssistantResponse } from "@/types/interfaces";

interface HomeViewProps {
  responses: AssistantResponse[];
  onNewSearch: () => void;
  onSelectResponse: (response: AssistantResponse) => void;
}

export default function HomeView({
  responses,
  onNewSearch,
  onSelectResponse,
}: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full gap-2"
    >
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-light text-gray-800">Recent Searches</h1>
      </div>

      {/* Lista de búsquedas (ocupa el espacio restante) */}
      <div className="flex-1 min-h-0 ">
        {responses.length > 0 ? (
          <motion.div
            className="h-full overflow-y-auto space-y-3 p-2"
            style={{ scrollbarGutter: "stable" }}
          >
            {responses.map((response, i) => (
              <Badge color="default" variant="solid" content={response.type}>
                <motion.div
                  key={`${response.query}-${i}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-gray-100 
                         hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectResponse(response)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelectResponse(response);
                    }
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <History className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-base text-gray-700 flex-1 truncate">
                    {response.query}
                  </span>
                </motion.div>
              </Badge>
            ))}
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-lg">No recent searches</p>
          </div>
        )}
      </div>

      {/* Botón (siempre al fondo) */}
      <div className="flex-shrink-0">
        <Button
          className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          onPress={onNewSearch}
          size="lg"
        >
          <Search className="h-5 w-5 mr-2" />
          New Search
        </Button>
      </div>
    </motion.div>
  );
}
