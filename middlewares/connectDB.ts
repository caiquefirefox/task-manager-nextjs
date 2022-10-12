import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';

export const connectDB = (handler: NextApiHandler) => 
    async (req : NextApiRequest, res : NextApiResponse) => {
    try{
        console.log("Verifica o estado da conexão (0=offline, 1=conectado): " + mongoose.connections[0].readyState);
        if(mongoose.connections[0].readyState){
            // await connectToDatabase();
            return handler(req, res);
        }

        const{DB_CONNECTION_STRING} = process.env;

        if(!DB_CONNECTION_STRING){
            return res.status(500).json({error: 'ENV database não informada'});
        }

        mongoose.connection.on('connected', () => { console.log("Conectado com sucesso") });
        mongoose.connection.on('error', (err) => { console.log("Falha ao conectar no banco de dados: ", err) });
        await mongoose.connect(DB_CONNECTION_STRING);

        return handler(req, res);
    }catch(e : any){
        console.log("Erro ao conectar ao banco de dados: " + e.message);
    }
}