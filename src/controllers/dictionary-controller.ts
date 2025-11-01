import { Request, Response, NextFunction } from 'express'
import prismaClient from '../prima-client'
import { getWordsFromAI } from '../services/openai'

export const getWord = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const word = await getWordTransaction()

    if (!word) {
      console.log('no word found, will create words')
      const newWords = await createWords()
      if (newWords === -1) {
        return null
      }

      const newAddedWord = await getWordTransaction()

      if (newAddedWord) {
        res.json(newAddedWord)
      } else {
        res.status(404).json({ message: 'Word not found' })
      }

      res.status(404).json({ message: 'Word not found' })
      return
    }

    res.json(word)
  } catch (error) {
    next(error)
  }
}

const getWordTransaction = async () => {
  const word = await prismaClient.$transaction(async (db) => {
    const item = await db.dictionary.findFirst({
      where: { display: false },
    })

    if (!item) {
      return null
    }

    await db.dictionary.update({
      where: { id: item.id },
      data: { display: true },
    })

    return item
  })

  return word
}

const createWords = async () => {
  try {
    const result = await getWordsFromAI()
    const words = result?.words

    if (!words) {
      return -1
    }

    const wordCount = await prismaClient.dictionary.createMany({
      data: words,
      skipDuplicates: true,
    })

    return wordCount
  } catch (error) {
    console.error('Error in creating words', error)
    return -1
  }
}
