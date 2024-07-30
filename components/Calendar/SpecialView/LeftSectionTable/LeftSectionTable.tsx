import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faChevronLeft, faChevronRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './LeftSectionTable.module.css';

interface Stage {
  name: string;
  startTime: Date;
  endTime: Date;
  status?: string;
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

interface Isolador {
  idIsolador: string;
  tipoPasta: string;
  disponibilidadeMaterial: string;
  capacidadeMaxima: number;
}

interface LeftSectionTableProps {
  events: Event[];
}

const ITEMS_PER_PAGE = 10;

const LeftSectionTable: React.FC<LeftSectionTableProps> = ({ events }) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [sortKey, setSortKey] = useState<keyof Event>('isoKey');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [additionalData, setAdditionalData] = useState<{ [key: string]: any }>({});

  const handleExpandClick = async (id: string) => {
    if (expandedRows[id]) {
      setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      const event = events.find(event => event.id === id);
      if (event) {
        const response = await fetch(`/api/details/${event.isoKey}`);
        const data = await response.json();
        setAdditionalData((prev) => ({ ...prev, [id]: data }));
        setExpandedRows((prev) => ({ ...prev, [id]: true }));
      }
    }
  };

  const handleSort = (key: keyof Event) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < events.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedEvents = sortedEvents.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <h2>Operations Table</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort("id")}>
              ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("title")}>
              Title <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("startTime")}>
              Start Time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("endTime")}>
              End Time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("element")}>
              Element <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("workCenter")}>
              Work Center <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("isoKey")}>
              ISO Key <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("batchKey")}>
              Batch Key <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("productKey")}>
              Product Key <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("stockIn31A")}>
              Stock In 31A <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("orderAmount")}>
              Order Amount <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("orderNumber")}>
              Order Number <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("orderStatus")}>
              Order Status <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("status")}>
              Status <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("details")}>
              Details <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("clientName")}>
              Client Name <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("clientOrderNumber")}>
              Client Order Number <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("clientReference")}>
              Client Reference <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("productCommercial")}>
              Product Commercial <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("productReference")}>
              Product Reference <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("actualQuantityProduced")}>
              Actual Quantity Produced <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("quantityOrdered")}>
              Quantity Ordered <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("toBeInvoiced")}>
              To Be Invoiced <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("toBeExecuted")}>
              To Be Executed <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("deliveryStatus")}>
              Delivery Status <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("manufacturingLeadTime")}>
              Manufacturing Lead Time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("availableCapacityForecast")}>
              Available Capacity Forecast <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("materialAvailability")}>
              Material Availability <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("deliveryDeadlines")}>
              Delivery Deadlines <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("orderReplanningDetails")}>
              Order Replanning Details <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("purchasePlanFittings")}>
              Purchase Plan Fittings <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("purchasePlanPackaging")}>
              Purchase Plan Packaging <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("pasteType")}>
              Paste Type <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("mixRatio")}>
              Mix Ratio <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("scrapRates")}>
              Scrap Rates <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("productionPlanOptimization")}>
              Production Plan Optimization <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("constraints")}>
              Constraints <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("extrusionLength")}>
              Extrusion Length <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("extrusionDiameter")}>
              Extrusion Diameter <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("extrusionSpaceRequired")}>
              Extrusion Space Required <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("extrusionShelvesRequired")}>
              Extrusion Shelves Required <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("requiredCavaletes")}>
              Required Cavaletes <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("availableCavaletes")}>
              Available Cavaletes <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("requiredEstufas")}>
              Required Estufas <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("availableEstufas")}>
              Available Estufas <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("requiredFornos")}>
              Required Fornos <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("availableFornos")}>
              Available Fornos <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dryingCurve")}>
              Drying Curve <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dryingTime")}>
              Drying Time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dryingSpaceRequired")}>
              Drying Space Required <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("dryingShelvesRequired")}>
              Drying Shelves Required <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("firingCurve")}>
              Firing Curve <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("firingTime")}>
              Firing Time <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("maxFiringCapacity")}>
              Max Firing Capacity <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={() => handleSort("requiredFiringCapacity")}>
              Required Firing Capacity <FontAwesomeIcon icon={faSort} />
            </th>
            <th>Stages</th>
            <th>Carga Fabril</th>
            <th>Sections</th>
            <th>Isolator</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvents.map((event) => (
            <React.Fragment key={event.id}>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{new Date(event.startTime).toLocaleString()}</td>
                <td>{new Date(event.endTime).toLocaleString()}</td>
                <td>{event.element}</td>
                <td>{event.workCenter}</td>
                <td>{event.isoKey}</td>
                <td>{event.batchKey}</td>
                <td>{event.productKey}</td>
                <td>{event.stockIn31A}</td>
                <td>{event.orderAmount}</td>
                <td>{event.orderNumber}</td>
                <td>{event.orderStatus}</td>
                <td>{event.status}</td>
                <td>{event.details}</td>
                <td>{event.clientName}</td>
                <td>{event.clientOrderNumber}</td>
                <td>{event.clientReference}</td>
                <td>{event.productCommercial}</td>
                <td>{event.productReference}</td>
                <td>{event.actualQuantityProduced}</td>
                <td>{event.quantityOrdered}</td>
                <td>{event.toBeInvoiced}</td>
                <td>{event.toBeExecuted}</td>
                <td>{event.deliveryStatus}</td>
                <td>{event.manufacturingLeadTime}</td>
                <td>{event.availableCapacityForecast}</td>
                <td>{event.materialAvailability}</td>
                <td>{event.deliveryDeadlines}</td>
                <td>{event.orderReplanningDetails}</td>
                <td>{event.purchasePlanFittings}</td>
                <td>{event.purchasePlanPackaging}</td>
                <td>{event.pasteType}</td>
                <td>{event.mixRatio}</td>
                <td>{event.scrapRates}</td>
                <td>{event.productionPlanOptimization}</td>
                <td>{event.constraints}</td>
                <td>{event.extrusionLength}</td>
                <td>{event.extrusionDiameter}</td>
                <td>{event.extrusionSpaceRequired}</td>
                <td>{event.extrusionShelvesRequired}</td>
                <td>{event.requiredCavaletes}</td>
                <td>{event.availableCavaletes}</td>
                <td>{event.requiredEstufas}</td>
                <td>{event.availableEstufas}</td>
                <td>{event.requiredFornos}</td>
                <td>{event.availableFornos}</td>
                <td>{event.dryingCurve}</td>
                <td>{event.dryingTime}</td>
                <td>{event.dryingSpaceRequired}</td>
                <td>{event.dryingShelvesRequired}</td>
                <td>{event.firingCurve}</td>
                <td>{event.firingTime}</td>
                <td>{event.maxFiringCapacity}</td>
                <td>{event.requiredFiringCapacity}</td>
                <td>
                  <button className={styles.expandButton} onClick={() => handleExpandClick(event.id)}>
                    {expandedRows[event.id] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </button>
                </td>
                <td>
                  <button className={styles.expandButton} onClick={() => handleExpandClick(event.id)}>
                    {expandedRows[event.id] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </button>
                </td>
                <td>
                  <button className={styles.expandButton} onClick={() => handleExpandClick(event.id)}>
                    {expandedRows[event.id] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </button>
                </td>
              </tr>
              {expandedRows[event.id] && (
                <tr>
                  <td colSpan={6}>
                    <div className={styles.subColumn}>
                      <h4>Stages</h4>
                      <table className={styles.stageTable}>
                        <thead>
                          <tr>
                            <th>Stage</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                      
                      </table>
                    </div>
                    {additionalData[event.id]?.cargasFabrils && (
                      <div className={styles.subColumn}>
                        <h4>Carga Fabril</h4>
                        <table className={styles.stageTable}>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>ID Equipamento</th>
                              <th>ID Operacao</th>
                              <th>Data Comeco</th>
                              <th>Data Fim</th>
                              <th>Previsao Carga Fabril Disponivel</th>
                            </tr>
                          </thead>
                          <tbody>
                            {additionalData[event.id].cargasFabrils.map((cargaFabril: CargaFabril) => (
                              <tr key={cargaFabril.idCargaFabril}>
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
                      </div>
                    )}
                    {additionalData[event.id]?.secoes && (
                      <div className={styles.subColumn}>
                        <h4>Sections</h4>
                        <table className={styles.stageTable}>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {additionalData[event.id].secoes.map((seccao: Seccao) => (
                              <tr key={seccao.idSeccao}>
                                <td>{seccao.idSeccao}</td>
                                <td>{seccao.nome}</td>
                                <td>{seccao.descricao}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {additionalData[event.id]?.isolators && (
                      <div className={styles.subColumn}>
                        <h4>Isolators</h4>
                        <table className={styles.stageTable}>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Type</th>
                              <th>Availability</th>
                              <th>Capacity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {additionalData[event.id].isolators.map((isolator: Isolador) => (
                              <tr key={isolator.idIsolador}>
                                <td>{isolator.idIsolador}</td>
                                <td>{isolator.tipoPasta}</td>
                                <td>{isolator.disponibilidadeMaterial}</td>
                                <td>{isolator.capacidadeMaxima}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(events.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= events.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default LeftSectionTable;
