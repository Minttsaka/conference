
"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Message } from "@/types/room"
import { compileMessageTemplate, sendMail } from "./mail"


type Data = {
    email:string,
    name:string,
    message:string
}
export const sendMessage = async(data:Data) =>{

    const { email, name, message } = data

    try {
        const body = compileMessageTemplate(name, message);
        await sendMail({ from: email, subject: "New contact from portfolio", body });

    
        }
        
    catch (error) {
  
      console.log(error)
    
    }
}


// Delete a message
export async function deleteMessage(messageId: string) {
  try {
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    revalidatePath('/');
    return true;
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw new Error('Failed to delete message');
  }
}


export async function enhanceTranscriptionAction(text: string): Promise<string> {
  try {
    return await enhanceTranscription(text)
  } catch (error) {
    console.error("Error in enhanceTranscriptionAction:", error)
    return text // Return original text on error
  }
}

/**
 * Server action to summarize a conversation
 */
export async function summarizeConversationAction(messages: Message[]): Promise<string> {
  try {
    return await summarizeConversation(messages)
  } catch (error) {
    console.error("Error in summarizeConversationAction:", error)
    return "Unable to generate summary."
  }
}

/**
 * Server action to extract key points from a conversation
 */
export async function extractKeyPointsAction(messages: Message[]): Promise<string[]> {
  try {
    return await extractKeyPoints(messages)
  } catch (error) {
    console.error("Error in extractKeyPointsAction:", error)
    return ["Unable to extract key points."]
  }
}


/**
 * Enhances a transcription for better readability
 */
export async function enhanceTranscription(text: string): Promise<string> {
  try {
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

    return enhancedText
  } catch (error) {
    console.error("Error enhancing transcription:", error)
    return text // Return original text if enhancement fails
  }
}

/**
 * Summarizes a conversation from a list of messages
 */
export async function summarizeConversation(messages: Message[]): Promise<string> {
  try {
    const conversationText = messages.map((msg) => `${msg.participantName}: ${msg.text}`).join("\n")

    const { text: summary } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: "Summarize the following conversation concisely while preserving key points.",
      prompt: `Summarize this conversation:\n${conversationText}`,
    })

    return summary
  } catch (error) {
    console.error("Error summarizing conversation:", error)
    return "Unable to generate summary."
  }
}

/**
 * Extracts key points from a conversation
 */
export async function extractKeyPoints(messages: Message[]): Promise<string[]> {
  try {
    const conversationText = messages.map((msg) => `${msg.participantName}: ${msg.text}`).join("\n")

    const { text: keyPointsText } = await generateText({
      model: openai("gpt-4o"),
      system: "Extract the 3-5 most important points from this conversation as a numbered list.",
      prompt: `Extract key points from this conversation:\n${conversationText}`,
    })

    // Parse the numbered list into an array
    const keyPoints = keyPointsText
      .split("\n")
      .filter((line) => /^\d+\./.test(line))
      .map((line) => line.replace(/^\d+\.\s*/, ""))

    return keyPoints
  } catch (error) {
    console.error("Error identifying key points:", error)
    return ["Unable to identify key points."]
  }
}


export async function transcribeAudio(formData: FormData) {
  try {
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return { error: "No audio file provided" }
    }

    // Convert the file to a Buffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Create form data for OpenAI API
    const form = new FormData()
    form.append("file", new Blob([buffer]), "audio.wav")
    form.append("model", "whisper-1")

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: form,
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenAI API error:", errorData)
      return { error: `OpenAI API error: ${errorData.error?.message || "Unknown error"}` }
    }

    const data = await response.json()
    return { transcript: data.text }
  } catch (error) {
    console.error("Error transcribing audio:", error)
    return { error: "Failed to transcribe audio" }
  }
}






