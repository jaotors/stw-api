import { Request, Response, NextFunction } from 'express'
import prismaClient from '../prima-client'

export const createWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { word, meaning, sentence } = req.body

    const newWord = await prismaClient.word.create({
      data: {
        word,
        meaning,
        sentence,
      },
    })

    res.status(201).json(newWord)
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

export const updateWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { meaning: newMeaning, sentence: newSentence } = req.body

    const updatedWord = await prismaClient.word.update({
      where: { id },
      data: {
        meaning: newMeaning,
        sentence: newSentence,
      },
    })

    res.json(updatedWord)
  } catch (error) {
    next(error)
  }
}

export const deleteWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10)
    const deletedItem = await prismaClient.word.delete({
      where: { id },
    })

    res.json(deletedItem)
  } catch (error) {
    next(error)
  }
}
