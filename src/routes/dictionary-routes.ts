import { Router } from 'express'
import { getWord } from '../controllers/dictionary-controller'

const router = Router()

router.get('/word', getWord)

export default router
