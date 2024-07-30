// components/WindowsManager/WindowsManager.tsx
import React, { useState, useEffect } from 'react';
import { FaFolderPlus, FaFileAlt, FaUpload, FaDownload, FaFileExport } from 'react-icons/fa';
import WindowsManagerSidebar from './WindowsManagerSidebar/WindowsManagerSidebar';
import styles from './WindowsManager.module.css';
import axios from 'axios';

interface WindowManagerProps {
  items: any[];
  onItemDoubleClick: (item: any) => void;
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onUploadFile: (file: File) => void;
  onDownloadFile: () => void;
  onExportData: () => void;
  onSelectDirectory: (directory: string) => void;
  selectedCategory: string;
}

const WindowsManager: React.FC<WindowManagerProps> = ({
  items,
  onItemDoubleClick,
  onCreateFolder,
  onCreateFile,
  onUploadFile,
  onDownloadFile,
  onExportData,
  onSelectDirectory,
  selectedCategory,
}) => {
  const [directories, setDirectories] = useState<string[]>([]);
  const [selectedDirectory, setSelectedDirectory] = useState('Root');

  useEffect(() => {
    axios.get(`/api/nfs/${selectedCategory}/directories`)
      .then(response => setDirectories(response.data))
      .catch(error => console.error('Error fetching directories:', error));
  }, [selectedCategory]);

  const handleDoubleClick = (item: any) => {
    onItemDoubleClick(item);
  };

  const handleSelectDirectory = (directory: string) => {
    setSelectedDirectory(directory);
    onSelectDirectory(directory);
  };

  return (
    <div className={styles.windowManagerContainer}>
      <WindowsManagerSidebar directories={directories} onSelectDirectory={handleSelectDirectory} />
      <div className={styles.windowManager} style={{ backgroundColor: 'var(--theme-color-darker)' }}>
        <div className={styles.windowHeader}>
          <FaFolderPlus onClick={onCreateFolder} title="Create Folder" className={styles.icon} />
          <FaFileAlt onClick={onCreateFile} title="Create File" className={styles.icon} />
          <FaUpload onClick={() => document.getElementById('fileUpload')?.click()} title="Upload File" className={styles.icon} />
          <input
            id="fileUpload"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && onUploadFile(e.target.files[0])}
          />
          <FaDownload onClick={onDownloadFile} title="Download File" className={styles.icon} />
          <FaFileExport onClick={onExportData} title="Export Data" className={styles.icon} />
        </div>
        <div className={styles.windowContent}>
          {items.map((item, index) => (
            <div
              key={index}
              className={item.type === 'folder' ? styles.folderIcon : styles.fileIcon}
              onDoubleClick={() => handleDoubleClick(item)}
            >
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.windowFooter}>
          <span>{items.length} items</span>
        </div>
      </div>
    </div>
  );
};

export default WindowsManager;
