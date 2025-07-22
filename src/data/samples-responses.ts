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
      imageUrl: "https://external-preview.redd.it/ai-agents-in-php-with-mcp-model-context-protocol-v0-3dqjhNc0LJGBk5kNWbljQP75BPWYbErax9GEOasabdE.jpg?auto=webp&s=5333d30a653f23d67bf83213afa46ef9663107f7",
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
          image: "https://static.myshop.cl/32332/1_1735308148000.png",
          rating: 4.8,
          url: "https://www.myshop.cl/producto/samsung-dg300-24-p32332",
          specs: ["M3 Chip", "16GB RAM", "512GB SSD"],
        },
        {
          name: "Dell XPS 13",
          price: "$1,299",
          image: "https://media.spdigital.cl/thumbnails/products/1748439767738-c1_cdeb8de4_thumbnail_512.png",
          rating: 4.6,
          url: "https://www.spdigital.cl/gabinete-gamer-antec-performance-1-m-black-mini-itx-con-paneles-de-aluminio-y-soporte-pcie-40/",
          specs: ["Intel i7", "16GB RAM", "1TB SSD"],
        },
        {
          name: "ThinkPad X1 Carbon",
          price: "$1,599",
          image: "https://www.myshop.cl/producto/monitor-236-curvo-aoc-c24g2-full-hd-1920x1080-1-ms-165-hz-va-p20410",
          rating: 4.7,
          url: "#",
          specs: ["Intel i7", "32GB RAM", "1TB SSD"],
        },
      ],
    },
    timestamp: new Date(),
  },
]
