import React, { useState } from 'react';
import styles from './FileEditor.module.css';

interface FileEditorProps {
  file: {
    name: string;
    type: string;
    content: string;
  };
  onSave: (content: string | ArrayBuffer) => void;
}

const FileEditor: React.FC<FileEditorProps> = ({ file, onSave }) => {
  const [content, setContent] = useState(file.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className={styles.fileEditor}>
      <div className={styles.editorHeader}>
        <span>{file.name}</span>
      </div>
      <div className={styles.editorContent}>
        <textarea value={content} onChange={handleChange} className={styles.textarea} />
      </div>
      <div className={styles.editorFooter}>
        <button onClick={handleSave} className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
};

export default FileEditor;
