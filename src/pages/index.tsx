"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import OverlayControls from "@/components/overlay-controls"
import LoginView from "@/components/views/login-view"
import HomeView from "@/components/views/home-view"
import ChatView from "@/components/views/chat-view"
import ResponseView from "@/components/views/response-view"
import { sampleResponses } from "@/data/samples-responses"
import type { AssistantResponse } from "@/types/interfaces"

export default function IndexPage() {
  const [currentView, setCurrentView] = useState<"login" | "home" | "chat" | "response">("login")
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

  return (
    <div className="fixed top-4 right-4 w-96 z-50">
      <div className="space-y-0">
        <OverlayControls />
        <div data-tauri-drag-region="false" className="bg-white/95 backdrop-blur-md rounded-b-xl shadow-xl">
          <div className="p-4">
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
