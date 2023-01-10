import mongoose from 'mongoose';

import { config } from '../config/database';

class Database {

    connection: Promise<any>;
    error: any;
    open: any;

    constructor() {
        this.connection = mongoose.connect(
            config.url
        )
        this.error = mongoose.connection.on("error", () => {
            console.log('erro ao conectar')
        })

        this.open = mongoose.connection.on("open", () => {
            console.log('conectado com sucesso!')
        })
    }
}

export default new Database();