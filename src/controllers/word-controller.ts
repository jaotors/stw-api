import { Request, Response, NextFunction } from 'express'

import type { Word } from '../models/word'
import { words } from '../models/word'

export const createWord = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('req.body', req.body)
    const { word, meaning, sentence } = req.body

    const newWord: Word = {
      id: words.length + 1,
      word,
      meaning,
      sentence,
    }
    words.push(newWord)
    res.status(201).json(newWord)
  } catch (error) {
    next(error)
  }
}

export const getWords = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(words)
  } catch (error) {
    next(error)
  }
}

export const getWordById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10)
    const word = words.find((word: Word) => word.id === id)
    if (!word) {
      res.status(404).json({ message: 'Word not found' })
      return
    }
    res.json(word)
  } catch (error) {
    next(error)
  }
}

export const updateWord = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10)
    const wordIndex = words.findIndex((word: Word) => word.id === id)

    if (wordIndex < 0) {
      res.status(404).json({ message: 'Word not found' })
      return
    }

    const { meaning: newMeaning, sentence: newSentence } = req.body

    words[wordIndex] = {
      ...words[wordIndex],
      meaning: newMeaning || words[wordIndex].meaning,
      sentence: newSentence || words[wordIndex].sentence,
    }

    res.json(words[wordIndex])
  } catch (error) {
    next(error)
  }
}

export const deleteWord = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10)
    const wordIndex = words.findIndex((word: Word) => word.id === id)

    if (wordIndex < 0) {
      res.status(404).json({ message: 'Word not found' })
      return
    }
    const deletedItem = words.splice(wordIndex, 1)[0]
    res.json(deletedItem)
  } catch (error) {
    next(error)
  }
}
