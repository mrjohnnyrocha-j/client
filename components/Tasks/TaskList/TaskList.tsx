import React from 'react';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: any[];
  onTaskClick: (task: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <div key={task.id} className={styles.taskItem} onClick={() => onTaskClick(task)}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
