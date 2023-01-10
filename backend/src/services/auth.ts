import bcrypt from "bcryptjs";

export const createPasswordHash = async (password: string) => {
    return bcrypt.hash(password, 8);
}

export const checkPassword = async (user: any, password: string) => {
    return bcrypt.compare(password, user.password);
}