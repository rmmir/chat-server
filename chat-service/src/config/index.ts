import { config } from 'dotenv'

config({ path: `./.env` })

const { MONGO_URI, PORT, JWT_SECRET, ENV, MESSAGE_BROKER_URL } = process.env

const queue = { notifications: 'NOTIFICATIONS' }

export default {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    ENV,
    MESSAGE_BROKER_URL,
    queue,
}
