import express from 'express'
import dictionaryRoutes from './routes/dictionary-routes'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())

app.use('/api/dictionary', dictionaryRoutes)

app.use(errorHandler)

export default app
