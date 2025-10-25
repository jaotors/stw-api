import { Request, Response, NextFunction } from 'express'
import prismaClient from '../prima-client'
import { getWordsFromAI } from '../services/openai'

export const createWords = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const result = await getWordsFromAI()
    const words = result?.words

    if (!words) {
      res.status(500).json({ message: 'Failed to fetch words from AI' })
      return
    }

    const wordCount = await prismaClient.word.createMany({
      data: words,
      skipDuplicates: true,
    })

    console.log('Created words count:', wordCount)
    res.status(201).json(wordCount)
  } catch (error) {
    next(error)
  }
}

export const getWords = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const words = await prismaClient.word.findMany()

    res.json(words)
  } catch (error) {
    next(error)
  }
}

export const getWordById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10)
    const word = await prismaClient.word.findUnique({
      where: { id },
    })

    if (!word) {
      res.status(404).json({ message: 'Word not found' })
      return
    }

    res.json(word)
  } catch (error) {
    next(error)
  }
}
