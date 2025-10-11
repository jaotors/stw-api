import { Router } from 'express'
import {
  createWord,
  getWords,
  getWordById,
  updateWord,
  deleteWord,
} from '../controllers/word-controller'

const router = Router()

router.get('/', getWords)
router.get('/:id', getWordById)
router.post('/', createWord)
router.put('/:id', updateWord)
router.delete('/:id', deleteWord)

export default router
