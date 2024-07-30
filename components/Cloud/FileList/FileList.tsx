import React from 'react';
import styles from './FileList.module.css';

interface FileListProps {
  onFileClick: (file: any) => void;
}

const FileList: React.FC<FileListProps> = ({ onFileClick }) => {
  const files = [
    { id: 1, name: 'File 1', url: '/files/file1.pdf' },
    { id: 2, name: 'File 2', url: '/files/file2.pdf' },
    { id: 3, name: 'File 3', url: '/files/file3.pdf' },
  ];

  return (
    <div className={styles.fileList}>
      {files.map(file => (
        <div key={file.id} className={styles.fileItem} onClick={() => onFileClick(file)}>
          <h3>{file.name}</h3>
          <a href={file.url} target="_blank" rel="noopener noreferrer">Open File</a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
