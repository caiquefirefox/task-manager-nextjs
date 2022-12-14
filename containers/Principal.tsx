/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Filter } from '../components/Filter';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { executeRequest } from '../services/api';

type LoginProps = {
  setAccessToken(s: string) : void
}

export const Principal : NextPage<LoginProps> = ({setAccessToken}) => {

  //Lista e Filters
  const [list, setList] = useState([]);
  const [previsionDateStart, setPrevisionDateStart] = useState('');
  const [previsionDateEnd, setPrevisionDateEnd] = useState('');
  const [status, setStatus] = useState(0);
  
  //Form
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [previsionDate, setPrevisionDate] = useState('');

  const sair = () => {
    localStorage.clear();
    setAccessToken('');
  }

  const getFilteredList = async () => { 
    try {

      let filters = '?status=' + status ;

      if (previsionDateStart) {
        filters += '&finishPrevisionStart=' + previsionDateStart;
      }

      if (previsionDateEnd) {
        filters += '&finishPrevisionEnd=' + previsionDateEnd;
      }      

      const result = await executeRequest('task' + filters, 'GET');

      if (result && result.data) {
        setList(result.data);
      }

    } catch (error : any) {
      console.log('Ocorreu um erro ao buscar tarefas: ', error);
    }
  }

  useEffect(() => {
    getFilteredList();
  }, [previsionDateStart, previsionDateEnd, status]);

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setPrevisionDate('');
    setError('');
    setLoading(false);
  }

  const insertTask = async () => { 
    try {
      if (!name || !previsionDate) {
        return setError('Favor, preencha todos os campos');
      }

      setLoading(true);

      const body ={
        name,
        finishPrevision: previsionDate
      };

      await executeRequest('task', 'POST', body);
      await getFilteredList();
      closeModal();

    } catch (error : any) {
      console.log('Ocorreu um erro ao cadastrar tarefa: ', error);

      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error);
      }else{
        setError('Ocorreu um erro ao cadastrar tarefa, tente novamente mais tarde');
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Header showModal={() => setShowModal(true)} sair={sair} />
      <Filter 
        previsionDateStart={previsionDateStart}
        previsionDateEnd={previsionDateEnd}
        status={status}
        setPrevisionDateStart={setPrevisionDateStart}
        setPrevisionDateEnd={setPrevisionDateEnd}
        setStatus={setStatus}
      />
      <List list={list} getFilteredList={getFilteredList}/>
      <Footer showModal={() => setShowModal(true)} />
      <Modal show ={showModal} onHide={closeModal} className="container-modal">
        <Modal.Body>
          <p>Adicionar uma tarefa</p>
          <p className='error'></p>
          <input type="text" placeholder="Nome da tarefa" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="Data de previs??o da tarefa" value={previsionDate} onChange={e => setPrevisionDate(e.target.value)} onBlur={e => e.target.type = "text"} onFocus={e => e.target.type = "date"} />
        </Modal.Body>
        <Modal.Footer>
            <div className='button col-12'>
                <button
                    disabled={loading}
                    onClick={insertTask}
                >   {loading? "..Carregando" : "Salvar"}</button>
                <span onClick={closeModal}>Cancelar</span>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}