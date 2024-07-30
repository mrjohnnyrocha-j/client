import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './ChatsList.module.css';

interface Chat {
  id: string;
  name: string;
}

const ChatsList: React.FC<{ chats: Chat[]; onChatClick: (chat: Chat) => void; onNewChat: (contact: Contact) => void; }> = ({ chats, onChatClick, onNewChat }) => {
  const [localChats, setLocalChats] = useState<Chat[]>(chats);

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

  const handleChatClick = (chatId: string) => {
    const chat = localChats.find(c => c.id === chatId);
    if (chat) {
      onChatClick(chat);
    }
  };

  return (
    <div className={styles.chatsListContainer}>
      <h1>Chats</h1>
      <ul className={styles.chatsList}>
        {localChats.map((chat) => (
          <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatsList;
