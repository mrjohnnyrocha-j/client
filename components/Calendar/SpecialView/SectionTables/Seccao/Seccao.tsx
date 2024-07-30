import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Seccao.module.css';

interface Seccao {
  idSeccao: string;
  nome: string;
  descricao: string;
}

interface SeccaoSectionTableProps {
  secoes: Seccao[];
}

const ITEMS_PER_PAGE = 10;

const SeccaoSectionTable: React.FC<SeccaoSectionTableProps> = ({ secoes }) => {
  const [sortKey, setSortKey] = useState<keyof Seccao>('nome');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSort = (key: keyof Seccao) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < secoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedSecoes = [...secoes].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedSecoes = sortedSecoes.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <h2>Secoes Table</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort("idSeccao")}>
              ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("nome")}>
              Nome <FontAwesomeIcon icon={faSort} />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedSecoes.map((seccao) => (
            <tr key={seccao.idSeccao}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{seccao.idSeccao}</td>
              <td>{seccao.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(secoes.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= secoes.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default SeccaoSectionTable;
