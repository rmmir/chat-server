import { Router } from 'express'
import MessageController from '../controllers/MessageController'
import { authMiddleware } from '../middleware'

const messageRoutes = Router()

messageRoutes.post('/send', authMiddleware, MessageController.send)
messageRoutes.get(
    '/get/:receiverId',
    authMiddleware,
    MessageController.getConversation
)

export default messageRoutes
