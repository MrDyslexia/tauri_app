// Tipos de respuesta del asistente
export type ResponseType = "text" | "image" | "links" | "products" | "weather" | "calendar"

export type ViewType = "login" | "home" | "chat" | "response"

export interface AssistantResponse {
  id: string
  type: ResponseType
  query: string
  content: any
  timestamp: Date
}

export interface Link {
  title: string
  url: string
  description: string
}

export interface Product {
  name: string
  price: string
  image: string
  rating: number
  url: string
  specs: string[]
}

export interface TextContent {
  text: string
}

export interface ImageContent {
  text: string
  imageUrl: string
  caption: string
}

export interface LinksContent {
  text: string
  links: Link[]
}

export interface ProductsContent {
  text: string
  products: Product[]
}

// Contexto para el estado global
export interface AppContextType {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  currentResponse: AssistantResponse | null
  setCurrentResponse: (response: AssistantResponse | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
}
