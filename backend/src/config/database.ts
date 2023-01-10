import 'dotenv/config';

export const config: {url: string | any} = {
    url: process.env.MONGODB_URI,
}