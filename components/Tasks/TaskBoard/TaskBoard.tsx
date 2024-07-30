import React from 'react';
import styles from './TaskBoard.module.css';

interface TaskBoardProps {
  project: any;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ project }) => {
  return (
    <div className={styles.taskBoard}>
      <h2>{project.name}</h2>
      {/* {project.users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <div className={styles.userTasks}>
            {user.tasks.map(task => (
              <div key={task.id} className={styles.taskItem}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default TaskBoard;
