import type { AssistantResponse } from "@/types/interfaces"

export const sampleResponses: AssistantResponse[] = [
  {
    id: "1",
    type: "text",
    query: "What is artificial intelligence?",
    content: {
      text: "Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, and understanding natural language.",
    },
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "image",
    query: "Show me the Eiffel Tower",
    content: {
      text: "Here's the iconic Eiffel Tower in Paris, France:",
      imageUrl: "/placeholder.svg?height=300&width=400",
      caption: "The Eiffel Tower - 324 meters tall, built in 1889",
    },
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "links",
    query: "Best resources to learn React",
    content: {
      text: "Here are some excellent resources to learn React:",
      links: [
        {
          title: "Official React Documentation",
          url: "https://react.dev",
          description: "The official guide and reference",
        },
        {
          title: "React Tutorial for Beginners",
          url: "https://reactjs.org/tutorial",
          description: "Step-by-step tutorial",
        },
        {
          title: "React Patterns",
          url: "https://reactpatterns.com",
          description: "Common React patterns and best practices",
        },
      ],
    },
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "products",
    query: "Best laptops for programming",
    content: {
      text: "Here are some top-rated laptops for programming:",
      products: [
        {
          name: "MacBook Pro M3",
          price: "$1,999",
          image: "/placeholder.svg?height=150&width=200",
          rating: 4.8,
          url: "#",
          specs: ["M3 Chip", "16GB RAM", "512GB SSD"],
        },
        {
          name: "Dell XPS 13",
          price: "$1,299",
          image: "/placeholder.svg?height=150&width=200",
          rating: 4.6,
          url: "#",
          specs: ["Intel i7", "16GB RAM", "1TB SSD"],
        },
        {
          name: "ThinkPad X1 Carbon",
          price: "$1,599",
          image: "/placeholder.svg?height=150&width=200",
          rating: 4.7,
          url: "#",
          specs: ["Intel i7", "32GB RAM", "1TB SSD"],
        },
      ],
    },
    timestamp: new Date(),
  },
]
