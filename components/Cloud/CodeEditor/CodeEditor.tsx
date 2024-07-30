// components/CodeEditor/CodeEditor.tsx

import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';

interface CodeEditorProps {
  fileName: string;
  fileContent: string;
  saveFileContent: (newContent: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, fileContent, saveFileContent }) => {
  const handleEditorChange = (editor: any, data: any, value: string) => {
    saveFileContent(value);
  };

  return (
    <div>
      <h2>Editing: {fileName}</h2>
      <CodeMirror
        value={fileContent}
        options={{
          mode: fileName.endsWith('.js') ? 'javascript' : fileName.endsWith('.css') ? 'css' : 'markdown',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
