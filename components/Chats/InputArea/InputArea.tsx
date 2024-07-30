// /components/InputArea/InputArea.tsx

import React, { useState, useEffect } from 'react';
import { FaSmile, FaImage, FaPaperclip, FaEnvelope } from 'react-icons/fa';
import SendButton from '@/Chats/SendButton/SendButton';
import styles from './InputArea.module.css';
import SendMoneyWindow from '../SendMoneyWindow/SendMoneyWindow';
import EmojiWindow from '../EmojiWindow/EmojiWindow';
import UserInputWindow from '../../Auth/UserInputWindow/UserInputWindow';

interface ChatProps {
  userInput: string;
  setUserInput: (input: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface PostProps {
  newPostContent: string;
  setNewPostContent: (content: string) => void;
  handleCreatePost: () => void;
}

type InputAreaProps = 
  | ChatProps
  | PostProps;

const placeholderMessage = "Type your question to j and press Enter...";

const InputArea: React.FC<InputAreaProps> = (props) => {
  const [placeholder, setPlaceholder] = useState<string>(placeholderMessage);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSendMoneyWindow, setShowSendMoneyWindow] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  if ("userInput" in props && "setUserInput" in props && "sendMessage" in props) {
    const { userInput, setUserInput, sendMessage } = props;

    const handleFocus = () => {
      if (userInput === placeholder) {
        setUserInput("");
      }
    };

    const handleBlur = () => {
      if (userInput.trim() === "") {
        setUserInput(placeholder);
      }
    };

    useEffect(() => {
      setUserInput(placeholder);
    }, [setUserInput, placeholder]);

    return (
      <div id="input-area" className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <FaSmile className={styles.icon} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          {showEmojiPicker && (
            <EmojiWindow onSelect={(emoji) => {
              setUserInput(userInput + emoji);
              setShowEmojiPicker(false);
            }} onClose={() => setShowEmojiPicker(false)} />
          )}
          <FaImage className={styles.icon} onClick={() => setShowImageUploader(!showImageUploader)} />
          {showImageUploader && (
            <UserInputWindow onUpload={handleImageUpload} onClose={() => setShowImageUploader(false)} />
          )}
          <FaPaperclip className={styles.icon} onClick={() => setShowFileUploader(!showFileUploader)} />
          {showFileUploader && (
            <UserInputWindow onUpload={handleFileUpload} onClose={() => setShowFileUploader(false)} />
          )}
          <FaEnvelope className={styles.icon} onClick={() => setShowSendMoneyWindow(true)} />
          <input
            type="text"
            id="user-input"
            className={styles.userInput}
            placeholder={placeholder}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage(e as unknown as React.FormEvent<HTMLFormElement>)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <SendButton onClick={(event) => sendMessage(event)} />
        </div>
        {uploadedImage && (
          <div className={styles.uploadedContent}>
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        )}
        {uploadedFile && (
          <div className={styles.uploadedContent}>
            <span>{uploadedFile.name}</span>
          </div>
        )}
        {showSendMoneyWindow && <SendMoneyWindow onClose={() => setShowSendMoneyWindow(false)} />}
      </div>
    );
  } else if ("newPostContent" in props && "setNewPostContent" in props && "handleCreatePost" in props) {
    const { newPostContent, setNewPostContent, handleCreatePost } = props;

    return (
      <div id="input-area" className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <FaSmile className={styles.icon} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          {showEmojiPicker && (
            <EmojiWindow onSelect={(emoji) => {
              setNewPostContent(newPostContent + emoji);
              setShowEmojiPicker(false);
            }} onClose={() => setShowEmojiPicker(false)} />
          )}
          <FaImage className={styles.icon} onClick={() => setShowImageUploader(!showImageUploader)} />
          {showImageUploader && (
            <UserInputWindow onUpload={handleImageUpload} onClose={() => setShowImageUploader(false)} />
          )}
          <FaPaperclip className={styles.icon} onClick={() => setShowFileUploader(!showFileUploader)} />
          {showFileUploader && (
            <UserInputWindow onUpload={handleFileUpload} onClose={() => setShowFileUploader(false)} />
          )}
          <textarea
            id="post-input"
            className={styles.userInput}
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button onClick={handleCreatePost} className={styles.sendButton}>
            Post
          </button>
        </div>
        {uploadedImage && (
          <div className={styles.uploadedContent}>
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        )}
        {uploadedFile && (
          <div className={styles.uploadedContent}>
            <span>{uploadedFile.name}</span>
          </div>
        )}
        {showSendMoneyWindow && <SendMoneyWindow onClose={() => setShowSendMoneyWindow(false)} />}
      </div>
    );
  }

  return null;
};

export default InputArea;
