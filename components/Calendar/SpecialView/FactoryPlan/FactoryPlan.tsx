import React from "react";
import styles from "./FactoryPlan.module.css";

interface FactoryPlanProps {
  onSectionClick: (section: string) => void;
}

const FactoryPlan: React.FC<FactoryPlanProps> = ({ onSectionClick }) => {
  const factorySections = [
    {
      name: "Ovens",
      equipments: [
        "Oven 1",
        "Oven 2",
        "Oven 3",
        "Oven 4",
        "Oven 5",
        "Oven 6",
        "Oven 7",
      ],
    },
    {
      name: "Greenhouses",
      equipments: [
        "Greenhouse 1",
        "Greenhouse 2",
        "Greenhouse 3",
        "Greenhouse 4",
        "Greenhouse 5",
        "Greenhouse 6",
        "Greenhouse 7",
        "Greenhouse 8",
        "Greenhouse 9",
        "Greenhouse 10",
        "Greenhouse 11",
      ],
    },
    {
      name: "Assembly Areas",
      equipments: ["Assembly Area", "Packaging Area"],
    },
    {
      name: "Machines",
      equipments: [
        "Extrusion Machine",
        "Dorst 3",
        "Neptuno",
        "Zeidler 1",
        "Cerisol 2",
        "Cerisol 3",
        "Robot 1",
        "Robot 2",
        "Dorst 1",
        "Jacinto Ramos 2",
        "Jacinto Ramos 3",
        "Robot 3",
        "Rosenthal 1",
        "Vidration Machine",
        "Filtering Machine",
      ],
    },
    {
      name: "Departments",
      equipments: [
        "Human Resources",
        "Accounting",
        "Executive",
        "Managing",
        "Admin",
        "IT",
      ],
    },
    {
      name: "Storage",
      equipments: ["Racks", "Pallets", "Tank 1", "Tank 2"],
    },
    {
      name: "Transport",
      equipments: ["Cavaletes", "Wagonetes"],
    },
    {
      name: "Other",
      equipments: ["Grinding Area"],
    },
  ];

  return (
    <div className={styles.factoryPlan}>
      <h2>Factory Plan</h2>
      <div className={styles.mainSections}>
        {factorySections.map((section) => (
          <div key={section.name} className={styles.section}>
            <h3>{section.name}</h3>
            <div className={styles.equipmentGrid}>
              {section.equipments.map((equipment) => (
                <div key={equipment} className={styles.equipmentSquare}>
                  <button onClick={() => onSectionClick(equipment)}>
                    {equipment}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryPlan;
