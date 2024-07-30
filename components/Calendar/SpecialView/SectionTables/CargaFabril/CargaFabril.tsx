import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './CargaFabril.module.css';

interface CargaFabril {
  idCargaFabril: string;
  idEquipamento: string;
  idOperacao: string;
  dataComeco: Date;
  dataFim: Date;
  previsaoCargaFabrilDisponivel: string;
}

interface CargaFabrilSectionTableProps {
  cargasFabrils: CargaFabril[];
}

const ITEMS_PER_PAGE = 10;

const CargaFabrilSectionTable: React.FC<CargaFabrilSectionTableProps> = ({ cargasFabrils }) => {
  const [sortKey, setSortKey] = useState<keyof CargaFabril>('idCargaFabril');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSort = (key: keyof CargaFabril) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < cargasFabrils.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedCargasFabrils = [...cargasFabrils].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedCargasFabrils = sortedCargasFabrils.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <h2>Carga Fabril Table</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort("idCargaFabril")}>
              ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("idEquipamento")}>
              ID Equipamento <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("idOperacao")}>
              ID Operacao <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dataComeco")}>
              Data Comeco <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dataFim")}>
              Data Fim <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("previsaoCargaFabrilDisponivel")}>
              Previsao Carga Fabril Disponivel <FontAwesomeIcon icon={faSort} />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedCargasFabrils.map((cargaFabril) => (
            <tr key={cargaFabril.idCargaFabril}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{cargaFabril.idCargaFabril}</td>
              <td>{cargaFabril.idEquipamento}</td>
              <td>{cargaFabril.idOperacao}</td>
              <td>{new Date(cargaFabril.dataComeco).toLocaleString()}</td>
              <td>{new Date(cargaFabril.dataFim).toLocaleString()}</td>
              <td>{cargaFabril.previsaoCargaFabrilDisponivel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(cargasFabrils.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= cargasFabrils.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CargaFabrilSectionTable;
