"use client"

import { useEffect, useState} from "react"
import { AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import OverlayControls from "@/components/overlay-controls"
import LoginView from "@/components/views/login-view"
import HomeView from "@/components/views/home-view"
import ChatView from "@/components/views/chat-view"
import ResponseView from "@/components/views/response-view"
import { sampleResponses } from "@/data/samples-responses"
import type { AssistantResponse, ViewType } from "@/types/interfaces"
import { invoke } from "@tauri-apps/api/core";

export default function AssistantPage() {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState<ViewType>("login")
  const [currentResponse, setCurrentResponse] = useState<AssistantResponse | null>(null)
  const handleLogin = () => {
    invoke("resize_window_to_content", { width: 400, height: 550 });
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
  useEffect(() => {
      if(currentView ==="login") {
        invoke("resize_window_to_content", { width: 400, height: 310 });
      }
    }, []);
  return (
    <div className="fixed w-full h-auto z-50">
      <div className="space-y-0">
        <OverlayControls onBackToSphere={handleBackToSphere} />
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
