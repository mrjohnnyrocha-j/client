import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './DetalhesRegistoPercurso.module.css';

interface DetalhesRegistoPercurso {
  idDetalhesRegistoPercurso: string;
  idRegistoPercurso: string;
  descricao: string;
  dadosDetalhe: string;
}

interface DetalhesRegistoPercursoSectionTableProps {
  detalhesRegistoPercursos: DetalhesRegistoPercurso[];
}

const ITEMS_PER_PAGE = 10;

const DetalhesRegistoPercursoSectionTable: React.FC<DetalhesRegistoPercursoSectionTableProps> = ({ detalhesRegistoPercursos }) => {
  const [sortKey, setSortKey] = useState<keyof DetalhesRegistoPercurso>('descricao');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSort = (key: keyof DetalhesRegistoPercurso) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < detalhesRegistoPercursos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedDetalhesRegistoPercursos = [...detalhesRegistoPercursos].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedDetalhesRegistoPercursos = sortedDetalhesRegistoPercursos.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <h2>Detalhes Registo Percurso Table</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort("idDetalhesRegistoPercurso")}>
              ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("idRegistoPercurso")}>
              Registo Percurso ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("descricao")}>
              Descricao <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dadosDetalhe")}>
              Dados Detalhe <FontAwesomeIcon icon={faSort} />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedDetalhesRegistoPercursos.map((detalhe) => (
            <tr key={detalhe.idDetalhesRegistoPercurso}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{detalhe.idDetalhesRegistoPercurso}</td>
              <td>{detalhe.idRegistoPercurso}</td>
              <td>{detalhe.descricao}</td>
              <td>{detalhe.dadosDetalhe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(detalhesRegistoPercursos.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= detalhesRegistoPercursos.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default DetalhesRegistoPercursoSectionTable;
