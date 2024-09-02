import app from './app'
import config from './config/config'
import databaseService from './service/databaseService'
import logger from './utils/logger'

const server = app.listen(config.PORT)

;(async () => {
    try {
        // Database connection
        const connection = await databaseService.connect()
        logger.info(`Database Connection`, {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })

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
