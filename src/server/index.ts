import express from 'express'
import { logger } from '../utils/logger'
import router from './router'

export function serve() {
  const app = express()
  const port = 3000

  app.use('/api/v1', router)

  app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`)
  })
}
