"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/use-theme"
import OverlayControls from "@/components/overlay-controls"
import LoginView from "@/components/views/login-view"
import HomeView from "@/components/views/home-view"
import ChatView from "@/components/views/chat-view"
import ResponseView from "@/components/views/response-view"
import { sampleResponses } from "@/data/samples-responses"
import type { AssistantResponse, ViewType } from "@/types/interfaces"

export default function AssistantPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [currentView, setCurrentView] = useState<ViewType>("login")
  const [currentResponse, setCurrentResponse] = useState<AssistantResponse | null>(null)

  const handleLogin = () => {
    setCurrentView("home")
  }

  const handleNewSearch = () => {
    setCurrentView("chat")
  }

  const handleSelectResponse = (response: AssistantResponse) => {
    setCurrentResponse(response)
    setCurrentView("response")
  }

  const handleBackToHome = () => {
    setCurrentView("home")
  }

  const handleBackToChat = () => {
    setCurrentView("chat")
  }

  const handleBackToSphere = () => {
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center w-full h-full z-50">
      <div className="space-y-0">
        <OverlayControls onBackToSphere={handleBackToSphere} />
        <div
          data-tauri-drag-region="false"
          className={`glass-panel rounded-b-2xl shadow-2xl min-w-96 max-w-md ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <div className="p-6">
            <AnimatePresence mode="wait">
              {currentView === "login" && <LoginView onLogin={handleLogin} />}
              {currentView === "home" && (
                <HomeView
                  responses={sampleResponses}
                  onNewSearch={handleNewSearch}
                  onSelectResponse={handleSelectResponse}
                />
              )}
              {currentView === "chat" && (
                <ChatView
                  responses={sampleResponses}
                  onBack={handleBackToHome}
                  onSelectResponse={handleSelectResponse}
                />
              )}
              {currentView === "response" && <ResponseView response={currentResponse} onBack={handleBackToChat} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
