import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Login } from '../containers/Login'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  return (
    <> 
      {!accessToken ? <Login setAccessToken={setAccessToken} /> : <><h1>Bem vindo</h1></>}
    </>
  )
}

export default Home
