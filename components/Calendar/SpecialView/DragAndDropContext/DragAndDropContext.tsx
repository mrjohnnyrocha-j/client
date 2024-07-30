import React, { createContext, useState, ReactNode } from 'react';

interface DragAndDropContextProps {
  draggedItem: any | null;
  onDragStart: (item: any) => void;
  onDrop: (target: any) => void;
}

const DragAndDropContext = createContext<DragAndDropContextProps | null>(null);

const DragAndDropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState<any | null>(null);

  const onDragStart = (item: any) => setDraggedItem(item);
  const onDrop = (target: any) => {
    // Lógica de replanejamento
    setDraggedItem(null);
  };

  return (
    <DragAndDropContext.Provider value={{ draggedItem, onDragStart, onDrop }}>
      {children}
    </DragAndDropContext.Provider>
  );
};

export { DragAndDropProvider, DragAndDropContext };
