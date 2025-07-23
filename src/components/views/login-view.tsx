"use client"

import { Button, Input } from "@heroui/react"
import { motion } from "framer-motion"

interface LoginViewProps {
  onLogin: () => void
}

export default function LoginView({ onLogin }: LoginViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-xl font-light gradient-text">AI Assistant</h1>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input className="h-9" id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input className="h-9" id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button
            className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onPress={onLogin}
          >
            Sign In
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
