import jwt from 'jsonwebtoken';

import Admin from '../models/Admin';
import { checkPassword, createPasswordHash } from '../services/auth';
import { Request, Response } from 'express';

import {authConfig} from '../config/auth';

class SessionController{
    async createLogin(req: Request, res: Response){
        const { username, password} = req.body;

        const user = await Admin.findOne({username});

        if(!user) {
            return res.status(401).json({error: 'User / password invalid.'});
        }

        const checkPass = await checkPassword(user, password);
        
        if(!checkPass){
            return res.status(401).json({error: 'User / password invalid.'})
        }

        const {id} = user;

        return res.json({
            user: {
                id,
                username
            },
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }

    async createAdmin(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await Admin.findOne({ username });

            if (user) {
                return res.status(422).json({ message: `User ${username} already exists.` })
            }

            const encryptedPassword = await createPasswordHash(password);

            const newUser = await Admin.create({
                username, 
                password: encryptedPassword,
            });

            return res.status(201).json(newUser)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }
    }
}

export default new SessionController();