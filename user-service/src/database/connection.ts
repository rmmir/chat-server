import mongoose from 'mongoose'
import config from '../config'

export const connectToDB = async () => {
    try {
        console.info("Connecting to the database...")
        await mongoose.connect(config.MONGO_URI!)
        console.info("Database has connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}