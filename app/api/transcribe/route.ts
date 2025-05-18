import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { text, enhance } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    let processedText = text

    // Apply AI enhancement if requested
    if (enhance) {
      const systemPrompt = `
        You are an AI assistant helping to enhance transcriptions for deaf users.
        Your task is to:
        1. Fix any grammatical errors or speech recognition mistakes
        2. Add punctuation where appropriate
        3. Format the text to be more readable
        4. Maintain the original meaning of the text
        5. Be concise and clear
      `

      const { text: enhancedText } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: `Enhance this transcription for readability: "${text}"`,
      })

      processedText = enhancedText
    }

    return NextResponse.json({
      original: text,
      processed: processedText,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing transcription:", error)
    return NextResponse.json({ error: "Failed to process transcription" }, { status: 500 })
  }
}

