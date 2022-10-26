/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useEffect, useState } from 'react';
import { Filter } from '../components/Filter';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { executeRequest } from '../services/api';

type LoginProps = {
  setAccessToken(s: string) : void
}

export const Principal : NextPage<LoginProps> = ({setAccessToken}) => {
  const [list, setList] = useState([]);

  const sair = () => {
    localStorage.clear();
    setAccessToken('');
  }

  const getFilteredList = async () => { 
    try {
      const result = await executeRequest('task', 'GET');

      if (result && result.data) {
        setList(result.data);
      }

    } catch (error : any) {
      console.log('Ocorreu um erro ao buscar tarefas: ', error);
    }
  }

  useEffect(() => {
    getFilteredList();
  }, []);

  return (
    <>
      <Header sair={sair} />
      <Filter />
      <List list={list} />
      <Footer />
    </>
  );
}