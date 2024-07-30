import React, { useState, useEffect } from "react";
import styles from "./SendMoneyWindow.module.css";

interface SendMoneyWindowProps {
  onClose: () => void;
}

const SendMoneyWindow: React.FC<SendMoneyWindowProps> = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user list from the backend
    const fetchUserList = async () => {
      // Replace with actual API call
      const response = await fetch("/api/users");
      const data = await response.json();
      setUserList(data);
    };

    fetchUserList();
  }, []);

  const handleSend = () => {
    // Handle the send money logic here
    console.log("Sending ${amount} to ${selectedUser}");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Send Money</h2>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {/* {userList.map((user) => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))} */}
          </select>
        </label>
        <div className={styles.actions}>
          <button onClick={handleSend}>Send</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyWindow;
