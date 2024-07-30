import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import lottie from "lottie-web";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import MessageBox from "../Message/MessageBox";
import InputArea from "../InputArea/InputArea";
import styles from "./ChatWindow.module.css";
import ShareWindow from "../ShareWindow/ShareWindow";
import Thread from "../Thread/Thread";

interface Message {
  id: number;
  type: string;
  content: string;
  likes: number;
  liked?: boolean;
  replies?: Message[];
}

interface ChatWindowProps {
  chatId: string | null;
  query: string;
  type: string;
  messages?: Message[];
  onThread: (message: Message) => void;
  closable?: boolean;
  onClose?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  query,
  type,
  messages: initialMessages,
  onThread,
  closable,
  onClose,
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(
    initialMessages || [
      {
        id: 1,
        type: "j",
        content: "Welcome to the chat!",
        likes: 0,
        liked: false,
        replies: [],
      },
    ]
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShareWindowVisible, setIsShareWindowVisible] =
    useState<boolean>(false);
  const [shareMessage, setShareMessage] = useState<Message | null>(null);
  const [selectedThread, setSelectedThread] = useState<Message | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!chatId) return;
    try {
      const response = await axios.get(`/api/chats/messages`, {
        params: { chatId },
      });
      console.log("Fetched messages:", response.data);
      const fetchedMessages: Message[] = response.data.map((msg: any) => ({
        id: msg.id,
        type: msg.sender === "user" ? "user" : "j",
        content: msg.message,
        likes: msg.likes || 0,
        liked: false,
        replies: [],
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const getResponse = async (input: string): Promise<string> => {
    setIsLoading(true);
    input = input.toLowerCase().trim();
    try {
      const response = await axios.post(`${apiUrl}/api/chat`, {
        message: input,
        chat_id: chatId,
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch the response from the server");
      }
      setIsLoading(false);
      return response.data.message;
    } catch (error: any) {
      setIsLoading(false);
      console.error("Fetching error:", error);
      return `Error: ${error.message}`;
    }
  };

  const sendMessage = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | null
  ) => {
    if (event) {
      event.preventDefault();
    }
    if (!userInput.trim()) return;
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        type: "user",
        content: userInput,
        likes: 0,
        liked: false,
        replies: [],
      },
    ];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await axios.post(`${apiUrl}/api/chat`, {
        chat_id: chatId,
        sender: "user",
        message: userInput,
      });
      console.log("Sent message response:", response.data);

      const jResponse = await getResponse(userInput);
      newMessages.push({
        id: newMessages.length + 1,
        type: "j",
        content: jResponse,
        likes: 0,
        liked: false,
        replies: [],
      });
      setMessages(newMessages);

      await axios.post(`${apiUrl}/api/chat`, {
        chat_id: chatId,
        sender: "j",
        message: jResponse,
      });

      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLike = (messageId: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const handleCopy = (content: string | JSX.Element) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content).then(() => {
        console.log("Copied to clipboard");
        alert("Text copied!");
      });
    }
  };

  const handleReply = (message: Message) => {
    setUserInput(typeof message.content === "string" ? message.content : "");
  };

  const handleShare = (message: Message) => {
    setShareMessage(message);
    setIsShareWindowVisible(true);
  };

  const handleThreadClick = (message: Message) => {
    onThread(message);
  };

  const handleCloseThread = () => {
    setSelectedThread(null);
  };

  useEffect(() => {
    if (isLoading && lottieContainerRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieContainerRef.current,
        path: "/assets/loading.json",
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      return () => {
        animation.destroy();
      };
    }
  }, [isLoading]);

  return (
    <div className={styles.chatPageContainer}>
      <div
        className={`${styles.chatContainer} ${selectedThread ? styles.shrink : ""}`}
      >
        {closable && onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        )}
        <div id="chat-container" className={styles.chatWindow}>
          <div className={styles.logoContainer}>
            <Image
              src="/assets/j_logo.png"
              alt="j Logo"
              width={14}
              height={53}
            />
          </div>
          <MessageBox
            messages={messages}
            onReply={handleReply}
            onShare={handleShare}
            onThread={handleThreadClick}
            onCopy={handleCopy}
            onLike={handleLike}
          />
          {isLoading && <div id="lottie" ref={lottieContainerRef}></div>}
          <div
            style={{ float: "left", clear: "both" }}
            ref={messagesEndRef}
          ></div>
          <InputArea
            userInput={userInput}
            setUserInput={setUserInput}
            sendMessage={sendMessage}
          />
        </div>
        {isShareWindowVisible && shareMessage && (
          <ShareWindow
            message={shareMessage.content}
            onSubmit={() => null}
            onClose={() => setIsShareWindowVisible(false)}
          />
        )}
      </div>
      {selectedThread && (
        <div className={styles.threadContainer}>
          <Thread post={selectedThread} onClose={handleCloseThread} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
