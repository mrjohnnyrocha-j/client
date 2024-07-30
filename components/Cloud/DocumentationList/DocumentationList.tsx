import React from 'react';
import styles from './DocumentationList.module.css';

interface DocumentationListProps {
  onDocClick: (doc: any) => void;
}

const DocumentationList: React.FC<DocumentationListProps> = ({ onDocClick }) => {
  const docs = [
    { id: 1, title: 'Doc 1', content: 'Content of Doc 1' },
    { id: 2, title: 'Doc 2', content: 'Content of Doc 2' },
    { id: 3, title: 'Doc 3', content: 'Content of Doc 3' },
  ];

  return (
    <div className={styles.docList}>
      {docs.map(doc => (
        <div key={doc.id} className={styles.docItem} onClick={() => onDocClick(doc)}>
          <h3>{doc.title}</h3>
          <p>{doc.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DocumentationList;
