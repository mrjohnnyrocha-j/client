// components/FileVisualizer/FileVisualizer.tsx
import React from 'react';
import ReactPlayer from 'react-player';
import styles from './FileVisualizer.module.css';

interface FileVisualizerProps {
  file: {
    name: string;
    type: string;
    content: string;
  };
  onEdit: () => void;
}

const FileVisualizer: React.FC<FileVisualizerProps> = ({ file, onEdit }) => {
  const renderContent = () => {
    if (file.type.startsWith('image/')) {
      return <img src={file.content} alt={file.name} className={styles.image} />;
    } else if (file.type === 'application/pdf') {
      return (
        <div className={styles.pdfContainer}>
          <embed src={file.content} type="application/pdf" width="100%" height="100%" />
        </div>
      );
    } else if (file.type === 'text/plain') {
      return <textarea value={file.content} readOnly className={styles.text} />;
    } else if (file.type === 'video/mp4') {
      return (
        <div className={styles.video}>
          <ReactPlayer url={file.content} controls />
        </div>
      );
    } else if (file.type === 'audio/wav') {
      return (
        <div className={styles.audio}>
          <ReactPlayer url={file.content} controls />
        </div>
      );
    }
    return <p>Unsupported file type</p>;
  };

  return (
    <div className={styles.fileVisualizer}>
      <div className={styles.editorHeader}>
        <span>{file.name}</span>
        {file.type === 'text/plain' && (
          <button onClick={onEdit} className={styles.editButton}>Edit</button>
        )}
      </div>
      <div className={styles.fileContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default FileVisualizer;
