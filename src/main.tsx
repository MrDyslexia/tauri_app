import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HeroUIProvider } from "@heroui/react"
import App from "./App.tsx"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeroUIProvider>
  </React.StrictMode>,
)
