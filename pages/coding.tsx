// pages/coding.tsx

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/cloud/coding/coding.module.css";

// Dynamic imports for CodeMirror and Terminal components
const CodeEditor = dynamic(() => import("../components/Cloud/CodeEditor/CodeEditor"), {
  ssr: false,
});
const Terminal = dynamic(() => import("../components/Cloud/Terminal/Terminal"), {
  ssr: false,
});

const CodingPage: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");

  // Dummy file structure
  const files = [
    { name: "index.js", content: 'console.log("Hello, world!");' },
    { name: "style.css", content: "body { background-color: #fff; }" },
    { name: "README.md", content: "# Project\n\nDescription of the project." },
  ];

  const openFile = (file: { name: string; content: string }) => {
    setActiveFile(file.name);
    setFileContent(file.content);
  };

  const saveFileContent = (newContent: string) => {
    setFileContent(newContent);
    // Update the file content in the file structure
    const fileIndex = files.findIndex((f) => f.name === activeFile);
    if (fileIndex !== -1) {
      files[fileIndex].content = newContent;
    }
  };

  return (
    <div className={styles.codingPage}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem} onClick={() => console.log('Navigating to Home')}>Home</li>
            <li className={styles.navItem} onClick={() => console.log('Navigating to Coding')}>Coding</li>
          </ul>
        </nav>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <h2>File Explorer</h2>
          <ul>
            {files.map((file) => (
              <li key={file.name} onClick={() => openFile(file)}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.editor}>
          {activeFile ? (
            <CodeEditor
              fileName={activeFile}
              fileContent={fileContent}
              saveFileContent={saveFileContent}
            />
          ) : (
            <p>Select a file to edit</p>
          )}
        </div>
      </div>
      <div className={styles.terminalContainer}>
        <div className={styles.terminalResizeHandle}></div>
        <Terminal />
      </div>
    </div>
  );
};

export default CodingPage;
