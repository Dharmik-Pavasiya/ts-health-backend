import { Connection } from 'mongoose'
import { RateLimiterMongo } from 'rate-limiter-flexible'

export let rateLimiterMongo: null | RateLimiterMongo = null

const DURATION = 60
const POINTS = 10

export const initRateLimiter = (mongooseConntection: Connection) => {
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConntection,
        points: POINTS,
        duration: DURATION
    })
}
