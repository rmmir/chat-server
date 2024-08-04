import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ApiError, encryptPassword, isPasswordMatch } from '../utils'
import config from '../config'
import { UserData, User } from '../database'

const jwtSecret = config.JWT_SECRET!
const COOKIE_EXPIRATION_DAYS = 90
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
)
const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
}

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            throw new ApiError(400, 'User already exists!')
        }

        const user = await User.create({
            name,
            email,
            password: await encryptPassword(password),
        })

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        return res.json({
            status: 200,
            message: 'User registered successfully!',
            data: userData,
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')
        if (
            !user ||
            !(await isPasswordMatch(password, user.password as string))
        ) {
            throw new ApiError(400, 'Incorrect email or password')
        }

        const token = await createSendToken(user!, res)

        return res.json({
            status: 200,
            message: 'User logged in successfully!',
            token,
        })
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        })
    }
}

const createSendToken = async (user: UserData, res: Response) => {
    const { name, email, id } = user
    const token = jwt.sign({ name, email, id }, jwtSecret, {
        expiresIn: '1d',
    })

    res.cookie('jwt', token, cookieOptions)

    return token
}

export default {
    register,
    login,
}
