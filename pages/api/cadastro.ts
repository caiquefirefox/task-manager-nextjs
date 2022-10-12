import { connect } from 'http2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../middlewares/connectDB';

type CadastroRequest = {
    email : string,
    password : string
}

const handler =  (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try{
        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Metodo solicitado não existe'})
        }

        const {body} = req;
        const dados = body as CadastroRequest;

        if(!dados.email || !dados.password){
            res.status(400).json({error: 'Favor preencher os campos'});
            return;
        }

        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(dados.email)){
            return res.status(400).json({error: 'Email inválido'});
        }

        const senhaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        /*if(!senhaRegex.test(dados.password)){
            return res.status(400).json({error: 'Senha inválida'});
        }*/

        res.status(200).json({ msg: 'Cadastro concluido com sucesso' })
    }catch(e : any){
        console.log("Erro ao efetuar o cadastro: " + e.message);
    }
}

export default connectDB(handler);