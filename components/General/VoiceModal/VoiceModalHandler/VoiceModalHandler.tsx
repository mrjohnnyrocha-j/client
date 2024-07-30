import React from 'react';
import { useVoiceModal } from '../../../../context/VoiceModalContext';
import VoiceModal from '../VoiceModal';
import MicrophoneButton from '../../MicrophoneButton/MicrophoneButton';

const VoiceModalHandler: React.FC = () => {
  const { isOpen, closeModal } = useVoiceModal();

  return (
    <>
      <MicrophoneButton />
      {isOpen && <VoiceModal onClose={closeModal} />}
    </>
  );
};

export default VoiceModalHandler;
