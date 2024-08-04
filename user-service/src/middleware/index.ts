import { ErrorRequestHandler } from 'express'
import { ApiError, BaseError } from '../utils'
import { Request, Response, NextFunction } from 'express'

export const errorConverter: ErrorRequestHandler = (
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        const statusCode = err.statusCode || (err instanceof Error ? 400 : 500)
        const message =
            err.message ||
            (statusCode === 400 ? 'Bad Request' : 'Internal Server Error')

        next(new ApiError(statusCode, message))
    }

    next(err)
}

export const errorHandler: ErrorRequestHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = {
        code: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }

    if (process.env.NODE_ENV === 'development') {
        console.error(err)
    }

    res.status(err.statusCode).json(response)
    next()
}
