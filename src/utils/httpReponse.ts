import { Request, Response } from 'express'
import { THttpReponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpReponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    // Log
    console.info(`Controller Response`, {
        meta: response
    })

    // Production Env Chcek
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
