

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskColumn = ({ columnId, tasks, onUpdateTask,onDeleteTask }) => {
  return (
    <div className="task-column">
      <h2>{columnId.replace('_', ' ')}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div 
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskItem 
                key={task._id} 
                task={task} 
                index={index}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
