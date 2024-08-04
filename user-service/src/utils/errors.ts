class BaseError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

class ValidationError extends BaseError {}

class PropertyRequiredError extends ValidationError {
    constructor(message: string) {
        super(`Property '${message}' is missing.`)
    }
}

class ApiError extends BaseError {
    statusCode: number

    constructor(
        statusCode: number,
        message: string,
    ) {
        super(message)
        this.statusCode = statusCode
    }
}

export { ApiError, BaseError, PropertyRequiredError, ValidationError }