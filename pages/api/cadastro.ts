import type { NextApiRequest, NextApiResponse } from 'next'

type CadastroRequest = {
    email : string,
    password : string
}

export default (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try{
        const {body} = req;
        const dados = body as CadastroRequest;

        if(!dados.email || !dados.password){
            res.status(400).json({error: 'Favor preencher os campos'});
            return;
        }

        res.status(200).json({ msg: 'Cadastro concluido com sucesso' })
    }catch(e : any){
        console.log("Erro ao efetuar o cadastro: " + e.message);
    }
}