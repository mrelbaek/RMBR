import OpenAI from "openai"

// Create a singleton instance of the OpenAI client
let openaiInstance: OpenAI | null = null

// This function should only be called on the server
export function getOpenAIClient() {
  // Check if we're on the server
  if (typeof window !== "undefined") {
    throw new Error("OpenAI client should only be initialized on the server")
  }

  // Initialize the client if it doesn't exist
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      throw new Error("OpenAI API key is missing")
    }

    openaiInstance = new OpenAI({ apiKey })
  }

  return openaiInstance
}
