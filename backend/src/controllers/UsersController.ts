import User from '../models/User';
import { Request, Response } from 'express';

class UsersCrontoller {
    async index(req: Request, res: Response) {
        try {
            const users = await User.find();

            return res.json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json();
            }

            return res.json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email, phone, address, cpf } = req.body;

            const user = await User.findOne({ name });

            if (user) {
                return res.status(422).json({ message: `User ${name} already exists.` })
            }

            const newUser = await User.create({
                name, 
                email, 
                phone, 
                address, 
                cpf,
            });

            return res.status(201).json(newUser)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }
    }

    async update(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { name, email, phone, address, cpf } = req.body;

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json();
            }

           await user.updateOne({
            name, 
            email, 
            phone, 
            address, 
            cpf,
            });

            return res.status(200).json();

        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }

    }

    async destroy(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json();
            }

            await user.deleteOne();
            return res.status(200).json();
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error." })
        }
    }

}

export default new UsersCrontoller();