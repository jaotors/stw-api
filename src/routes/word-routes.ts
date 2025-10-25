import { Router } from 'express'
import {
  createWords,
  getWords,
  getWordById,
} from '../controllers/word-controller'

const router = Router()

router.get('/', getWords)
router.get('/:id', getWordById)
router.post('/', createWords)

export default router
