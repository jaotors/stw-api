import app from './app'
import config from './config/config'

app.listen(config.port || 3001, () => {
  console.log(`Server running on port ${config.port}`)
})
