import { NextFunction, Request, Response } from 'express'
import httpReponse from '../utils/httpReponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpReponse(req, res, 200, responseMessage.SUCCESS, { id: 1 })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
