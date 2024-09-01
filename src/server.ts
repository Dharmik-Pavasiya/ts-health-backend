import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)

;(() => {
    try {
        console.info(`Application Info`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        console.error(`Application Erro`, {
            meta: err
        })
        server.close((error) => {
            if (error) {
                console.error(`Application Error`, {
                    meta: err
                })
            }

            process.exit(1)
        })
    }
})()
