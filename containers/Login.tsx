/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';

export const Login : NextPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => { 
    try {
      if (!email || !password) {
        alert('Favor, preencha todos os campos');
      }

      const body ={
        login: email,
        password
      };

      const result = await executeRequest('login', 'POST', body);

      if (result && result.data) {
        alert(result.data);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao efetuar login: ', error);
    }
  }

  return (
      <div className='container-login'>
        <img src="/logo.svg" alt="Logo Fiap" className='logo'/>
        <div className='form'>
            <div>
                <img src="/mail.svg" alt="Login" />
                <input type="text" placeholder="Login" 
                  value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <img src="/lock.svg" alt="Senha" />
                <input type="password" placeholder="Senha" 
                  value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type='button' onClick={doLogin}>Login</button>
        </div>
      </div>
  );
}