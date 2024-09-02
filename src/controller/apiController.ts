import { NextFunction, Request, Response } from 'express'
import httpReponse from '../utils/httpReponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'
import quicker from '../utils/quicker'

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpReponse(req, res, 200, responseMessage.SUCCESS, { id: 1 })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timeStamp: Date.now()
            }
            httpReponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
