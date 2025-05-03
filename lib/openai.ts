// lib/openai.ts
import OpenAI from "openai"

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ReportInput {
  bookTitle: string
  author: string
  level: string
  length: number
  sampleText?: string
  errorRate?: number // Controls intentional mistakes to match student writing
  language?: string // Supports multilingual reports
  targetGrade?: string // Target grade quality (A+, A, B+, etc.)
  focusAreas?: string[] // Specific areas to focus on (themes, characters, etc.)
}

/**
 * Generates a book report using OpenAI's GPT-4
 */
export async function generateReport({
  bookTitle,
  author,
  level,
  length,
  sampleText = "",
  errorRate = 0,
  language = "english",
  targetGrade = "A",
  focusAreas = [],
}: ReportInput): Promise<string> {
  // Education level profiling
  const educationProfile = getEducationProfile(level)

  // Style instructions based on sample text
  const styleInstruction = sampleText
    ? `Match the writing style of this sample: "${sampleText.substring(0, 500)}"`
    : `Write in a style typical of a ${educationProfile.description} student.`

  // Error instructions for realism
  const errorInstruction =
    errorRate > 0
      ? `Include approximately ${errorRate}% realistic student errors in grammar, spelling, or reasoning.`
      : "Use correct grammar and spelling appropriate for this education level."

  // Target grade quality
  const gradeQualityMap: Record<string, string> = {
    "A+": "exceptional, insightful, and original",
    A: "excellent and thorough",
    "B+": "very good with some depth",
    B: "good and competent",
    "C+": "satisfactory with basic understanding",
    C: "adequate but minimal",
  }

  const gradeQuality = gradeQualityMap[targetGrade] || "good"

  // Focus areas
  const focusAreasInstruction =
    focusAreas.length > 0 ? `Pay special attention to the following aspects: ${focusAreas.join(", ")}.` : ""

  // Create the complete prompt
  const prompt = `
Write a ${gradeQuality} book report about "${bookTitle}" by ${author}.
The report should be approximately ${length} words long.
This is for a ${educationProfile.description} student.

${styleInstruction}
${errorInstruction}
${focusAreasInstruction}

Include the following sections:
1. A brief introduction to the book
2. Summary of key events/plot (without revealing the ending if it's fiction)
3. Analysis of main themes or arguments
4. Analysis of key characters (for fiction) or evidence (for non-fiction)
5. Personal reaction or reflection
6. Conclusion

Write in ${language}.
Use vocabulary appropriate for a ${educationProfile.description} student (${educationProfile.vocabularyLevel} vocabulary level).
Make the analytical depth ${educationProfile.analyticalDepth}.
Create ${educationProfile.paragraphStructure}.
`

  try {
    // Call OpenAI API with retry logic
    const response = await callWithRetry(() =>
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7, // Add some creative variation
        max_tokens: Math.max(length * 2, 1000), // Ensure enough tokens for the response
      }),
    )

    // Extract and return the generated report
    const report = response.choices[0]?.message?.content

    if (!report) {
      throw new Error("Failed to generate book report")
    }

    return report
  } catch (error) {
    console.error("Error generating report:", error)
    throw new Error("Failed to generate book report. Please try again.")
  }
}

/**
 * Returns education level profile details
 */
function getEducationProfile(level: string) {
  const lowerLevel = level.toLowerCase()

  // Elementary school (grades 1-5)
  if (lowerLevel.includes("elementary")) {
    return {
      description: "elementary school",
      vocabularyLevel: "basic",
      analyticalDepth: "simple",
      paragraphStructure: "short paragraphs with 2-3 simple sentences each",
    }
  }

  // Middle school (grades 6-8)
  if (lowerLevel.includes("middle")) {
    return {
      description: "middle school",
      vocabularyLevel: "intermediate",
      analyticalDepth: "developing",
      paragraphStructure: "structured paragraphs with 3-5 sentences each",
    }
  }

  // High school (grades 9-12)
  if (lowerLevel.includes("high")) {
    return {
      description: "high school",
      vocabularyLevel: "advanced",
      analyticalDepth: "moderate analytical",
      paragraphStructure: "well-developed paragraphs with clear topic sentences",
    }
  }

  // College/University
  if (lowerLevel.includes("college")) {
    return {
      description: "college",
      vocabularyLevel: "college-level",
      analyticalDepth: "in-depth analytical",
      paragraphStructure: "complex paragraphs with supporting evidence and analysis",
    }
  }

  // Default to high school
  return {
    description: "high school",
    vocabularyLevel: "advanced",
    analyticalDepth: "moderate analytical",
    paragraphStructure: "well-developed paragraphs with clear topic sentences",
  }
}

/**
 * Retry logic for API calls
 */
async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: any

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      lastError = error

      // If it's not a rate limit error or it's the last attempt, don't retry
      if (!error.message.includes("rate limit") && !error.message.includes("timeout") && attempt === maxRetries - 1) {
        throw error
      }

      // Exponential backoff
      const backoffTime = delay * Math.pow(2, attempt)
      console.log(`Retrying after ${backoffTime}ms...`)
      await new Promise((resolve) => setTimeout(resolve, backoffTime))
    }
  }

  throw lastError
}
