// src/components/CallButton.tsx

import React, { useState } from 'react';
import VoiceCall from '../../../VoiceCall/VoiceCall';
import createCall from '../../../../../pages/api/calls'; 
import createContact from '../../../../../pages/api/contacts'; 
interface CallButtonProps {
  userId: number;
  contactId: number;
}

const CallButton: React.FC<CallButtonProps> = ({ userId, contactId }) => {
  const [isCalling, setIsCalling] = useState(false);

  const handleResumeCall = async () => {
    // Check if contact exists or create it
    // await createContact(userId, contactId);

    // Open the VoiceCall component
    setIsCalling(true);
  };

  const handleCloseCall = () => {
    setIsCalling(false);
  };

  return (
    <>
      <button onClick={handleResumeCall}>Resume Call</button>
      {/* {isCalling && (
        <VoiceCall
          userId={userId}
          contactId={contactId}
          onClose={handleCloseCall}
          createCall={createCall}
        />
      )} */}
    </>
  );
};

export default CallButton;
