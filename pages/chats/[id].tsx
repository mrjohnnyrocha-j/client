import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow';
import Thread from '../../components/Chats/Thread/Thread';
import styles from '../../styles/chats/chats.module.css';

interface Message {
  id: number;
  type: string;
  content: string;
  likes: number;
  liked?: boolean;
  replies?: Message[];
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id, threadId } = router.query;
  const [closedThread, setClosedThread] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<Message | null>(null);

  useEffect(() => {
    if (id) {
      fetchChatData(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (threadId) {
      const message = messages.find((msg) => msg.id === parseInt(threadId as string, 10));
      setSelectedThread(message || null);
    }
  }, [threadId, messages]);

  const fetchChatData = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error('Chat not found');
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCloseThread = () => {
    setClosedThread(true);
    setSelectedThread(null);
  };

  const handleThread = (message: Message) => {
    setSelectedThread(message);
    router.push({
      pathname: `/chats/${id}`,
      query: { threadId: message.id },
    }, undefined, { shallow: true });
  };

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatContainer}>
        <h1>Chat {id}</h1>
        <ChatWindow chatId={id as string} query="" type="individual" messages={messages} onThread={handleThread} />
      </div>
      {selectedThread && (
        <div className={styles.threadContainer}>
          <Thread post={selectedThread} onClose={handleCloseThread} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
