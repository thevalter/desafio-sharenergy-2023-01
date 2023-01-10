import 'dotenv/config';

export const authConfig: {secret: string | any, expiresIn: string} = {
    secret: process.env.APP_SECRET,
    expiresIn: '7d'
}