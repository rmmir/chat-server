import bcrypt from 'bcryptjs'

const encryptPassword = async (password: string) => {
    return await bcrypt.hash(password, 12)
}

const isPasswordMatch = async (password: string, inputPassword: string) => {
    return await bcrypt.compare(password, inputPassword)
}

export { encryptPassword, isPasswordMatch }