import OpenAI from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const WordSchema = z.object({
  word: z.string(),
  meaning: z.string(),
  sentence: z.string(),
})

const WordsSchema = z.object({ words: z.array(WordSchema) })

export const getWordsFromAI = async () => {
  try {
    const response = await openai.responses.parse({
      model: 'gpt-4.1-nano',
      input: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        {
          role: 'user',
          content: `
            - Provide a simple yet advanced words from A to Z.
            - Make one sentence for each alphabet that you get.
            - Include the meaning of it but don't add it in the sentence.
            - Make the response to be the same as { words: [{"word": "example", "sentence": "This is an example sentence.", "meaning": "This is the meaning of the word"}, ...]}
          `,
        },
      ],
      text: {
        format: zodTextFormat(WordsSchema, 'words'),
      },
    })

    const words = response.output_parsed
    return words
  } catch (error: any) {
    console.error('Error generating completion:', error)
  }
}
