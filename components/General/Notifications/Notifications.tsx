import React, { useState, useEffect } from "react";
import ReceiveCall from "./ReceiveCall/ReceiveCall";
import styles from "./Notifications.module.css";

interface NotificationsProps {
  currentUser: any;
}

const Notifications: React.FC<NotificationsProps> = ({ currentUser }) => {
  const [incomingCall, setIncomingCall] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.123:8081");

    ws.onmessage = async (event) => {
      const data = await event.data.text();
      const parsedData = JSON.parse(data);
      if (parsedData.type === "incomingCall" && parsedData.receiverId === currentUser.id) {
        setIncomingCall(parsedData.caller);
      }
    };

    return () => {
      ws.close();
    };
  }, [currentUser.id]);

  const handleAcceptCall = () => {
    console.log("Call accepted");
    setIncomingCall(null);
  };

  const handleDeclineCall = () => {
    console.log("Call declined");
    setIncomingCall(null);
  };

  return (
    <div className={styles.notificationsContainer}>
      {incomingCall && (
        <ReceiveCall
          from={incomingCall}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      )}
    </div>
  );
};

export default Notifications;
