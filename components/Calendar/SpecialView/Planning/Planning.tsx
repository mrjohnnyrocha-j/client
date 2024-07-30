import React, { useState, useEffect } from 'react';
import styles from './Planning.module.css';
import { IsolatorBasicTable, IsolatorSectionTable } from '../SectionTables/Isolator/Isolator';

interface Isolator {
  idIsolador: string;
  name: string;
  availability: boolean;
  capacity: number;
  location: string;
}

interface Author {
  id: string;
  name: string;
  isolatorId: string;
  specialty: string;
}

interface PlanningProps {
  isolators: Isolator[];
  authors: Author[];
}

const Planning: React.FC<PlanningProps> = ({ isolators = [], authors = [] }) => {
  const [selectedIsolators, setSelectedIsolators] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [optimizationCriteria, setOptimizationCriteria] = useState<string>('efficiency');

  useEffect(() => {
    const filteredAuthors = authors.filter(author => selectedIsolators.includes(author.isolatorId));
    setSelectedAuthors(filteredAuthors);
  }, [selectedIsolators, authors]);

  const handleIsolatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedIsolators(prevSelected => 
      checked ? [...prevSelected, value] : prevSelected.filter(id => id !== value)
    );
  };

  const handleStartPlanning = () => {
    setShowModal(true);
  };

  const handleOptimizationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptimizationCriteria(event.target.value);
  };

  return (
    <div className={styles.planningContainer}>
      <h2>Planning</h2>
      <div className={styles.selectionArea}>
        <div className={styles.selectBoxes}>
          <h3>Select Isolators</h3>
          <IsolatorBasicTable isolators={isolators} onIsolatorChange={handleIsolatorChange} />
        </div>
        <div className={styles.details}>
          <h3>Details</h3>
          <IsolatorSectionTable isoladores={isolators.filter(isolator => selectedIsolators.includes(isolator.idIsolador))} />
        </div>
      </div>
      <div className={styles.startButtonContainer}>
        <button onClick={handleStartPlanning}>Start Planning</button>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Optimization Criteria</h3>
            <select value={optimizationCriteria} onChange={handleOptimizationChange}>
              <option value="efficiency">Efficiency</option>
              <option value="energy">Energy</option>
              <option value="priority">Priority</option>
            </select>
            <button onClick={() => setShowModal(false)}>Start</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;
