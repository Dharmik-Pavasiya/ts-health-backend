import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'

// Linking trace support
sourceMapSupport.install()

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = level.toUpperCase()
    const customTimeStamp = timestamp

    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })

    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${'META'} ${customMeta}`

    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV == EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

const fileLogFormate = format.printf((info) => {
    const { level, message, timestamp } = info

    const logMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(logMeta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const FileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormate)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...FileTransport(), ...consoleTransport()]
})
