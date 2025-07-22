"use client"

import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import IndexPage from "@/pages/index"
import AssistantPage from "@/pages/assistant"

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
