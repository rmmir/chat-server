import express from 'express'
import { Server } from 'http'
import userRouter from './routes/authRoutes'
import { errorConverter, errorHandler } from './middleware'
import { connectToDB } from './database'
import config from './config'
import { initializeRabbitMQClient } from './services/RabbitMQService'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(errorConverter)
app.use(errorHandler)

connectToDB()

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`))

initializeRabbitMQClient()

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error)
    process.exit(1)
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
