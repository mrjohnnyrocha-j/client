import React from 'react';
import styled from 'styled-components';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}
interface DetailedReplanOverlayProps {
  event: Event;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }

  &.save {
    background: #28a745;
    color: white;
  }

  &.cancel {
    background: #dc3545;
    color: white;
  }
`;

const DetailedReplanOverlay: React.FC<DetailedReplanOverlayProps> = ({ event, onClose }) => {
  const handleSave = () => {
    // Logic to save changes
    onClose();
  };

  return (
    <Overlay>
      <OverlayContent>
        <Title>Replanejamento Detalhado</Title>
        <p>{event.title}</p>
        {/* Detailed editing fields */}
        <ButtonGroup>
          <Button className="save" onClick={handleSave}>Salvar</Button>
          <Button className="cancel" onClick={onClose}>Cancelar</Button>
        </ButtonGroup>
      </OverlayContent>
    </Overlay>
  );
};

export default DetailedReplanOverlay;
