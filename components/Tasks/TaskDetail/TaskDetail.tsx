import React from 'react';
import styles from './TaskDetail.module.css';

interface TaskDetailProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    assignedTo: string;
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <div className={styles.taskDetail}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Assigned To: {task.assignedTo}</p>
    </div>
  );
};

export default TaskDetail;
