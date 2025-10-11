import express from 'express'
import wordRoutes from './routes/word-routes'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())

app.use('/api/words', wordRoutes)

app.use(errorHandler)

export default app
