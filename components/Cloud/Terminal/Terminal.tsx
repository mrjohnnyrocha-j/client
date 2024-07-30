import React, { useState } from 'react';
import axios from 'axios';
import styles from './Terminal.module.css';

const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input;
      setCommands([...commands, `> ${command}`]);
      setInput('');
      try {
        const response = await axios.post('http://localhost:5500/api/execute', { command });
        setCommands(prevCommands => [...prevCommands, response.data.output]);
      } catch (error) {
        setCommands(prevCommands => [...prevCommands, `Error: ${(error as Error).message}`]);
      }
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.output}>
        {commands.map((cmd, index) => (
          <div key={index}>{cmd}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        className={styles.input}
        placeholder="Type a command..."
      />
    </div>
  );
};

export default Terminal;
