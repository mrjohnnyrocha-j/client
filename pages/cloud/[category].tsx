import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloudNavigator from '../../components/Cloud/CloudNavigator/CloudNavigator';
import WindowsManager from '../../components/Cloud/WindowsManager/WindowsManager';
import FileEditor from '../../components/Cloud/FileEditor/FileEditor';
import styles from '../../styles/cloud/cloud.module.css';
import JSZip from 'jszip';

interface Item {
  name: string;
  type: 'file' | 'folder';
  icon: string;
  content?: string;
}

const CloudPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [selectedCategory, setSelectedCategory] = useState<string | string[] | undefined>(category);
  const [customCategories, setCustomCategories] = useState<{ name: string; color: string }[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedFile, setSelectedFile] = useState<Item | null>(null);

  useEffect(() => {
    axios.get('/api/categories')
      .then((response) => setCustomCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      axios.get(`/api/nfs/${category}/Root`)
        .then(response => setItems(response.data))
        .catch(error => console.error('Error fetching items:', error));
    }
  }, [category]);

  const handleSelectCategory = (category: string, color: string) => {
    router.push(`/cloud/${category}`);
    changeTheme(color);
  };

  const handleAddCategory = (category: string, color: string) => {
    axios.post('/api/categories', { name: category, color })
      .then(() => setCustomCategories([...customCategories, { name: category, color }]))
      .catch(error => console.error('Error adding category:', error));
  };

  const handleItemDoubleClick = (item: Item) => {
    if (item.type === "file") {
      setSelectedFile({ name: item.name, type: item.type, icon: item.icon, content: item.content || "" });
    } else {
      axios.get(`/api/nfs/${selectedCategory}/${item.name}`)
        .then(response => setItems(response.data))
        .catch(error => console.error('Error fetching items:', error));
    }
  };

  const handleSaveFile = (content: string | ArrayBuffer) => {
    if (selectedFile && typeof content === "string") {
      setSelectedFile({ ...selectedFile, content });
      alert("File saved!");
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      setItems([...items, { name: folderName, type: "folder", icon: "/assets/folder.svg" }]);
    }
  };

  const handleCreateFile = () => {
    const fileName = prompt("Enter file name:");
    if (fileName) {
      setItems([...items, { name: fileName, type: "file", icon: "/assets/text-file.svg", content: "" }]);
    }
  };

  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setItems([...items, { name: file.name, type: "file", icon: "/assets/text-file.svg", content: e.target.result as string }]);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadFile = () => {
    if (selectedFile) {
      const element = document.createElement("a");
      // const file = new Blob([selectedFile.content], { type: "text/plain" });
      // element.href = URL.createObjectURL(file);
      element.download = selectedFile.name;
      document.body.appendChild(element);
      element.click();
    } else {
      alert("No file selected to download.");
    }
  };

  const handleExportData = () => {
    const zip = new JSZip();
    items.forEach((item) => {
      if (item.type === "file") {
        zip.file(item.name, item.content as string);
      }
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = "exported_data.zip";
      document.body.appendChild(element);
      element.click();
    });
  };

  const changeTheme = (color: string) => {
    document.documentElement.style.setProperty('--theme-color', color);
    document.documentElement.style.setProperty('--theme-color-darker', shadeColor(color, -20));
    document.documentElement.style.setProperty('--theme-color-lighter', shadeColor(color, 20));
    document.documentElement.style.setProperty('--text-color', getTextColor(color));
  };

  const shadeColor = (color: string, percent: number) => {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = (f >> 8) & 0x00FF;
    const B = f & 0x0000FF;
    return "#" + (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    ).toString(16).slice(1);
  };

  const getTextColor = (backgroundColor: string) => {
    const color = backgroundColor.charAt(0) === '#' ? backgroundColor.substring(1, 7) : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map(col => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return l > 0.179 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className={styles.cloudContainer}>
      <CloudNavigator 
        onSelectCategory={handleSelectCategory} 
        onAddCategory={handleAddCategory} 
        customCategories={customCategories} 
        changeTheme={changeTheme} 
      />
      <div className={styles.mainContent}>
        <WindowsManager
          items={items}
          onItemDoubleClick={handleItemDoubleClick}
          onCreateFolder={handleCreateFolder}
          onCreateFile={handleCreateFile}
          onUploadFile={handleUploadFile}
          onDownloadFile={handleDownloadFile}
          onExportData={handleExportData}
          selectedCategory={selectedCategory as string}
          onSelectDirectory={(directory) => {
            axios.get(`/api/nfs/${selectedCategory}/${directory}`)
              .then(response => setItems(response.data))
              .catch(error => console.error('Error fetching items:', error));
          }}
        />
      </div>
      {selectedFile && (
        <div className={styles.fileEditorContainer}>
          {/* <FileEditor file={selectedFile} onSave={handleSaveFile} /> */}
        </div>
      )}
    </div>
  );
};

export default CloudPage;
