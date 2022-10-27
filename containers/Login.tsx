/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';

type LoginProps = {
  setAccessToken(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setAccessToken}) => {

  const [typeScreen, setTypeScreen] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Cadastro
  const [nomeCadastro, setNomeRegister] = useState('');
  const [emailCadastro, setEmailRegister] = useState('');
  const [passwordCadastro, setPasswordRegister] = useState('');
  const [successInRegister, setSuccessInRegister] = useState('');
  

  const doLogin = async () => { 
    try {
      if (!email || !password) {
        return setError('Favor, preencha todos os campos');
      }

      setLoading(true);

      const body ={
        login: email,
        password
      };

      const result = await executeRequest('login', 'POST', body);

      if (result && result.data) {
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('email', result.data.email);
        setAccessToken(result.data.token);
      }

    } catch (error : any) {
      console.log('Ocorreu um erro ao efetuar login: ', error);

      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error);
      }else{
        setError('Ocorreu um erro ao efetuar login, tente novamente mais tarde');
      }
    }

    setLoading(false);
  }

  const doRegister = async () => { 
    try {
      if (!nomeCadastro || !emailCadastro || !passwordCadastro) {
        return setError('Favor, preencha todos os campos');
      }

      setLoading(true);

      const body ={
        name: nomeCadastro,
        email: emailCadastro,
        password: passwordCadastro
      };

      const result = await executeRequest('user', 'POST', body);
      setSuccessInRegister('Cadastro realizado com sucesso! Informe abaixo os dados para login.');
      changeScreen(1);
    } catch (error : any) {
      console.log('Ocorreu um erro ao efetuar o cadastro: ', error);

      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error);
      }else{
        setError('Ocorreu um erro ao efetuar cadastro, tente novamente mais tarde');
      }
    }

    setLoading(false);
  }

  const changeScreen = (type: number) => {
    clearDataOfScreen();
    setTypeScreen(type)
  }

  const clearDataOfScreen = () => {
    setError('');
    setEmail('');
    setPassword('');
    setNomeRegister('');
    setEmailRegister('');
    setPasswordRegister('');
  }

  return (
      <div className='container-login'>
        <img src="/logo.svg" alt="Logo Fiap" className='logo'/>
        
        {typeScreen == 1 &&
        <div className='form'>
          {error && <p className='error'>{error}</p>}
          {successInRegister && <p className='success'>{successInRegister}</p>}
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
            <div>
              <button type='button' onClick={doLogin} disabled={loading}>{loading ? 'Carregando...' : 'Login'}</button>
            </div>
            <div className='div-span'>
              <span onClick={e => changeScreen(2)}>Cadastre-se</span>
            </div>
        </div>}

        {typeScreen == 2 &&
        <div className='form'>
          {error && <p className='error'>{error}</p>}
          <div>
                <img src="/user-register.png" alt="Nome" />
                <input type="text" placeholder="Nome" 
                  value={nomeCadastro} onChange={e => setNomeRegister(e.target.value)} />
            </div>
            <div>
                <img src="/mail.svg" alt="Email" />
                <input type="text" placeholder="Email" 
                  value={emailCadastro} onChange={e => setEmailRegister(e.target.value)} />
            </div>
            <div>
                <img src="/lock.svg" alt="Senha" />
                <input type="password" placeholder="Senha" 
                  value={passwordCadastro} onChange={e => setPasswordRegister(e.target.value)} />
            </div>
            <div>
              <button type='button' onClick={doRegister} disabled={loading}>{loading ? 'Carregando...' : 'Cadastrar'}</button>
            </div>
            <div className='div-span'>
              <span onClick={e => changeScreen(1)}>Cancelar</span>
            </div>
        </div>}
      </div>
  );
}