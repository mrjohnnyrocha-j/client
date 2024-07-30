import React, { useState, useEffect } from 'react';
import styles from './MainSectionTable.module.css';
import LeftSectionTable from '../LeftSectionTable/LeftSectionTable';
import CargaFabrilSectionTable from './CargaFabril/CargaFabril';
import SeccaoSectionTable from './Seccao/Seccao';
import DetalhesRegistoPercursoSectionTable from './DetalhesRegistoPercurso/DetalhesRegistoPercurso';

interface DetalhesRegistoPercurso {
  idDetalhesRegistoPercurso: string;
  idRegistoPercurso: string;
  descricao: string;
  dadosDetalhe: string;
}

interface CargaFabril {
  idCargaFabril: string;
  idEquipamento: string;
  idOperacao: string;
  dataComeco: Date;
  dataFim: Date;
  previsaoCargaFabrilDisponivel: string;
}

interface Seccao {
  idSeccao: string;
  nome: string;
  descricao: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}

const MainSectionTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [cargasFabrils, setCargasFabrils] = useState<CargaFabril[]>([]);
  const [secoes, setSecoes] = useState<Seccao[]>([]);
  const [detalhesRegistoPercursos, setDetalhesRegistoPercursos] = useState<DetalhesRegistoPercurso[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch('/api/events');
        const cargasFabrilsResponse = await fetch('/api/cargasfabrils');
        const parametrosResponse = await fetch('/api/parametros');
        const secoesResponse = await fetch('/api/secoes');
        const detalhesRegistoPercursosResponse = await fetch('/api/detalhesregistopercursos');

        const eventsData: Event[] = await eventsResponse.json();
        const cargasFabrilsData: CargaFabril[] = await cargasFabrilsResponse.json();
        const secoesData: Seccao[] = await secoesResponse.json();
        const detalhesRegistoPercursosData: DetalhesRegistoPercurso[] = await detalhesRegistoPercursosResponse.json();

        setEvents(eventsData);
        setCargasFabrils(cargasFabrilsData);
        setSecoes(secoesData);
        setDetalhesRegistoPercursos(detalhesRegistoPercursosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainSectionTable}>
      <LeftSectionTable events={events} />
      <CargaFabrilSectionTable cargasFabrils={cargasFabrils} />

      <SeccaoSectionTable secoes={secoes} />
      <DetalhesRegistoPercursoSectionTable detalhesRegistoPercursos={detalhesRegistoPercursos} />
    </div>
  );
};

export default MainSectionTable;
