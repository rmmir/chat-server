import { config } from 'dotenv'

config({ path: './.env' })

const {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    MONGO_URI,
    MESSAGE_BROKER_URL,
} = process.env

export default {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    MONGO_URI,
    MESSAGE_BROKER_URL,
}