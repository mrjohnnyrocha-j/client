import React, { useState } from 'react';
import TaskNavigator from '../components/Tasks/TaskNavigator/TaskNavigator';
import TaskList from '../components/Tasks/TaskList/TaskList';
import TaskDetail from '../components/Tasks/TaskDetail/TaskDetail';
import TaskBoard from '../components/Tasks/TaskBoard/TaskBoard';
import DocumentationList from '../components/Cloud/DocumentationList/DocumentationList';
import FileList from '../components/Cloud/FileList/FileList';

import styles from '../styles/tasks/tasks.module.css';

const initialTasks = [
  { id: 1, title: 'Task 1', description: 'Description of Task 1', status: 'Pending', dueDate: '2024-06-30', assignedTo: 'User 1' },
  { id: 2, title: 'Task 2', description: 'Description of Task 2', status: 'In Progress', dueDate: '2024-07-15', assignedTo: 'User 2' },
  { id: 3, title: 'Task 3', description: 'Description of Task 3', status: 'Completed', dueDate: '2024-08-10', assignedTo: 'User 3' },
];

const initialProjects = [
  {
    id: 1,
    name: 'Project 1',
    users: [
      { id: 1, name: 'User 1', tasks: [initialTasks[0]] },
      { id: 2, name: 'User 2', tasks: [initialTasks[1]] },
      { id: 3, name: 'User 3', tasks: [initialTasks[2]] },
    ],
  },
  {
    id: 2,
    name: 'Project 2',
    users: [
      { id: 1, name: 'User 1', tasks: [initialTasks[1]] },
      { id: 2, name: 'User 2', tasks: [initialTasks[2]] },
    ],
  },
];

const TasksPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('tasks');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);


  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedTask(null);
    setSelectedProject(null);
    setSelectedDoc(null);
    setSelectedFile(null);

  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleDocClick = (doc: any) => {
    setSelectedDoc(doc);
  };

  const handleFileClick = (file: any) => {
    setSelectedFile(file);
  };

 

  return (
    <div className={styles.tasksContainer}>
      <TaskNavigator onSelectCategory={handleSelectCategory} />
      <div className={styles.mainContent}>
        {selectedCategory === 'projects' && (
          <div className={styles.projectList}>
            {initialProjects.map(project => (
              <div key={project.id} className={styles.projectItem} onClick={() => handleProjectClick(project)}>
                <h3>{project.name}</h3>
              </div>
            ))}
          </div>
        )}
        {selectedCategory === 'tasks' && <TaskList tasks={initialTasks} onTaskClick={handleTaskClick} />}
        {selectedCategory === 'documentation' && <DocumentationList onDocClick={handleDocClick} />}
        {selectedCategory === 'files' && <FileList onFileClick={handleFileClick} />}

      </div>
      <div className={styles.detailContent}>
        {selectedTask && <TaskDetail task={selectedTask} />}
        {selectedProject && <TaskBoard project={selectedProject} />}
        {selectedDoc && (
          <div>
            <h2>{selectedDoc.title}</h2>
            <p>{selectedDoc.content}</p>
          </div>
        )}
        {selectedFile && (
          <div>
            <h2>{selectedFile.name}</h2>
            <a href={selectedFile.url} target="_blank" rel="noopener noreferrer">
              Open File
            </a>
          </div>
        )}
     
      </div>
    </div>
  );
};

export default TasksPage;
