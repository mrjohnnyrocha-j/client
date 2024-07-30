import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Isolator.module.css";

interface Isolator {
  idIsolador: string;
  name: string;
  availability: boolean;
  capacity: number;
  location: string;
}


interface IsolatorSectionTableProps {
  isoladores: Isolator[];
}

const ITEMS_PER_PAGE = 10;

const IsolatorSectionTable: React.FC<IsolatorSectionTableProps> = ({
  isoladores,
}) => {
  const [sortKey, setSortKey] = useState<keyof Isolator>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);

  const handleSort = (key: keyof Isolator) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < isoladores.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedIsolatores = [...isoladores].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedIsolatores = sortedIsolatores.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <h2>Isolators Details</h2>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {currentPage + 1} of{" "}
          {Math.ceil(isoladores.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= isoladores.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

interface IsolatorBasicTableProps {
  isolators: Isolator[];
  onIsolatorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IsolatorBasicTable: React.FC<IsolatorBasicTableProps> = ({
  isolators,
  onIsolatorChange,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Paste Type</th>
            <th>Roll Dimensions</th>
          </tr>
        </thead>
        <tbody>
          {isolators.map((isolator) => (
            <tr key={isolator.name}>
              <td>
                <input
                  type="checkbox"
                  value={isolator.name}
                  onChange={onIsolatorChange}
                />
              </td>
              <td>{isolator.capacity}</td>
              <td>{isolator.availability}</td>
              <td>{isolator.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { IsolatorBasicTable, IsolatorSectionTable };
