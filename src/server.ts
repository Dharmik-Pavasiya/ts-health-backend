import app from './app'
import config from './config/config'
import logger from './utils/logger'

const server = app.listen(config.PORT)

;(() => {
    try {
        logger.info(`Application Info`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`Application Erro`, {
            meta: err
        })
        server.close((error) => {
            if (error) {
                logger.error(`Application Error`, {
                    meta: err
                })
            }

            process.exit(1)
        })
    }
})()
